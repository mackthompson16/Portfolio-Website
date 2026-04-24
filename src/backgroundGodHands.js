// BackgroundGodHands.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function BackgroundGodHands() {
  useEffect(() => {
    let bottomPull = 0;
    let touchStartY = null;
    let releaseFrame = 0;

    const clampPull = (value) => Math.max(0, Math.min(260, value));

    const cancelRelease = () => {
      if (releaseFrame) {
        window.cancelAnimationFrame(releaseFrame);
        releaseFrame = 0;
      }
    };

    const applyProgress = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const virtualMaxScroll = maxScroll + 220;
      const effectiveScroll = Math.min(window.scrollY + bottomPull, virtualMaxScroll);
      const p = Math.max(0, Math.min(1, effectiveScroll / virtualMaxScroll));
      document.documentElement.style.setProperty("--gh-progress", String(p));
    };

    const releasePull = () => {
      cancelRelease();

      const tick = () => {
        bottomPull *= 0.82;
        if (bottomPull < 0.5) {
          bottomPull = 0;
          applyProgress();
          releaseFrame = 0;
          return;
        }

        applyProgress();
        releaseFrame = window.requestAnimationFrame(tick);
      };

      releaseFrame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);

      if (window.scrollY < maxScroll - 2 && bottomPull) {
        bottomPull = 0;
      }

      applyProgress();
    };

    const onWheel = (event) => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const atBottom = window.scrollY >= maxScroll - 2;

      if (!atBottom) {
        if (bottomPull) bottomPull = 0;
        applyProgress();
        return;
      }

      if (event.deltaY > 0) {
        cancelRelease();
        bottomPull = clampPull(bottomPull + event.deltaY * 0.35);
        applyProgress();
        return;
      }

      if (event.deltaY < 0 && bottomPull > 0) {
        cancelRelease();
        bottomPull = clampPull(bottomPull + event.deltaY * 0.45);
        applyProgress();
        if (bottomPull === 0) {
          releasePull();
        }
      }
    };

    const onTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event) => {
      if (touchStartY == null) return;

      const currentY = event.touches[0]?.clientY;
      if (typeof currentY !== "number") return;

      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const atBottom = window.scrollY >= maxScroll - 2;
      const delta = touchStartY - currentY;
      touchStartY = currentY;

      if (!atBottom) {
        if (bottomPull) bottomPull = 0;
        applyProgress();
        return;
      }

      if (delta > 0) {
        cancelRelease();
        bottomPull = clampPull(bottomPull + delta * 0.8);
        applyProgress();
      } else if (delta < 0 && bottomPull > 0) {
        cancelRelease();
        bottomPull = clampPull(bottomPull + delta);
        applyProgress();
      }
    };

    const onTouchEnd = () => {
      touchStartY = null;
      if (bottomPull > 0) {
        releasePull();
      }
    };

    applyProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", applyProgress);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelRelease();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", applyProgress);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return createPortal(
    <div className="godhands-fixed" aria-hidden="true">
      <img className="godhand godhand-left" src="./files/LeftGodHand.jpg" alt="" draggable="false" />
      <img className="godhand godhand-right" src="./files/RightGodHand.jpg" alt="" draggable="false" />
    </div>,
    document.body
  );
}
