'use client';

import { useEffect, useState } from 'react';
import type { ItemData } from '../types/item-data';
import { DataService } from '../lib/data-service';
import Header from '../components/Header';
import WorkItem from '../components/WorkItem';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function HomePage() {
  const [itemDataList, setItemDataList] = useState<ItemData[]>([]);

  useEffect(() => {
    const dataService = new DataService();
    dataService.getJson().then((items) => {
      setItemDataList(items);
    });
  }, []);

  return (
    <div className={styles.topPage}>
      <Header title="ClockMaker Labs" />

      <div className={styles.mainContent}>
        <h2 className={styles.subTitle}>
          <strong>Interaction Design &times; Web Technology</strong><br />
          <small>https://clockmaker.jp/labs/</small>
        </h2>

        <div className={styles.pageTopHero}>
          <div className={styles.pageTopHeroArea}>
            <div id="contentListHTML5" className={styles.pageTopHeroAreaRow}>
              {itemDataList.map((dataItem) => (
                <WorkItem
                  key={dataItem.id}
                  data={dataItem}
                  className={styles.listItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer meta="This website is build with Next.js 15." />
    </div>
  );
}
