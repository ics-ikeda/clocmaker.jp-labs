import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ItemData} from '../data/item-data';

@Injectable()
export class DataService {

  public data: ItemData[];

  constructor(private http: Http) {

  }

  public getJson(): Promise<ItemData[]> {
    return new Promise<ItemData[]>((resolve: Function) => {
      if (this.data == null) {
        this.http.get('assets/data.json')
          .subscribe(res => {
            this.data = res.json() as ItemData[];
            resolve(this.data);
          });
      } else {
        resolve(this.data);
      }
    });
  }

  public getDetail(id: string): Promise<ItemData> {
    return new Promise<ItemData>((resolve: Function) => {
      if (this.data != null) {
        resolve(this.searchData(id));
      } else {
        this.getJson().then(itemDataList => {
          resolve(this.searchData(id));
        });
      }
    });

  }

  private searchData(id: string): ItemData {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        return this.data[i];
      }
    }
    return null;
  }

  public getIndex(id: String): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  public getItemAt(index: number): ItemData {

    if (index < 0) {
      return this.data[this.data.length - 1];
    }
    if (index > this.data.length - 1) {
      return this.data[0];
    }

    return this.data[index];
  }
}
