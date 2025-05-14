---
title: 区域逻辑
description: 对 Folia 区域化器工作原理的概述
slug: folia/reference/region-logic
---

## 基础区域化逻辑

## Region

区域仅仅是一组拥有区块位置和与该区域绑定的实现定义的唯一数据对象。
重要的是要注意，对于任何非死亡区域 x，对于它拥有的每个区块位置 y，不存在其他非死亡区域 z，使得区域 z 拥有区块位置 y。

## Regionizer

每个世界都有自己的区域化器。
区域化器是用来描述 `ThreadedRegionizer` 类执行的创建、维护和销毁区域的逻辑的术语。
区域的维护是通过将附近的区域合并在一起、标记哪些区域有资格被计时，以及最后将任何区域拆分成更小的独立区域来完成的。
实际上，这是确保附近一组区块被视为一个独立区域的逻辑。

## 区域化器提供的保证

区域化器提供了一组重要的不变量，允许区域在没有竞态条件的情况下并行计时：

### 第一个不变量

第一个不变量很简单，即任何存在的区块持有者都只有一个对应的区域。

### 第二个不变量

第二个不变量是，对于每一个 _存在的_ 区块持有者 x，如果它包含在一个区域内，那么在其“合并半径”内的每个区块位置都由该区域拥有。
实际上，这个不变量保证了该区域附近没有其他区域，从而允许该区域在计时时假设它可以为“靠近”它的区块持有者创建数据。

### 第三个不变量

第三个不变量是，一个正在计时的区域 _不能_ 在其计时时扩展它所拥有的区块位置。
第三个不变量很重要，因为它防止了正在计时的区域在计时时“争夺”附近未拥有的区块，以确保它们真正地并行计时，无论它们在计时时可能发出什么区块加载请求。

为了符合第一个不变量，区域化器将在正在计时的区域 _周围_ 创建“临时”区域。
具体来说，在这种情况下，“周围”意味着足够接近以至于需要合并，但又不至于远到被认为是独立的。在这种情况下创建的临时区域将在正在计时的区域完成计时时合并到该区域中。

第二个不变量和第三个不变量结合起来，使得区域化器能够保证一个正在计时的区域可以创建并访问其周围的区块持有者（即同步加载），而不会出现与另一个区域冲突的可能性。

### 第四个不变量

第四个不变量是，一个区域只能处于四种状态之一：“临时”、“就绪”、“计时”或“死亡”。

“就绪”状态允许区域转换到“计时”状态，而“临时”状态用于那些可能不会计时的区域。
“死亡”状态用于标记那些不应被使用的区域。

状态转换将在后面解释，因为它与区域化器的合并和拆分逻辑有关。

## Regionizer implementation

The regionizer implementation is a description of how
the class `ThreadedRegionizer` adheres to the four invariants
described previously.

### Splitting the world into sections

The regionizer does not operate on chunk coordinates, but rather
on "region section coordinates." Region section coordinates simply
represent a grouping of NxN chunks on a grid, where N is some power
of two. The actual number is left ambiguous, as region section coordinates
are only an internal detail of how chunks are grouped.
For example, with N=16 the region section (0,0) encompasses all
chunks x in [0,15] and z in [0,15]. This concept is similar to how
the chunk coordinate (0,0) encompasses all blocks x in [0, 15]
and z in [0, 15]. Another example with N=16, the chunk (17, -5) is
contained within region section (1, -1).

Region section coordinates are used only as a performance
tradeoff in the regionizer, as by approximating chunks to their
region coordinate allows it to treat NxN chunks as a single
unit for regionizing. This means that regions do not own chunks positions,
but rather own region section positions. The grouping of NxN chunks
allows the regionizing logic to be performed only on
the creation/destruction of region sections.
For example with N=16 this means up to NxN-1=255 possible
less operations in areas such as addChunk/region recalculation
assuming region sections are always full.

### Implementation variables

The implementation variables control how aggressively the
regionizer will maintain regions and merge regions.

#### Recalculation count

The recalculation count is the minimum number of region sections
that a region must own to allow it to re-calculate. Note that
a recalculation operation simply calculates the set of independent
regions that exist within a region to check if a split can be
performed.
This is a simple performance knob that allows split logic to be
turned off for small regions, as it is unlikely that small regions
can be split in the first place.

#### Max dead section percent

The max dead section percent is the minimum percent of dead
sections in a region that must exist before a region can run
re-calculation logic.

#### Empty section creation radius

The empty section creation radius variable is used to determine
how many empty region sections are to exist around _any_
region section with at least one chunk.

Internally, the regionizer enforces the third invariant by
preventing ticking regions from owning new region sections.
The creation of empty sections around any non-empty section will
then enforce the second invariant.

#### Region section merge radius

