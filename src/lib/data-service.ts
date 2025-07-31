import type { ItemData } from '../types/item-data';
import jsonData from '../data.json';

export const data: ItemData[] = jsonData;

export function getDetail(id: string) {
  return searchData(id);
}

function searchData(id: string): ItemData | null {
  if (!data) {
    return null;
  }

  const item = data.find((obj) => obj.id === id);

  if (!item) {
    return null;
  }
  return item;
}

export function getIndex(id: string): number {
  if (!data) {
    return -1;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return i;
    }
  }
  return -1;
}

export function getItemAt(index: number) {
  if (!data) {
    return null;
  }

  if (index < 0) {
    return data[data.length - 1];
  }
  if (index > data.length - 1) {
    return data[0];
  }

  return data[index];
}
