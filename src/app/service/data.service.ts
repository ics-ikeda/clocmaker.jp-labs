import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ItemData} from '../data/item-data';

@Injectable()
export class DataService {

  public data: ItemData[] | null;

  constructor(private http: HttpClient) {

  }

  public getJson(): Promise<ItemData[]> {
    return new Promise<ItemData[]>((resolve: (items: ItemData[]) => void) => {
      if (this.data == null) {
        this.http.get('assets/data.json')
          .subscribe((res: ItemData[]) => {
            this.data = res;
            resolve(this.data);
          });
      } else {
        resolve(this.data);
      }
    });
  }

  public getDetail(id: string): Promise<ItemData> {

    return new Promise<ItemData>((resolve: (item: ItemData | undefined) => void) => {
      if (this.data != null) {
        resolve(this.searchData(id));
      } else {
        this.getJson().then(() => {
          resolve(this.searchData(id));
        });
      }
    });

  }

  private searchData(id: string): ItemData | undefined {

    if (!this.data){
      return undefined;
    }

    const item = this.data.find(obj => obj.id === id);

    return item;
  }

  public getIndex(id: string): number {
    if (!this.data){
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
    if (!this.data){
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
