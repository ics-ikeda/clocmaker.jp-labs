"use client";

import { useRouter } from "next/navigation";
import {
  getIndex,
  getItemAt,
  getRelatedWorks,
  hasRelatedWorks,
} from "../lib/data-service";
import { playClickSound, playTransitionDownSound } from "../lib/sound-service";
import type { ItemData } from "../types/item-data";
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
  isLoading?: boolean;
  itemData?: ItemData;
}

export default function Header({
  title = "ClockMaker Labs",
  showNavigation = false,
  isLoading = false,
  itemData,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    playClickSound();
    router.push("/");
    playTransitionDownSound();
  };

  const handlePrevClick = () => {
    playClickSound();
    if (itemData) {
      const pageShift = -1;
      const index = getIndex(itemData.id);
      const dataItem = getItemAt(index + pageShift);
      if (dataItem) {
        router.push(`/works/${dataItem.id}`);
      }
    }
  };

  const handleNextClick = () => {
    playClickSound();
    if (itemData) {
      const pageShift = 1;
      const index = getIndex(itemData.id);
      const dataItem = getItemAt(index + pageShift);
      if (dataItem) {
        router.push(`/works/${dataItem.id}`);
      }
    }
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId && selectedId !== itemData?.id) {
      playClickSound();
      router.push(`/works/${selectedId}`);
    }
  };

  // 関連作品があるかチェック
  const hasRelated = itemData ? hasRelatedWorks(itemData.id) : false;
  const relatedWorks = itemData ? getRelatedWorks(itemData.id) : [];

  // バージョン番号を動的に生成（配列の順序に基づく）
  const getVersionNumber = (workId: string, works: ItemData[]) => {
    const index = works.findIndex((work) => work.id === workId);
    if (index === -1) return "";
    // 配列の最後から順番に番号をふる（最後がVer.1、その前がVer.2...）
    const versionNumber = works.length - index;
    return `Ver.${versionNumber}`;
  };

  return (
    <nav className={styles.detailPageNavi}>
      {showNavigation && (
        <div className={styles.detailPageNaviNavigation}>
          <div className={styles.btnLink}>
            <button className={styles.btnBack} onClick={handleBackClick}>
              <i className="fa fa-th"></i>
              <span className={styles.btnLabelPrev}>TOP</span>
            </button>
          </div>
          <div className={styles.btnLink}>
            <button className={styles.btnBack} onClick={handlePrevClick}>
              <i className="fa fa-chevron-left"></i>
              <span className={styles.btnLabelPrev}>PREV</span>
            </button>
          </div>
          <div className={styles.btnLink}>
            <button className={styles.btnBack} onClick={handleNextClick}>
              <span className={styles.btnLabelNext}>NEXT</span>
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <i className="fa fa-refresh"></i> Now Loading...
        </div>
      )}

      <div className={styles.headerDetailH1}>
        <h1>{title}</h1>
      </div>

      {hasRelated && itemData && (
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
                  <img src={work.img} alt="" className={styles.selectedImage} />
                  <div className={styles.selectedTitle}>
                    {getVersionNumber(work.id, relatedWorks)} - {work.date}
                  </div>
                  <div className={styles.selectedTech}>
                    {work.technology.join(", ")}
                  </div>
                </option>
              ))}
            </>
          </select>
        </div>
      )}
    </nav>
  );
}
