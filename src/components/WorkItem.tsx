"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import ShuffleText from "shuffle-text";
import { ViewTransition } from "@/components/ViewTransition";
import {
  playClickSound,
  playMouseOverSound,
  playTransitionUpSound,
} from "@/lib/sound-service";
import { runViewTransition } from "@/lib/view-transition";
import type { ItemData } from "@/types/item-data";
import styles from "./WorkItem.module.css";

// 定数定義
const MOBILE_BREAKPOINT = 768;
const SHUFFLE_CHARACTERS = "01";
const INTRO_START_OFFSET = 200;
const INTRO_DELAY_MIN = 80;
const INTRO_RANDOM_DELAY_RANGE = 360;
const INTRO_ORDER_DELAY_STEP = 6;
const INTRO_ORDER_DELAY_MAX = 240;
const INTRO_REVEAL_OFFSET = 14;
type RollOverState = "idle" | "show" | "hide";

const createShuffleText = (element: HTMLElement): ShuffleText => {
  const shuffleText = new ShuffleText(element);
  shuffleText.sourceRandomCharacter = SHUFFLE_CHARACTERS;
  return shuffleText;
};

const getIntroDelay = (id: string, introOrder: number): number => {
  let hash = 0;

  for (const character of id) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  const randomDelay = hash % INTRO_RANDOM_DELAY_RANGE;
  const orderDelay = Math.min(
    introOrder * INTRO_ORDER_DELAY_STEP,
    INTRO_ORDER_DELAY_MAX,
  );

  return INTRO_START_OFFSET + INTRO_DELAY_MIN + orderDelay + randomDelay;
};

// Keep track of loaded thumbnails so they stay visible after returning via back navigation.
const loadedWorkItems = new Set<string>();
const animatedWorkItems = new Set<string>();

interface WorkItemProps {
  data: ItemData;
  introOrder?: number;
  playIntro?: boolean;
}

export default function WorkItem({
  data,
  introOrder = 0,
  playIntro = false,
}: WorkItemProps) {
  const router = useRouter();
  const textTitleRef = useRef<HTMLDivElement>(null);
  const textDateRef = useRef<HTMLDivElement>(null);
  const shuffleTextTitleRef = useRef<ShuffleText | null>(null);
  const shuffleTextDateRef = useRef<ShuffleText | null>(null);
  const [rollOverState, setRollOverState] = useState<RollOverState>("idle");
  const [isLoadComplete, setIsLoadComplete] = useState(() =>
    loadedWorkItems.has(data.id),
  );
  const [shouldPlayIntro] = useState(
    () => playIntro && !animatedWorkItems.has(data.id),
  );
  const introDelay = getIntroDelay(data.id, introOrder);

  useEffect(() => {
    if (textTitleRef.current && textDateRef.current) {
      const titleShuffleText = createShuffleText(textTitleRef.current);
      const dateShuffleText = createShuffleText(textDateRef.current);
      shuffleTextTitleRef.current = titleShuffleText;
      shuffleTextDateRef.current = dateShuffleText;

      return () => {
        titleShuffleText.dispose();
        dateShuffleText.dispose();
        shuffleTextTitleRef.current = null;
        shuffleTextDateRef.current = null;
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (shouldPlayIntro) {
      animatedWorkItems.add(data.id);
    }
  }, [data.id, shouldPlayIntro]);

  useEffect(() => {
    if (
      !shouldPlayIntro ||
      !isLoadComplete ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      shuffleTextTitleRef.current?.start();
      shuffleTextDateRef.current?.start();
    }, introDelay + INTRO_REVEAL_OFFSET);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [introDelay, isLoadComplete, shouldPlayIntro]);

  const handleMouseOver = () => {
    setRollOverState("show");
    shuffleTextTitleRef.current?.start();
    shuffleTextDateRef.current?.start();
  };

  const handleMouseOut = () => {
    shuffleTextTitleRef.current?.start();
    shuffleTextDateRef.current?.start();
    setRollOverState("hide");
  };

  const handleClick = async (event: ReactMouseEvent<HTMLAnchorElement>) => {
    playClickSound();
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      event.preventDefault();
      const win = window.open(data.demo);
      if (win) {
        win.focus();
      }
      return;
    }

    event.preventDefault();
    playTransitionUpSound();
    runViewTransition(() => {
      router.push(`/works/${data.id}`);
    });
  };

  const handleLoadComplete = () => {
    loadedWorkItems.add(data.id);
    setIsLoadComplete(true);
  };

  const handlePlaySoundRollOver = () => {
    playMouseOverSound();
  };

  const handlePlaySoundClick = () => {
    playClickSound();
  };

  const introClassName = shouldPlayIntro
    ? isLoadComplete
      ? styles.workItemIntro
      : styles.workItemIntroPending
    : "";
  const rollOverClassName =
    rollOverState === "show"
      ? styles.show
      : rollOverState === "hide"
        ? styles.hide
        : "";

  return (
    <div
      className={`${styles.workItem} ${introClassName} ${rollOverClassName}`}
      style={
        {
          "--work-item-intro-delay": `${introDelay}ms`,
        } as CSSProperties
      }
    >
      <Link
        href={`/works/${data.id}`}
        className={styles.workItemButton}
        onMouseEnter={handlePlaySoundRollOver}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
        data-prefetch
        data-demo-url={data.demo}
      >
        <ViewTransition name={`work-item-${data.id}`}>
          <div
            className={styles.imgContainer}
            style={{ viewTransitionName: `work-item-${data.id}` }}
          >
            <Image
              src={data.img}
              width={460}
              height={200}
              loading="lazy"
              onLoad={handleLoadComplete}
              onError={handleLoadComplete}
              className={isLoadComplete ? styles.show : ""}
              alt=""
              style={{
                position: "absolute",
                top: 0,
                visibility: isLoadComplete ? "visible" : "hidden",
                width: "100%",
                height: "auto",
                aspectRatio: "460/200",
                objectFit: "cover",
              }}
              unoptimized={true}
            />
            <div className={styles.imgRollover}></div>
          </div>
        </ViewTransition>

        <div className={styles.meta}>
          <div
            ref={textTitleRef}
            className={styles.title}
            style={{ viewTransitionName: `work-title-${data.id}` }}
          >
            {data.title}
          </div>
          <div ref={textDateRef} className={styles.date}>
            {data.date}
          </div>
        </div>
      </Link>

      <div className={styles.btnGroup}>
        {data.blog_ja && (
          <a
            className={styles.customLink}
            onMouseEnter={handlePlaySoundRollOver}
            onClick={handlePlaySoundClick}
            href={data.blog_ja}
            target="_blank"
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
          >
            MORE - EN
          </a>
        )}
      </div>
    </div>
  );
}
