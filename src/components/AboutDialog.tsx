"use client";

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
      <div className={styles.header}>
        <h2>ClockMaker Labs</h2>
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
      </div>

      <div className={styles.body}>
        <div className={styles.language} lang="ja">
          <p>
            ClockMaker Labsは、インタラクションデザイナーの
            <a
              href="https://x.com/clockmaker"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            ClockMaker Labs is a personal collection by interaction designer{" "}
            <a
              href="https://x.com/clockmaker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yasunobu Ikeda
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
