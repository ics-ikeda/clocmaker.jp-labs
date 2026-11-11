"use client";

import Image from "next/image";
import {
  playClickSound,
  playNavigationMouseOverSound,
} from "@/lib/sound-service";
import styles from "./AboutDialog.module.css";

const ABOUT_DIALOG_ID = "about-dialog";

export const ABOUT_DIALOG_TRIGGER_COMMAND = {
  command: "show-modal",
  commandfor: ABOUT_DIALOG_ID,
} as const;

const closeDialogCommand = {
  command: "close",
  commandfor: ABOUT_DIALOG_ID,
} as const;

export default function AboutDialog() {
  return (
    <dialog id={ABOUT_DIALOG_ID} className={styles.dialog} closedby="any">
      <button
        type="button"
        className={styles.close}
        aria-label="Close"
        onMouseEnter={playNavigationMouseOverSound}
        onClick={playClickSound}
        {...closeDialogCommand}
      >
        <i className="fa fa-times" />
      </button>

      <div className={styles.profile}>
        <Image
          src="/images/profile_ikeda_yasunobu.avif"
          alt=""
          width={1339}
          height={1339}
          className={styles.portrait}
          unoptimized
        />
        <div className={styles.profileDetails}>
          <div className={styles.identity}>
            <h2 lang="ja">池田 泰延</h2>
            <p lang="en">IKEDA Yasunobu</p>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="https://x.com/clockmaker"
              aria-label="X"
              target="_blank"
              onMouseEnter={playNavigationMouseOverSound}
              onClick={playClickSound}
            >
              <svg viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/clockmaker.jp/"
              aria-label="Instagram"
              target="_blank"
              onMouseEnter={playNavigationMouseOverSound}
              onClick={playClickSound}
            >
              <svg viewBox="2 2 20 20" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://ics.media/entry/staff/ikeda/"
              className={styles.mediaLink}
              target="_blank"
              onMouseEnter={playNavigationMouseOverSound}
              onClick={playClickSound}
            >
              <svg viewBox="2 2 20 20" fill="none">
                <path
                  d="M14 3h7v7M21 3 10 14M10 3H3v18h18v-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>ICS MEDIA</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.language} lang="ja">
          <p>
            ClockMaker Labsは、
            <a href="https://x.com/clockmaker" target="_blank">
              池田泰延
            </a>
            による個人作品集です。プログラムによるモーショングラフィクスをはじめ、インタラクティブな作例を掲載しています。作例はいずれも操作できるので、触って楽しんでいってくださいませ。
          </p>
          <p>
            {
              "本サイトの作例はウェブ技術で作っています。WebGPUや旧Flashなど、その時代の技術の表現の可能性を探って作ってきました。"
            }
          </p>
        </div>

        <div className={styles.language} lang="en">
          <p>
            ClockMaker Labs is a personal collection by{" "}
            <a href="https://x.com/clockmaker" target="_blank">
              IKEDA Yasunobu
            </a>
            . It features programmatic motion graphics and other interactive
            examples. Every piece can be experienced firsthand, so please
            explore, interact, and enjoy.
          </p>
          <p>
            The examples on this site are built with web technologies. From
            WebGPU to legacy Flash, they explore the expressive possibilities
            offered by the technologies of their time.
          </p>
        </div>
      </div>
    </dialog>
  );
}
