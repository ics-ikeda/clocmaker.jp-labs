"use client";

import * as React from "react";
import { Fragment } from "react";
import type { ComponentType, ReactNode } from "react";

type ViewTransitionLike = ComponentType<{ name?: string; children: ReactNode }>;

const ViewTransitionComponent: ViewTransitionLike | undefined =
  // React v19+ (予定)
  (React as unknown as { ViewTransition?: ViewTransitionLike })
    .ViewTransition ??
  // 現行の unstable export
  (React as unknown as { unstable_ViewTransition?: ViewTransitionLike })
    .unstable_ViewTransition;

export function ViewTransition({
  name,
  children,
}: {
  name?: string;
  children: ReactNode;
}) {
  if (ViewTransitionComponent) {
    return (
      <ViewTransitionComponent name={name}>{children}</ViewTransitionComponent>
    );
  }
  return <Fragment>{children}</Fragment>;
}
