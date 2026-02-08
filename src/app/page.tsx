"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WorkItem from "../components/WorkItem";
import { data, formatStartDateForGroup } from "@/lib/data-service";
import type { ItemData } from "@/types/item-data";
import styles from "./page.module.css";

let hasPlayedInitialStagger = false;

export default function Home() {
  const [staggerState, setStaggerState] = useState<"off" | "prepare" | "play">(
    hasPlayedInitialStagger ? "off" : "prepare",
  );

  useEffect(() => {
    if (staggerState !== "prepare") {
      return;
    }

    let cancelled = false;
    const rafId = window.requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }
      hasPlayedInitialStagger = true;
      setStaggerState("play");
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
    };
  }, [staggerState]);

  return (
    <div className={styles.pageGrid}>
      <header className={styles.header}>
        <Header />
      </header>

      <main className={styles.main}>
        <div className={styles.pageTopHero}>
          <h2 className={styles.subTitle}>
            <strong>Interaction Design × Web Technology</strong>
            <br />
            <small>https://clockmaker.jp/labs/</small>
          </h2>
        </div>
        <div className={styles.pageTopHeroArea}>
          <div className={styles.pageTopHeroAreaRow}>
            {data.map((itemArray) => {
              const formattedDate = formatStartDateForGroup(itemArray);
              const head: ItemData = { ...itemArray[0], date: formattedDate };
              return (
                <WorkItem
                  key={head.id}
                  data={head}
                  className={
                    staggerState === "prepare"
                      ? styles.staggerPrepare
                      : staggerState === "play"
                        ? styles.staggerItem
                        : undefined
                  }
                />
              );
            })}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer meta="This website is build with Next.js." />
      </footer>
    </div>
  );
}
