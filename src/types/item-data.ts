export interface ItemData {
  id: string;
  blog_en: string | null;
  blog_ja: string | null;
  date: string;
  demo: string;
  img: string;
  title: string;
  type: string;
  technology: string[];
}

// data.jsonの構造を表す型
export type DataStructure = ItemData[][];
