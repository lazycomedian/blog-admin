type BizStorageType = "localStorage" | "sessionStorage";

interface BizStorageConfig {
  prefix?: string;
  /**
   * 存储类型 localStorage | sessionStorage
   * 默认为sessionStorage
   */
  type?: BizStorageType;
}

export class BizStorage<Key = string> {
  private readonly PREFIX: string;

  protected readonly storageType: BizStorageType = "sessionStorage";

  constructor(config?: BizStorageConfig) {
    this.PREFIX = config?.prefix || "";
    if (config?.type) this.storageType = config.type;
  }

  /**
   * 存储键值对
   *
   * @param key 存储数据的键
   * @param value 存储的内容
   * @param type 存储类型 localStorage | sessionStorage
   * 默认为sessionStorage
   */
  public setItem(key: Key, value: any, type?: BizStorageType): void {
    const currentKey = (this.PREFIX || "") + key;
    window[type || this.storageType].setItem(currentKey, JSON.stringify(value));
  }

  /**
   * 获取存储的值
   *
   * @param key 存储数据的键
   * @param type 存储类型 localStorage | sessionStorage
   */
  public getItem(key: Key, type?: BizStorageType): any | null {
    const currentKey = (this.PREFIX || "") + key;

    try {
      const result = window[type || this.storageType].getItem(currentKey);
      if (result === null) return null;
      return JSON.parse(result);
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  /**
   * 根据key移除存储的键值对
   *
   * @param key 存储数据的键
   * @param type 存储类型 localStorage | sessionStorage
   */
  public removeItem(key: Key, type?: BizStorageType): void {
    const currentKey = (this.PREFIX || "") + key;
    window[type || this.storageType].removeItem(currentKey);
  }

  /**
   * 清除所有的键值对
   *
   * @param type 存储类型 localStorage | sessionStorage
   */
  public clear(type?: BizStorageType): void {
    window[type || this.storageType].clear();
  }

  /**
   * 获取键值对长度
   *
   * @param type 存储类型 localStorage | sessionStorage
   */
  public getLength(type?: BizStorageType): number {
    return window[type || this.storageType].length;
  }
}
