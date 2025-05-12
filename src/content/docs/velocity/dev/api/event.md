---
title: 处理事件
description: 如何在 Velocity 中监听事件
slug: velocity/dev/event-api
---

使用 Velocity 的 `@Subscribe` 注解监听事件非常简单。
你已经在主类中看到了一个使用 [`ProxyInitializeEvent`](jd:velocity:com.velocitypowered.api.event.proxy.ProxyInitializeEvent) 的监听器。
更多事件可以在 [Javadoc](jd:velocity) 中找到。

## 创建监听器方法

要监听一个事件，请使用 [`@Subscribe`](jd:velocity:com.velocitypowered.api.event.Subscribe) 标记该方法，如下所示。
这与其他你可能熟悉的 API 中的注解驱动事件监听类似；它相当于 Bukkit/Bungee 的 `@EventHandler` 和 Sponge 的 `@Listener`。

```java
@Subscribe
public void onPlayerChat(PlayerChatEvent event) {
	// 执行操作
}
```

:::tip

请注意，导入的是 [`com.velocitypowered.api.event.Subscribe`](jd:velocity:com.velocitypowered.api.event.Subscribe)，
而不是 `com.google.common.eventbus`。

:::

## 顺序

每个监听器都有一个 [`priority`](jd:velocity:com.velocitypowered.api.event.Subscribe#priority())。
当触发事件时，监听器被调用的顺序由其 `priority` 决定。优先级越高，事件处理器将越早被调用。

在 `@Subscribe` 注解中声明所需的顺序：

```java
@Subscribe(priority = 0, order = PostOrder.CUSTOM)
public void onPlayerChat(PlayerChatEvent event) {
	// 执行操作
}
```

如果不指定顺序，`-32768` 是默认值。
:::note

由于兼容性限制，你必须指定 [`PostOrder.CUSTOM`](jd:velocity:com.velocitypowered.api.event.PostOrder#CUSTOM) 才能使用这个字段。

:::

## 注册监听器

Velocity 会自动将你的主插件类注册为事件监听器。
这对于初始化和简单的插件很方便，但对于更复杂的插件，你可能希望将事件处理器与主插件类分开。
为此，你需要将其他监听器注册到 [`EventManager`](jd:velocity:com.velocitypowered.api.event.EventManager)：

事件系统支持将对象注册为监听器（允许你使用 `@Subscribe` 标记事件处理器），或者注册函数式监听器。

### 将对象注册为监听器

```java
server.getEventManager().register(plugin, listener);
```

两个参数都是[`object`](JD：Java：Java.Lang.Object)。
第一个参数是插件的对象，第二个参数应该是要注册的侦听器。例如：

```java
@Plugin(id = "myfirstplugin", name = "My Plugin", version = "0.1.0", dependencies = {@Dependency(id = "wonderplugin")})
public class VelocityTest {

  private final ProxyServer server;
  private final Logger logger;

  @Inject
  public VelocityTest(ProxyServer server, Logger logger) {
    this.server = server;
    this.logger = logger;
  }

  @Subscribe
  public void onInitialize(ProxyInitializeEvent event) {
    server.getEventManager().register(this, new MyListener());
  }
}

public class MyListener {

  @Subscribe(order = PostOrder.EARLY)
  public void onPlayerChat(PlayerChatEvent event) {
    // 在这里做点什么
  }

}
```

### 注册函数式侦听器

As an alternative to `@Subscribe`, you can also use the functional `EventHandler` interface and register yours with
[`register(Object plugin, Class<E> eventClass, EventHandler<E> handler)`](jd:velocity:com.velocitypowered.api.event.EventManager#register(java.lang.Object,java.lang.Class,com.velocitypowered.api.event.EventHandler)):

```java
  server.getEventManager().register(this, PlayerChatEvent.class, event -> {
      // do something here
  });
```

## 异步处理事件

In Velocity 3.0.0, events can now be handled asynchronously. The event system allows a plugin to
pause sending an event to every listener, perform some unit of computation or I/O asynchronously,
and then resume processing the event. All Velocity events have the ability to be processed
asynchronously, however only some will explicitly wait for events to finish being fired before
continuing.

For an annotation-based listener, all that is needed to process an event asynchronously is to either
return an [`EventTask`](jd:velocity:com.velocitypowered.api.event.EventTask)
or add a second return an [`Continuation`](jd:velocity:com.velocitypowered.api.event.Continuation) parameter:

```java
  @Subscribe(priority = 100, order = PostOrder.CUSTOM)
  public void onLogin(LoginEvent event, Continuation continuation) {
    doSomeAsyncProcessing().addListener(continuation::resume, continuation::resumeWithException);
  }

  @Subscribe(priority = 100, order = PostOrder.CUSTOM)
  public EventTask onPlayerChat(PlayerChatEvent event) {
    if (mustFurtherProcess(event)) {
      return EventTask.async(() => ...);
    }
    return null;
  }
```

A functional listener simply needs to implement
[`AwaitingEventExecutor`](jd:velocity:com.velocitypowered.api.event.AwaitingEventExecutor)
and return an [`EventTask`](jd:velocity:com.velocitypowered.api.event.EventTask):

```java
  server.getEventManager().register(this, PlayerChatEvent.class, (AwaitingEventExecutor) event -> {
    if (mustFurtherProcess(event)) {
      return EventTask.async(() => ...);
    }
    return null;
  });
```

There are two types of event tasks:

- **Async tasks** simply run a unit of execution asynchronously. To get a basic event task, use
  [`EventTask.async(Runnable)`](jd:velocity:com.velocitypowered.api.event.EventTask#async(java.lang.Runnable)).
  Basic event tasks are the closest equivalent for Velocity 1.x.x event listeners and asynchronous
  events in the Bukkit API.
- **Continuation tasks** provide the listener with a callback (known as a `Continuation`) to resume
  event processing when the (possibly asynchronous) work is completed. To get a continuation-based
  event task, use [`EventTask.withContinuation(Consumer<Continuation>)`](jd:velocity:com.velocitypowered.api.event.EventTask#withContinuation(java.util.function.Consumer)).
  Continuation-based tasks are the closest equivalent for listeners that use BungeeCord `AsyncEvent`
  intents, but have a slightly different programming model in that each listener still runs sequentially,
  just that an individual listener can defer passing control onto the next listener until it is done.

:::caution

To retain compatibility with older versions of Velocity, Velocity 3.0.0 runs all event listeners
asynchronously. This behavior will change in Polymer and will require you to explicitly provide an
event task (or to use continuations) if you need to perform some work asynchronously. All developers
are urged to make the transition now.

:::

## 创建事件

Creating events on Velocity is somewhat different than on other platforms. However, it is very
similar for the most part.

### 创建事件类

First we need to create a class for our event. In this tutorial we'll assume you're making a private
messaging plugin, and thus use a `PrivateMessageEvent`. Most of this part is boilerplate.

```java
public class PrivateMessageEvent {

  private final Player sender;
  private final Player recipient;
  private final String message;

  public PrivateMessageEvent(Player sender, Player recipient, String message) {
    this.sender = sender;
    this.recipient = recipient;
    this.message = message;
  }

  public Player sender() {
    return sender;
  }

  public Player recipient() {
    return recipient;
  }

  public String message() {
    return message;
  }

  // toString, equals, and hashCode may be added as needed

}
```

You'll notice that your events don't need to extend or implement anything. They just work.

### 触发事件

To fire the event, you'll need to get the server's event manager and use the
[`fire`](jd:velocity:com.velocitypowered.api.event.EventManager#fire(E))
method. Note that this returns a [`CompletableFuture`](jd:velocity:java.util.concurrent.CompletableFuture),
so if you want to continue logic after the event is handled by all listeners, use a callback:

```java
server.getEventManager().fire(new PrivateMessageEvent(sender, recipient, message)).thenAccept((event) -> {
  // event has finished firing
  // do some logic dependent on the result
});
```

### 使用 `ResultedEvent`

Velocity uses the generalized [`ResultedEvent`](jd:velocity:com.velocitypowered.api.event.ResultedEvent)
for events which have some sort of 'result'. The result type of the event is defined by its generic type; for example
`PrivateMessageEvent implements ResultedEvent<ResultType>`.

Some common result types are [`GenericResult`](jd:velocity:com.velocitypowered.api.event.ResultedEvent$GenericResult),
for simple allowed/denied results, and component results, used for events where the result may be denied with an accompanying reason
(such as in a login event).

Using a general result is far more encompassing than `isCancelled/setCancelled` methods you may be
used to on other platforms, whose meaning is vague and limited to a simple boolean. In this example,
we'll use `GenericResult`, so listeners will be able to mark our `PrivateMessageEvent` as either
allowed or denied.

```java
public class PrivateMessageEvent implements ResultedEvent<GenericResult> {

  private final Player sender;
  private final Player recipient;
  private final String message;

  private GenericResult result = GenericResult.allowed(); // Allowed by default

  public PrivateMessageEvent(Player sender, Player recipient, String message) {
    this.sender = sender;
    this.recipient = recipient;
    this.message = message;
  }

  public Player sender() {
    return sender;
  }

  public Player recipient() {
    return recipient;
  }

  public String message() {
    return message;
  }

  @Override
  public GenericResult result() {
    return result;
  }

  @Override
  public void setResult(GenericResult result) {
    this.result = Objects.requireNonNull(result);
  }

}
```

Per convention, the result of a `ResultedEvent` should never be null. Here, we assure that using
[`Objects#requireNonNull(Object)`](jd:java:java.util.Objects#requireNonNull(T)).

Listeners may 'deny' the event by using `event.setResult(GenericResult.denied())`, and you may check
the result with `event.getResult()`.