The merge radius variable is used to ensure that for any
existing region section x that for any other region section y within
the merge radius are either owned by region that owns x
or are pending a merge into the region that owns x or that the
region that owns x is pending a merge into the region that owns y.

#### Region section chunk shift

The region section chunk shift is simply log2(grid size N). Thus,
N = 1 << region section chunk shift. The conversion from
chunk position to region section is additionally defined as
region coordinate = chunk coordinate >> region section chunk shift.

### Operation

The regionizer is operated by invoking `ThreadedRegionizer#addChunk(x, z)`
or `ThreadedRegionizer#removeChunk(x, z)` when a chunk holder is created
or destroyed.

Additionally, `ThreadedRegion#tryMarkTicking` can be used by a caller
that attempts to move a region from the "ready" state to the "ticking"
state. It is vital to note that this function will return false if
the region is not in the "ready" state, as it is possible
that even a region considered to be "ready" in the past (i.e. scheduled
to tick) may be unexpectedly marked as "transient." Thus, the caller
needs to handle such cases. The caller that successfully marks
a region as ticking must mark it as non-ticking by using
`ThreadedRegion#markNotTicking`.

The function ThreadedRegion#markNotTicking returns true if the
region was migrated from "ticking" state to "ready" state, and false
in all other cases. Effectively, it returns whether the current region
may be later ticked again.

### Region section state

A region section state is one of "dead" or "alive." A region section
may additionally be considered "non-empty" if it contains
at least one chunk position, and "empty" otherwise.

A region section is considered "dead" if and only if the region section
is also "empty" and that there exist no other "empty" sections within the
empty section creation radius.

The existence of the dead section state is purely for performance, as it
allows the recalculation logic of a region to be delayed until the region
contains enough dead sections. However, dead sections are still
considered to belong to the region that owns them just as alive sections.

### Addition of chunks (`addChunk`)

The addition of chunks to the regionizer boils down to two cases:

#### Target region section already exists and is not empty

In this case, it simply adds the chunk to the section and returns.

#### Target region section does not exist or is empty

In this case, the region section will be created if it does not exist.
Additionally, the region sections in the "create empty radius" will be
created as well.

Then, any region in the create empty radius + merge radius are collected
into a set X. This set represents the regions that need to be merged
later to adhere to the second invariant.

If the set X contains no elements, then a region is created in the ready
state to own all of the created sections.

If the set X contains just 1 region, then no regions need to be merged
and no region state is modified, and the sections are added to this
1 region.

Merge logic needs to occur when there are more than 1 region in the
set X. From the set X, a region x is selected that is not ticking. If
no such x exists, then a region x is created. Every region section
created is added to the set x, as it is the section that is known
to not be ticking - this is done to adhere to the third invariant.

Every region y in the set X that is not x is merged into x if
y is not in the ticking state, otherwise x runs the merge later
logic into y.

### Merge later logic

A merge later operation may only take place from
a non-ticking, non-dead region x into a ticking region y.
The merge later logic relies on maintaining a set of regions
to merge into later per region, and another set of regions
that are expected to merge into this region.
Effectively, a merge into later operation from x into y will add y into x's
merge into later set, and add x into y's expecting merge from set.

When the ticking region finishes ticking, the ticking region
will perform the merge logic for all expecting merges.

### Merge logic

A merge operation may only take place between a dead region x
and another region y which may be either "transient"
or "ready." The region x is effectively absorbed into the
region y, as the sections in x are moved to the region y.

The merge into later is also forwarded to the region y,
such so that the regions x was to merge into later, y will
now merge into later.

Additionally, if there is implementation specific data
on region x, the region callback to merge the data into the
region y is invoked.

The state of the region y may be updated after a merge operation
completes. For example, if the region x was "transient", then
the region y should be downgraded to transient as well. Specifically,
the region y should be marked as transient if region x contained
merge later targets that were not y. The downgrading to transient is
required to adhere to the second invariant.

### Removal of chunks (`removeChunk`)

Removal of chunks from region sections simple updates
the region sections state to "dead" or "alive", as well as the
region sections in the empty creation radius. It will not update
any region state, and nor will it purge region sections.

### Region tick start (`tryMarkTicking`)

The tick start simply migrates the state to ticking, so that
invariants #2 and #3 can be met.

### Region tick end (`markNotTicking`)

At the end of a tick, the region's new state is not immediately known.

First, tt first must process its pending merges.

After it processes its pending merges, it must then check if the
region is now pending merge into any other region. If it is, then
it transitions to the transient state.

Otherwise, it will process the removal of dead sections and attempt
to split into smaller regions. Note that it is guaranteed
that if a region can be possibly split, it must remove dead sections,
otherwise, this would contradict the rules used to build the region
in the first place.
