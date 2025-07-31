import type { ItemData } from '../types/item-data';

export class DataService {
  private data: ItemData[] | null = null;

  public async getJson(): Promise<ItemData[]> {
    if (this.data === null) {
      const response = await fetch('/data.json');
      this.data = await response.json();
    }
    return this.data!;
  }

  public async getDetail(id: string): Promise<ItemData | null> {
    if (this.data !== null) {
      return this.searchData(id);
    } else {
      await this.getJson();
      return this.searchData(id);
    }
  }

  private searchData(id: string): ItemData | null {
    if (!this.data) {
      return null;
    }

    const item = this.data.find((obj) => obj.id === id);

    if (item == null) {
      return null;
    }
    return item;
  }

  public getIndex(id: string): number {
    if (!this.data) {
      return -1;
    }

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  public getItemAt(index: number): ItemData | null {
    if (!this.data) {
      return null;
    }

    if (index < 0) {
      return this.data[this.data.length - 1];
    }
    if (index > this.data.length - 1) {
      return this.data[0];
    }

    return this.data[index];
  }
}
