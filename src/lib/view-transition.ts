"use client";

import { startTransition } from "react";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (
    callback: () => void | Promise<void>,
  ) => void | ViewTransition;
};

export const isViewTransitionSupported = () => {
  if (typeof document === "undefined") {
    return false;
  }
  const doc = document as DocumentWithViewTransition;
  return typeof doc.startViewTransition === "function";
};

const runWithinReactTransition = (action: () => void | Promise<void>) => {
  startTransition(() => {
    void action();
  });
};

export const runViewTransition = (action: () => void | Promise<void>) => {
  if (!isViewTransitionSupported()) {
    runWithinReactTransition(action);
    return;
  }

  const doc = document as DocumentWithViewTransition;
  doc.startViewTransition?.(() => {
    runWithinReactTransition(action);
  });
};

type ViewTransition = {
  readonly finished: Promise<void>;
  readonly ready: Promise<void>;
  readonly updateCallbackDone: Promise<void>;
};
