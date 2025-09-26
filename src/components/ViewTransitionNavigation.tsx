"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  isViewTransitionSupported,
  runViewTransition,
} from "@/lib/view-transition";

export function ViewTransitionNavigation() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !isViewTransitionSupported()) {
      return;
    }

    const handlePopState = (event: PopStateEvent) => {
      const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      event.stopImmediatePropagation();

      runViewTransition(() => {
        router.replace(url, { scroll: false });
      });
    };

    window.addEventListener("popstate", handlePopState, true);

    return () => {
      window.removeEventListener("popstate", handlePopState, true);
    };
  }, [router]);

  return null;
}
