import fs from "node:fs/promises";

export interface Storage<T> {
  save(data: T): Promise<void>;
  load(): Promise<T | null>;
}

export class JsonStorage<T> implements Storage<T> {
  constructor(private filePath: string) {}

  async save(data: T): Promise<void> {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(this.filePath, json, "utf-8");
  }

  async load(): Promise<T | null> {
    try {
      const json = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }
}
