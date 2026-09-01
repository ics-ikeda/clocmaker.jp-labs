export interface ItemData {
  id: string;
  /** public/videos 配下のマウスオーバー用動画ファイル名。動画がない場合は null */
  previewVideo: string | null;
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
export type DataGroup = [ItemData, ...ItemData[]];
export type DataStructure = DataGroup[];
