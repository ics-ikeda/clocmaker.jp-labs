'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { ItemData } from '../../../types/item-data';
import { DataService } from '../../../lib/data-service';
import { SoundService } from '../../../lib/sound-service';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './page.module.css';

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState<ItemData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transitionState, setTransitionState] = useState('hide');
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [id, setId] = useState<string | null>(null);

  const dataService = useMemo(() => new DataService(), []);
  const soundService = useMemo(() => new SoundService(), []);

  useEffect(() => {
    const loadData = async () => {
      const itemId = params.id as string;
      const itemData = await dataService.getDetail(itemId);

      if (itemData) {
        requestAnimationFrame(() => {
          setTransitionState('hide');
          const delay = id === null ? 0 : 500;

          setTimeout(() => {
            setData(itemData);
            setIframeUrl(itemData.demo);
            setTransitionState('show');
            setId(itemData.id);
          }, delay);
        });
      } else {
        router.push('/');
      }
    };

    setIsLoading(true);
    loadData();
  }, [params.id, router, dataService, id]);

  const onLoad = () => {
    requestAnimationFrame(() => {
      setIsLoading(false);
    });
  };

  const onBackClick = () => {
    soundService.playClickSound();
    router.push('/');
  };

  const onPrevClick = () => {
    gotoPage(-1);
  };

  const onNextClick = () => {
    gotoPage(+1);
  };

  const gotoPage = (pageShift: number) => {
    soundService.playClickSound();

    if (!id) {
      return;
    }

    const index = dataService.getIndex(id);
    const dataItem = dataService.getItemAt(index + pageShift);

    if (!dataItem) {
      return;
    }

    router.push(`/works/${dataItem.id}`);
  };

  if (!data) {
    return null;
  }

  return (
    <div className={styles.detailPage}>
      <div className={!isLoading ? styles.show : ''}>
        <Header
          title={data.title}
          showBackButton={true}
          showNavigation={true}
          onBackClick={onBackClick}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isLoading={isLoading}
        />

        <div className={`${styles.mainContent} ${transitionState === 'show' ? styles.show : ''}`}>
          <iframe
            src={iframeUrl}
            onLoad={onLoad}
            width="100%"
            height="100%"
            title={data.title}
          />
        </div>

        <Footer meta={`${data.date} - This work is build with ${data.technology.join(', ')}.`} />
      </div>
    </div>
  );
}
