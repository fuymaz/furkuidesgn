"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type Props = {
  className?: string;
  hoverToPlay?: boolean;
};

// Module-level cache so both Nav variants (desktop + mobile) share a single
// fetched JSON payload instead of double-fetching.
let cachedData: object | null = null;
let pendingFetch: Promise<object> | null = null;

function loadLottieData(): Promise<object> {
  if (cachedData) return Promise.resolve(cachedData);
  if (pendingFetch) return pendingFetch;
  pendingFetch = fetch("/icons/logo.json")
    .then((r) => r.json())
    .then((json) => {
      cachedData = json;
      return json;
    });
  return pendingFetch;
}

function LottieLogoImpl({ className, hoverToPlay = false }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [data, setData] = useState<object | null>(cachedData);

  useEffect(() => {
    if (cachedData) return;
    let cancelled = false;
    loadLottieData()
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        // Silent fail — fallback span keeps the layout slot.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Stable settings reference so the Lottie component does not detect a prop
  // change every render — otherwise lottie-web tears down and rebuilds the
  // SVG tree, which is what causes the visible stutter on desktop.
  const rendererSettings = useMemo(
    () => ({
      progressiveLoad: true,
      hideOnTransparent: true,
      preserveAspectRatio: "xMidYMid meet",
    }),
    [],
  );

  if (!data) {
    return (
      <span
        className={className}
        aria-label="FRKN"
        style={{ display: "inline-block" }}
      />
    );
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={data}
      loop
      autoplay={!hoverToPlay}
      rendererSettings={rendererSettings}
      className={className}
      style={{ willChange: "transform" }}
      onMouseEnter={() => {
        if (hoverToPlay) lottieRef.current?.play();
      }}
      onMouseLeave={() => {
        if (hoverToPlay) lottieRef.current?.stop();
      }}
      aria-label="FRKN logo"
    />
  );
}

// Prevents the parent Nav scroll/active-state updates from forcing the heavy
// Lottie subtree to re-render. The JSON data is shared via the module cache,
// so memoizing on stable props is safe.
export const LottieLogo = memo(LottieLogoImpl);
