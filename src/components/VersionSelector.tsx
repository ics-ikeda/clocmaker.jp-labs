"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { getRelatedWorks, hasRelatedWorks } from "../lib/data-service";
import {
  playClickSound,
  playNavigationMouseOverSound,
} from "../lib/sound-service";
import type { ItemData } from "../types/item-data";
import selectStyles from "./NativeSelect.module.css";
import styles from "./VersionSelector.module.css";

interface VersionSelectorProps {
  itemData: ItemData;
  compact?: boolean;
}

// 日付から年のみを抽出する関数
const getYearFromDate = (dateString: string) => {
  return Number(dateString.split("/", 1)[0]);
};

// バージョン番号を動的に生成（配列の順序に基づく）
const getVersionNumber = (workId: string, works: ItemData[]) => {
  const index = works.findIndex((work) => work.id === workId);
  if (index === -1) return "";
  // 配列の最後から順番に番号をふる（最後がVer. 1、その前がVer. 2...）
  const versionNumber = works.length - index;
  return `Ver. ${versionNumber}`;
};

export default function VersionSelector({
  itemData,
  compact = false,
}: VersionSelectorProps) {
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
    <div
      className={
        compact
          ? `${styles.versionSelector} ${styles.versionSelectorCompact}`
          : styles.versionSelector
      }
    >
      <select
        name="version"
        aria-label="Version"
        data-year={getYearFromDate(itemData.date)}
        value={itemData.id}
        onChange={handleVersionChange}
        onMouseEnter={playNavigationMouseOverSound}
        className={`${selectStyles.select} ${
          compact
            ? `${styles.versionSelect} ${styles.versionSelectCompact}`
            : styles.versionSelect
        }`}
      >
        {relatedWorks.map((work) => {
          const year = getYearFromDate(work.date);
          const thumbnailStyle: CSSProperties & {
            "--version-thumbnail": string;
          } = {
            "--version-thumbnail": `url("${work.img}")`,
          };

          return (
            <option
              key={work.id}
              value={work.id}
              data-technology={work.technology.join(", ")}
              style={thumbnailStyle}
              // Next同梱Reactのoption検証が旧仕様のため、標準HTMLのspanを渡す。
              // 補間値は計算した番号・数値の年・CSS Modulesのクラス名に限定する。
              dangerouslySetInnerHTML={{
                __html: `${getVersionNumber(work.id, relatedWorks)} <span class="${styles.versionYear}" data-year="${year}"></span>`,
              }}
            />
          );
        })}
      </select>
    </div>
  );
}
