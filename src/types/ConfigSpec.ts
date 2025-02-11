export interface ConfigItem {
  key: string;
  description: string;
  default?: string | number | boolean;
  type?: string;
}

export type ConfigSpec = ConfigItem[]; 