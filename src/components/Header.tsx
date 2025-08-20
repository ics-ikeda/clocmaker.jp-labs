"use client";

import { useRouter } from "next/navigation";
import { getIndex, getItemAt } from "../lib/data-service";
import { playClickSound, playTransitionDownSound } from "../lib/sound-service";
import type { ItemData } from "../types/item-data";
import styles from "./Header.module.css";
import VersionSelector from "./VersionSelector";

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

      {itemData && <VersionSelector itemData={itemData} />}
    </nav>
  );
}
