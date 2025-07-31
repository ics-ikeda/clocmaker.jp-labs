'use client';

import { useState, useEffect, useRef } from 'react';
import { useIframe } from '../../../contexts/IframeContext';
import styles from './page.module.css';

interface IframeReuseProps {
  src: string;
  title: string;
}

export default function IframeReuse({ src, title }: IframeReuseProps) {
  const { getPreloadedIframe, clearPreloadedIframe } = useIframe();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // プリロードされたiframeを取得
    const preloadedIframe = getPreloadedIframe();

    if (preloadedIframe && preloadedIframe.src === src) {
      // プリロードされたiframeを再利用
      setIsLoading(false);

      // iframeのスタイルをリセットして正しいスタイルを適用
      preloadedIframe.style.position = 'absolute';
      preloadedIframe.style.left = '0';
      preloadedIframe.style.top = '0';
      preloadedIframe.style.width = '100%';
      preloadedIframe.style.height = '100%';
      preloadedIframe.style.opacity = '1';
      preloadedIframe.className = styles.demoIframe;

      // コンテナに追加
      container.appendChild(preloadedIframe);

      // コンテナから削除されたときにクリーンアップ
      const observer = new MutationObserver(() => {
        if (!container.contains(preloadedIframe)) {
          clearPreloadedIframe();
          observer.disconnect();
        }
      });

      observer.observe(container, { childList: true });

    } else {
      // プリロードされたiframeがない場合は新しく作成
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = title;
      iframe.className = styles.demoIframe;
      iframe.allowFullscreen = true;

      iframe.onload = () => {
        setIsLoading(false);
      };

      iframe.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };

      container.appendChild(iframe);
    }
  }, [src, title, getPreloadedIframe, clearPreloadedIframe]);

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <h2>Failed to load content</h2>
        <p>The iframe content could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className={styles.iframeContainer}>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className="loading">
            <i className="fa fa-refresh"></i> Loading iframe...
          </div>
        </div>
      )}
      <div ref={containerRef} className={styles.iframeWrapper} />
    </div>
  );
}
