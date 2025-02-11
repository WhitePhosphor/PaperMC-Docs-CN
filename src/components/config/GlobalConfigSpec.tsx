import React from 'react';
import type { ConfigSpec } from '@site/src/types/ConfigSpec';

interface GlobalConfigSpecProps {
  children?: React.ReactNode;
  spec: ConfigSpec;
}

export default function GlobalConfigSpec({ spec, children }: GlobalConfigSpecProps): JSX.Element {
  return (
    <div className="config-spec global">
      <div className="spec-content">
        {spec.map((item, index) => (
          <div key={index} className="spec-item">
            <h3>{item.key}</h3>
            <p>{item.description}</p>
            {item.default && (
              <div className="spec-default">
                默认值: <code>{item.default}</code>
              </div>
            )}
            {item.type && (
              <div className="spec-type">
                类型: <code>{item.type}</code>
              </div>
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
} 