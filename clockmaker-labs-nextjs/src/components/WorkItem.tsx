'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ShuffleText from 'shuffle-text';
import type { ItemData } from '../types/item-data';
import { SoundService } from '../lib/sound-service';
import styles from './WorkItem.module.css';

interface WorkItemProps {
  data: ItemData;
  className?: string;
}

export default function WorkItem({ data, className }: WorkItemProps) {
  const router = useRouter();
  const soundService = useRef(new SoundService());
  const textTitleRef = useRef<HTMLDivElement>(null);
  const textDateRef = useRef<HTMLDivElement>(null);
  const shuffleTextTitleRef = useRef<ShuffleText | null>(null);
  const shuffleTextDateRef = useRef<ShuffleText | null>(null);
  const [isRollOver, setIsRollOver] = useState(false);
  const [isLoadComplete, setIsLoadComplete] = useState(false);

  useEffect(() => {
    if (textTitleRef.current && textDateRef.current) {
      shuffleTextTitleRef.current = new ShuffleText(textTitleRef.current);
      shuffleTextDateRef.current = new ShuffleText(textDateRef.current);

      shuffleTextTitleRef.current.emptyCharacter = '---';
      shuffleTextDateRef.current.emptyCharacter = '---';
    }
  }, []);

  const handleMouseOver = () => {
    shuffleTextTitleRef.current?.start();
    shuffleTextDateRef.current?.start();
    soundService.current.playMouseOverSound();
    setIsRollOver(true);
  };

  const handleMouseOut = () => {
    shuffleTextTitleRef.current?.start();
    shuffleTextDateRef.current?.start();
    setIsRollOver(false);
  };

  const handleClick = () => {
    soundService.current.playClickSound();
    if (window.innerWidth < 768) {
      const win = window.open(data.demo);
      if (win) {
        win.focus();
      }
    } else {
      router.push(`/works/${data.id}`);
    }
  };

  const handleLoadComplete = () => {
    setIsLoadComplete(true);
  };

  const handlePlaySoundRollOver = () => {
    soundService.current.playMouseOverSound();
  };

  const handlePlaySoundClick = () => {
    soundService.current.playClickSound();
  };

  return (
    <div className={`${styles.workItem} ${isRollOver ? styles.show : ''} ${className || ''}`}>
      <button
        className={styles.workItemButton}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleClick}
      >
        <div className={styles.imgContainer}>
          <Image
            src={data.img}
            width={460}
            height={200}
            onLoad={handleLoadComplete}
            className={isLoadComplete ? styles.show : ''}
            alt={data.title}
            style={{
              position: 'absolute',
              top: 0,
              visibility: isLoadComplete ? 'visible' : 'hidden',
              width: '100%',
              height: 'auto',
              aspectRatio: '460/200',
              objectFit: 'cover',
              filter: isLoadComplete ? 'brightness(100%)' : 'brightness(400%)',
              transition: 'all 0.3s ease'
            }}
          />
          <div className={styles.imgRollover}></div>
        </div>

        <div className={styles.meta}>
          <div ref={textTitleRef} className={styles.title}>{data.title}</div>
          <div ref={textDateRef} className={styles.date}>{data.date}</div>
        </div>
      </button>

      <div className={styles.btnGroup}>
        {data.blog_ja && (
          <a
            className={styles.customLink}
            onMouseEnter={handlePlaySoundRollOver}
            onClick={handlePlaySoundClick}
            href={data.blog_ja}
            target="_blank"
          >
            MORE - JP
          </a>
        )}
        {data.blog_en && (
          <a
            className={styles.customLink}
            onMouseEnter={handlePlaySoundRollOver}
            onClick={handlePlaySoundClick}
            href={data.blog_en}
            target="_blank"
          >
            MORE - EN
          </a>
        )}
      </div>
    </div>
  );
}
