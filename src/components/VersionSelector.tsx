"use client";

import { useRouter } from "next/navigation";
import { getRelatedWorks, hasRelatedWorks } from "../lib/data-service";
import { playClickSound } from "../lib/sound-service";
import type { ItemData } from "../types/item-data";
import styles from "./VersionSelector.module.css";

interface VersionSelectorProps {
  itemData: ItemData;
}

// 日付から年のみを抽出する関数
const getYearFromDate = (dateString: string): string => {
  return dateString.split("/")[0];
};

// バージョン番号を動的に生成（配列の順序に基づく）
const getVersionNumber = (workId: string, works: ItemData[]) => {
  const index = works.findIndex((work) => work.id === workId);
  if (index === -1) return "";
  // 配列の最後から順番に番号をふる（最後がVer.1、その前がVer.2...）
  const versionNumber = works.length - index;
  return `Ver.${versionNumber}`;
};

export default function VersionSelector({ itemData }: VersionSelectorProps) {
  const router = useRouter();

  // 関連作品があるかチェック
  const hasRelated = hasRelatedWorks(itemData.id);
  const relatedWorks = getRelatedWorks(itemData.id);

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId && selectedId !== itemData.id) {
      playClickSound();
      router.push(`/works/${selectedId}`);
    }
  };

  if (!hasRelated) {
    return null;
  }

  return (
    <div className={styles.versionSelector}>
      <select
        value={itemData.id}
        onChange={handleVersionChange}
        className={styles.versionSelect}
      >
        <>
          <button>
            <selectedcontent></selectedcontent>
          </button>
          {relatedWorks.map((work) => (
            <option key={work.id} value={work.id}>
              <img
                src={work.img}
                alt=""
                className={styles.optionImage}
                loading={"lazy"}
              />
              <div className={styles.optionTitle}>
                {getVersionNumber(work.id, relatedWorks)} -{" "}
                {getYearFromDate(work.date)}
              </div>
              <div className={styles.optionTech}>
                {work.technology.join(", ")}
              </div>
            </option>
          ))}
        </>
      </select>
    </div>
  );
}
