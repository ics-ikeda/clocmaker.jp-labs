'use client';

import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
  onBackClick?: () => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  isLoading?: boolean;
}

export default function Header({
  title = "ClockMaker Labs",
  showNavigation = false,
  onBackClick,
  onPrevClick,
  onNextClick,
  isLoading = false
}: HeaderProps) {
  return (
    <nav className={styles.detailPageNavi}>
      {showNavigation && (
        <div className={styles.detailPageNaviNavigation}>
          <div className={styles.btnLink}>
            <button className={styles.btnBack} onClick={onBackClick}>
              <i className="fa fa-th"></i><span className={styles.btnLabelPrev}>TOP</span>
            </button>
          </div>
          <div className={styles.btnLink}>
            <button className={styles.btnBack} onClick={onPrevClick}>
              <i className="fa fa-chevron-left"></i><span className={styles.btnLabelPrev}>PREV</span>
            </button>
          </div>
          <div className={styles.btnLink}>
            <button className={styles.btnBack} onClick={onNextClick}>
              <span className={styles.btnLabelNext}>NEXT</span><i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <i className="fa fa-refresh"></i> Now Loading...
        </div>
      )}

      <div className={styles.headerDetailH1}>
        <h1>{title}</h1>
      </div>
    </nav>
  );
}
