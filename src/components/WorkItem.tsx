"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";
import ShuffleText from "shuffle-text";
import {
  playClickSound,
  playMouseOverSound,
  playTransitionUpSound,
} from "@/lib/sound-service";
import type { ItemData } from "../types/item-data";
import styles from "./WorkItem.module.css";

// 定数定義
const MOBILE_BREAKPOINT = 768;

interface WorkItemProps {
  data: ItemData;
  className?: string;
}

export default function WorkItem({ data, className }: WorkItemProps) {
  const router = useRouter();
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
    }
  }, []);

  const handleMouseOver = () => {
    setIsRollOver(true);
    shuffleTextTitleRef.current?.start();
    shuffleTextDateRef.current?.start();
  };

  const handleMouseOut = () => {
    shuffleTextTitleRef.current?.start();
    shuffleTextDateRef.current?.start();
    setIsRollOver(false);
  };

  const handleClick = async () => {
    playClickSound();
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      const win = window.open(data.demo);
      if (win) {
        win.focus();
      }
    } else {
      // 直接ページ遷移
      router.push(`/works/${data.id}`);
      playTransitionUpSound();
    }
  };

  const handleLoadComplete = () => {
    setIsLoadComplete(true);
  };

  const handleLoadError = () => {
    // 画像の読み込みに失敗した場合でも表示する
    setIsLoadComplete(true);
    console.warn(`Failed to load image for: ${data.title}`);
  };

  const handlePlaySoundRollOver = () => {
    playMouseOverSound();
  };

  const handlePlaySoundClick = () => {
    playClickSound();
  };

  return (
    <div
      className={`${styles.workItem} ${isRollOver ? styles.show : ""} ${className || ""}`}
    >
      <button
        type="button"
        className={styles.workItemButton}
        onMouseEnter={handlePlaySoundRollOver}
        onFocus={handlePlaySoundRollOver}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
        data-prefetch
        data-demo-url={data.demo}
      >
        <div className={styles.imgContainer}>
          <ViewTransition name={`work-item-${data.id}`}>
            <Image
              src={data.img}
              width={460}
              height={200}
              loading="lazy"
              onLoad={handleLoadComplete}
              onError={handleLoadError}
              className={isLoadComplete ? styles.show : ""}
              alt={data.title}
              style={{
                position: "absolute",
                top: 0,
                visibility: isLoadComplete ? "visible" : "hidden",
                width: "100%",
                height: "auto",
                aspectRatio: "460/200",
                objectFit: "cover",
                filter: isLoadComplete
                  ? "brightness(100%)"
                  : "brightness(400%)",
                transition: "all 0.3s ease",
              }}
              unoptimized={true}
            />
          </ViewTransition>
          <div className={styles.imgRollover}></div>
        </div>

        <div className={styles.meta}>
          <div ref={textTitleRef} className={styles.title}>
            {data.title}
          </div>
          <div ref={textDateRef} className={styles.date}>
            {data.date}
          </div>
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
