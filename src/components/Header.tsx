"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import { getIndex, getItemAt } from "../lib/data-service";
import { playClickSound, playTransitionDownSound } from "../lib/sound-service";
import type { ItemData } from "../types/item-data";
import styles from "./Header.module.css";
import VersionSelector from "./VersionSelector";
import { runViewTransition } from "@/lib/view-transition";

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
  const currentIndex = itemData ? getIndex(itemData.id) : -1;
  const prevItem =
    itemData && currentIndex !== -1 ? getItemAt(currentIndex - 1) : null;
  const nextItem =
    itemData && currentIndex !== -1 ? getItemAt(currentIndex + 1) : null;

  const handleNavigate = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    path: string,
    onAfterClick?: () => void,
  ) => {
    event.preventDefault();
    playClickSound();
    onAfterClick?.();
    runViewTransition(() => {
      router.push(path);
    });
  };

  return (
    <nav className={styles.detailPageNavi}>
      {showNavigation && (
        <div className={styles.detailPageNaviNavigation}>
          <div className={styles.btnLink}>
            <Link
              className={styles.btnBack}
              href="/"
              onClick={(event) =>
                handleNavigate(event, "/", playTransitionDownSound)
              }
            >
              <i className="fa fa-th"></i>
              <span className={styles.btnLabelPrev}>TOP</span>
            </Link>
          </div>
          <div className={styles.btnLink}>
            {prevItem && (
              <Link
                className={styles.btnBack}
                href={`/works/${prevItem.id}`}
                onClick={(event) =>
                  handleNavigate(event, `/works/${prevItem.id}`)
                }
              >
                <i className="fa fa-chevron-left"></i>
                <span className={styles.btnLabelPrev}>PREV</span>
              </Link>
            )}
          </div>
          <div className={styles.btnLink}>
            {nextItem && (
              <Link
                className={styles.btnBack}
                href={`/works/${nextItem.id}`}
                onClick={(event) =>
                  handleNavigate(event, `/works/${nextItem.id}`)
                }
              >
                <span className={styles.btnLabelNext}>NEXT</span>
                <i className="fa fa-chevron-right"></i>
              </Link>
            )}
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
