"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { runViewTransition } from "@/lib/view-transition";
import { getIndex, getItemAt } from "../lib/data-service";
import {
  playClickSound,
  playNavigationMouseOverSound,
  playTransitionDownSound,
} from "../lib/sound-service";
import type { ItemData } from "../types/item-data";
import styles from "./Header.module.css";
import TextShuffle from "./TextShuffle";
import VersionSelector from "./VersionSelector";

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
  isLoading?: boolean;
  itemData?: ItemData;
  compact?: boolean;
  actions?: ReactNode;
  animateTitle?: boolean;
}

const getWorkRoute = (id: string): Route => `/works/${id}` as Route;

export default function Header({
  title = "ClockMaker Labs",
  showNavigation = false,
  isLoading = false,
  itemData,
  compact = false,
  actions,
  animateTitle = false,
}: HeaderProps) {
  const router = useRouter();
  const currentIndex = itemData ? getIndex(itemData.id) : -1;
  const prevItem =
    itemData && currentIndex !== -1 ? getItemAt(currentIndex - 1) : null;
  const nextItem =
    itemData && currentIndex !== -1 ? getItemAt(currentIndex + 1) : null;

  const handleNavigate = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    path: Route,
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
    <nav
      className={
        compact
          ? `${styles.detailPageNavi} ${styles.detailPageNaviCompact}`
          : styles.detailPageNavi
      }
    >
      {showNavigation && (
        <div className={styles.detailPageNaviNavigation}>
          <div className={styles.btnLink}>
            <Link
              className={styles.btnBack}
              href="/"
              onMouseEnter={playNavigationMouseOverSound}
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
                href={getWorkRoute(prevItem.id)}
                onMouseEnter={playNavigationMouseOverSound}
                onClick={(event) =>
                  handleNavigate(event, getWorkRoute(prevItem.id))
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
                href={getWorkRoute(nextItem.id)}
                onMouseEnter={playNavigationMouseOverSound}
                onClick={(event) =>
                  handleNavigate(event, getWorkRoute(nextItem.id))
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

      <div
        className={
          itemData
            ? styles.headerDetailH1
            : `${styles.headerDetailH1} ${styles.headerH1Top}`
        }
      >
        <h1>
          {animateTitle ? (
            <TextShuffle delay={80} duration={820}>
              {title}
            </TextShuffle>
          ) : (
            title
          )}
        </h1>
      </div>

      {actions && <div className={styles.headerActions}>{actions}</div>}

      {itemData && <VersionSelector itemData={itemData} compact={compact} />}
    </nav>
  );
}
