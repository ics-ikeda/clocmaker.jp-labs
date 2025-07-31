'use client';

import { data } from '../lib/data-service';
import WorkItem from '../components/WorkItem';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.pageGrid}>
      <header className={styles.header}>
        <Header />
      </header>

      <main className={styles.main}>
        <div className={styles.pageTopHero}>
          <h2 className={styles.subTitle}>
            <strong>Interaction Design &times; Web Technology</strong><br />
            <small>https://clockmaker.jp/labs/</small>
          </h2>
        </div>
        <div className={styles.pageTopHeroArea}>
          <div className={styles.pageTopHeroAreaRow}>
            {data.map((item) => (
              <WorkItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer meta="This work is build with WebGPU." />
      </footer>
    </div>
  );
}
