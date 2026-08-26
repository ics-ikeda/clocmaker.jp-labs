"use client";

import { useEffect, useRef } from "react";
import ShuffleText from "shuffle-text";
import styles from "./TextShuffle.module.css";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface TextShuffleProps {
  children: string;
  delay?: number;
  duration?: number;
  characters?: string;
}

export default function TextShuffle({
  children,
  delay = 0,
  duration = 700,
  characters = DEFAULT_CHARACTERS,
}: TextShuffleProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const shuffleText = new ShuffleText(element);
    shuffleText.duration = duration;
    shuffleText.sourceRandomCharacter = characters;

    const timeoutId = window.setTimeout(() => {
      shuffleText.start();
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      shuffleText.dispose();
      element.textContent = children;
    };
  }, [characters, children, delay, duration]);

  return (
    <span className={styles.text}>
      <span ref={textRef} aria-hidden="true">
        {children}
      </span>
      <span className={styles.screenReaderText}>{children}</span>
    </span>
  );
}
