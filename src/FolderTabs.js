import { useEffect, useMemo, useState } from "react";

const mod = (value, length) => ((value % length) + length) % length;

export default function FolderTabs({
  title,
  tabs = [],
  active,
  setActive,
  onRotate,
  groupId,
  loopOffset = 0,
  isMobile = false,
}) {
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches ? 3 : 5
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const syncVisibleCount = (event) => {
      setVisibleCount(event.matches ? 3 : 5);
    };

    syncVisibleCount(media);
    media.addEventListener("change", syncVisibleCount);
    return () => media.removeEventListener("change", syncVisibleCount);
  }, []);

  const displayRadius = Math.floor(visibleCount / 2);

  const displayedTabs = useMemo(() => {
    if (!tabs.length) return [];
    if (tabs.length === 1) {
      return Array.from({ length: visibleCount }, (_, index) => {
        const rotatedIndex = mod(index - loopOffset, visibleCount);
        const relative = rotatedIndex - displayRadius;
        return {
          index: 0,
          key: `single-${index}`,
          tab: tabs[0],
          relative,
          clampedOffset: relative,
          isActive: relative === 0,
          isDistant: false,
          isClone: relative !== 0,
        };
      });
    }

    return tabs.map((tab, index) => {
      let relative = (index - active + tabs.length) % tabs.length;
      if (relative > tabs.length / 2) {
        relative -= tabs.length;
      }
      const clampedOffset = Math.max(-displayRadius, Math.min(displayRadius, relative));
      return {
        index,
        key: index,
        tab,
        relative,
        clampedOffset,
        isActive: relative === 0,
        isDistant: Math.abs(relative) > displayRadius,
        isClone: false,
      };
    });
  }, [active, displayRadius, loopOffset, tabs, visibleCount]);

  const rotatePrev = () => {
    if (!tabs.length) return;
    if (onRotate) {
      onRotate(-1);
      return;
    }
    setActive((current) => (current - 1 + tabs.length) % tabs.length);
  };

  const rotateNext = () => {
    if (!tabs.length) return;
    if (onRotate) {
      onRotate(1);
      return;
    }
    setActive((current) => (current + 1) % tabs.length);
  };

  return (
    <div className="folder-tabs">
      <button
        type="button"
        className="tab-nav retro-tab"
        onClick={rotatePrev}
        aria-label={`Previous ${title} item`}
      >
        {isMobile ? "[ < ]" : "[ ^ ]"}
      </button>

      <div className="tab-window" role="tablist" aria-label={`${title} tabs`}>
        {displayedTabs.map(
          ({ index, key, tab, relative, clampedOffset, isActive: current, isDistant, isClone }) => {
          return (
            <button
              key={key}
              className={`folder-tab retro-tab ${current ? "is-active" : ""}`}
              role="tab"
              aria-selected={current}
              aria-controls={isClone ? undefined : `panel-${groupId}-${index}`}
              id={isClone ? undefined : `tab-${groupId}-${index}`}
              onClick={() => {
                if (isClone) {
                  if (onRotate) onRotate(relative > 0 ? 1 : -1);
                } else {
                  setActive(index);
                }
              }}
              type="button"
              tabIndex={isClone ? -1 : undefined}
              data-offset={clampedOffset}
              data-side={relative < 0 ? "before" : relative > 0 ? "after" : "center"}
              data-distant={isDistant ? "true" : "false"}
              style={{ "--tab-offset": clampedOffset }}
            >
              {"[ " + tab.title + " ]"}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="tab-nav retro-tab"
        onClick={rotateNext}
        aria-label={`Next ${title} item`}
      >
        {isMobile ? "[ > ]" : "[ v ]"}
      </button>
    </div>
  );
}
