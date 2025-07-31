'use client';

import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface IframeContextType {
  preloadIframe: (src: string) => Promise<void>;
  getPreloadedIframe: () => HTMLIFrameElement | null;
  clearPreloadedIframe: () => void;
}

const IframeContext = createContext<IframeContextType | undefined>(undefined);

export function IframeProvider({ children }: { children: ReactNode }) {
  const preloadedIframeRef = useRef<HTMLIFrameElement | null>(null);

  const preloadIframe = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      // 既存のiframeがあれば削除
      if (preloadedIframeRef.current) {
        try {
          document.body.removeChild(preloadedIframeRef.current);
        } catch {
          // iframeが既に削除されている場合は無視
        }
        preloadedIframeRef.current = null;
      }

      // 新しいiframeを作成
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.style.opacity = '0';
      iframe.src = src;

      iframe.onload = () => {
        resolve();
      };

      iframe.onerror = () => {
        resolve(); // エラーでも遷移を続行
      };

      document.body.appendChild(iframe);
      preloadedIframeRef.current = iframe;
    });
  };

  const getPreloadedIframe = (): HTMLIFrameElement | null => {
    return preloadedIframeRef.current;
  };

  const clearPreloadedIframe = () => {
    if (preloadedIframeRef.current) {
      try {
        document.body.removeChild(preloadedIframeRef.current);
      } catch {
        // iframeが既に削除されている場合は無視
      }
      preloadedIframeRef.current = null;
    }
  };

  return (
    <IframeContext.Provider value={{ preloadIframe, getPreloadedIframe, clearPreloadedIframe }}>
      {children}
    </IframeContext.Provider>
  );
}

export function useIframe() {
  const context = useContext(IframeContext);
  if (context === undefined) {
    throw new Error('useIframe must be used within an IframeProvider');
  }
  return context;
}
