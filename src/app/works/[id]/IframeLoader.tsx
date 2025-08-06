'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface IframeLoaderProps {
  src: string;
  title: string;
}

export default function IframeLoader({ src, title }: IframeLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1秒後にローディングを終了

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

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
      <iframe
        src={src}
        title={title}
        className={styles.demoIframe}
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
}
