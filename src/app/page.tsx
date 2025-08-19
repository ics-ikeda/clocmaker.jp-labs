"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import WorkItem from "../components/WorkItem";
import { data } from "@/lib/data-service";
import styles from "./page.module.css";

export default function Home() {
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
            {data.map((itemArray, index) => (
              <WorkItem key={index} data={itemArray[0]} />
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer meta="This website is build with Next.js." />
      </footer>
    </div>
  );
}
