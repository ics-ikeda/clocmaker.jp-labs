import { data } from "@/data";
import type { ItemData } from "@/types/item-data";

export { data };

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

// 特定のIDに関連する作品（同じ配列内の他の作品）を取得
export function getRelatedWorks(id: string): ItemData[] {
  if (!data) {
    return [];
  }

  // 各配列内で検索
  for (const itemArray of data) {
    const item = itemArray.find((obj) => obj.id === id);
    if (item) {
      return itemArray; // 同じ配列内のすべての作品を返す
    }
  }
  return [];
}

// 特定のIDが関連作品を持つかどうかをチェック
export function hasRelatedWorks(id: string): boolean {
  const relatedWorks = getRelatedWorks(id);
  return relatedWorks.length > 1;
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

// 配列（同一グループ）から開始日を算出して表示用に整形
export function formatStartDateForGroup(items: ItemData[]): string {
  if (!items || items.length === 0) {
    return "";
  }
  const earliestDate = items
    .map((item) => item.date)
    .reduce((min, cur) => (cur < min ? cur : min));
  return items.length > 1 ? `${earliestDate} -` : earliestDate;
}
