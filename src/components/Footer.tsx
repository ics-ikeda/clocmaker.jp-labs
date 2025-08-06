"use client";

import styles from "./Footer.module.css";

interface FooterProps {
  meta: string;
}

export default function Footer({ meta }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="footer-created">
        <span>
          <i className="fa fa-code"></i> {meta}
        </span>
      </div>
      <div className={styles.footerAuthor}>
        All works are created by
        <a
          href="https://twitter.com/clockmaker"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          IKEDA Yasunobu
        </a>
        .
      </div>
      <div className="footer-copyright">
        &copy; {year} <a href="http://clockmaker.jp/blog">clockmaker.jp</a>
      </div>
    </footer>
  );
}
