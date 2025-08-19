import jsonData from "../data.json";
import type { ItemData } from "@/types/item-data";

export const data: ItemData[][] = jsonData;

export function getDetail(id: string) {
  return searchData(id);
}

function searchData(id: string): ItemData | null {
  if (!data) {
    return null;
  }

  // 各配列内で検索
  for (const itemArray of data) {
    const item = itemArray.find((obj) => obj.id === id);
    if (item) {
      return item;
    }
  }
  return null;
}

export function getIndex(id: string): number {
  if (!data) {
    return -1;
  }

  // 各配列内で検索
  for (let i = 0; i < data.length; i++) {
    const itemArray = data[i];
    for (let j = 0; j < itemArray.length; j++) {
      if (itemArray[j].id === id) {
        return i; // 配列のインデックスを返す
      }
    }
  }
  return -1;
}

export function getItemAt(index: number) {
  if (!data) {
    return null;
  }

  if (index < 0) {
    return data[data.length - 1][0]; // 最後の配列の最初の要素
  }
  if (index > data.length - 1) {
    return data[0][0]; // 最初の配列の最初の要素
  }

  return data[index][0]; // 指定された配列の最初の要素
}
