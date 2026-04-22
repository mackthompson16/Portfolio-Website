import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles/tabs.css";
import FolderTabs from "./FolderTabs.js";

const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TRANSITION_MS = 560;
const BUFFER_SIZE = 2;
const CENTER_INDEX = BUFFER_SIZE;
const MOBILE_REPEAT_COUNT = 3;

const mod = (value, length) => ((value % length) + length) % length;

const getStep = (previous, next, length) => {
  if (length <= 1 || previous === next) return { direction: "forward", distance: 0 };

  const forwardDistance = mod(next - previous, length);
  const backwardDistance = mod(previous - next, length);

  if (forwardDistance <= backwardDistance) {
    return { direction: "forward", distance: forwardDistance };
  }

  return { direction: "backward", distance: backwardDistance };
};

const Content = ({ title, tabs }) => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const mobileScrollerRef = useRef(null);
  const panelRefs = useRef([]);
  const panelContentRefs = useRef([]);
  const measureContentRefs = useRef([]);
  const resetTimeoutRef = useRef(null);
  const mobileScrollTimeoutRef = useRef(null);
  const mobileIsSyncingRef = useRef(false);
  const mobileIsDraggingRef = useRef(false);
  const mobileDragStartIndexRef = useRef(null);
  const mobileVisualIndexRef = useRef(0);
  const mobileChangeSourceRef = useRef("init");
  const loopOffsetBaseRef = useRef(0);
  const rotationQueueRef = useRef([]);
  const rotationActiveRef = useRef(false);
  const flushRotationRef = useRef(null);
  const [active, setActive] = useState(0);
  const [loopOffset, setLoopOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches
  );
  const [panelExtent, setPanelExtent] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [renderCenter, setRenderCenter] = useState(0);
  const [trackOffset, setTrackOffset] = useState(CENTER_INDEX);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const groupId = useMemo(() => slugify(title || "section"), [title]);

  useEffect(() => {
    if (active < tabs.length) return;
    setActive(Math.max(0, tabs.length - 1));
  }, [active, tabs.length]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const sync = (event) => setIsMobile(event.matches);

    sync(media);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = root.querySelectorAll(".fade-in");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const sizes = measureContentRefs.current
        .map((node) => node?.offsetHeight || 0)
        .filter(Boolean);

      setPanelExtent(sizes.length ? Math.max(...sizes) : 0);
      setViewportWidth(viewportRef.current?.clientWidth || 0);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    measureContentRefs.current.forEach((node) => node && resizeObserver.observe(node));
    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [tabs.length, isMobile, renderCenter]);

  useEffect(() => {
    if (!tabs.length) {
      setRenderCenter(0);
      setTrackOffset(CENTER_INDEX);
      setIsTransitionEnabled(false);
      return;
    }

    if (tabs.length === 1) {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }

      const delta = loopOffset - renderCenter;
      if (delta === 0) return;

      setIsTransitionEnabled(true);
      setTrackOffset(delta > 0 ? CENTER_INDEX + 1 : CENTER_INDEX - 1);

      resetTimeoutRef.current = setTimeout(() => {
        setIsTransitionEnabled(false);
        setRenderCenter(loopOffset);
        setTrackOffset(CENTER_INDEX);
        resetTimeoutRef.current = null;
      }, TRANSITION_MS);
      return;
    }

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    const { direction, distance } = getStep(renderCenter, active, tabs.length);

    if (distance === 0) return;

    if (distance > 1) {
      setIsTransitionEnabled(false);
      setRenderCenter(active);
      setTrackOffset(CENTER_INDEX);
      return;
    }

    setIsTransitionEnabled(true);
    setTrackOffset(direction === "forward" ? CENTER_INDEX + 1 : CENTER_INDEX - 1);

    resetTimeoutRef.current = setTimeout(() => {
      setIsTransitionEnabled(false);
      setRenderCenter(active);
      setTrackOffset(CENTER_INDEX);
      resetTimeoutRef.current = null;
    }, TRANSITION_MS);
  }, [active, loopOffset, renderCenter, tabs.length]);

  useEffect(() => {
    if (!isTransitionEnabled && trackOffset === CENTER_INDEX) {
      const raf = requestAnimationFrame(() => setIsTransitionEnabled(true));
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [isTransitionEnabled, trackOffset]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      if (mobileScrollTimeoutRef.current) {
        clearTimeout(mobileScrollTimeoutRef.current);
      }
    };
  }, []);

  const renderedPanels = useMemo(() => {
    if (!tabs.length) return [];

    return Array.from({ length: BUFFER_SIZE * 2 + 1 }, (_, index) => {
      const offset = index - CENTER_INDEX;
      const actualIndex = mod(renderCenter + offset, tabs.length);
      return {
        actualIndex,
        offset,
        tab: tabs[actualIndex],
      };
    });
  }, [renderCenter, tabs]);

  const mobilePanels = useMemo(() => {
    if (!tabs.length) return [];
    return Array.from({ length: tabs.length * MOBILE_REPEAT_COUNT }, (_, index) => ({
      renderIndex: index,
      actualIndex: mod(index, tabs.length),
      tab: tabs[mod(index, tabs.length)],
    }));
  }, [tabs]);

  const panelBuffer = isMobile ? 64 : 220;
  const panelViewportExtent = panelExtent > 0 ? panelExtent + panelBuffer : 0;
  const stride = isMobile ? viewportWidth : panelViewportExtent;
  const trackTransform = stride
    ? isMobile
      ? `translate3d(-${trackOffset * stride}px, 0, 0)`
      : `translate3d(0, -${trackOffset * stride}px, 0)`
    : "translate3d(0, 0, 0)";

  const viewportStyle = panelViewportExtent > 0 ? { height: `${panelViewportExtent}px` } : undefined;
  const panelStyle =
    panelViewportExtent > 0 || viewportWidth > 0
      ? {
          height: panelViewportExtent > 0 ? `${panelViewportExtent}px` : undefined,
          width: isMobile && viewportWidth > 0 ? `${viewportWidth}px` : undefined,
        }
      : undefined;

  // Always-fresh flush so setTimeout callbacks never see stale tabs.length / isMobile.
  flushRotationRef.current = () => {
    if (rotationActiveRef.current || !rotationQueueRef.current.length) return;
    const d = rotationQueueRef.current.shift();
    rotationActiveRef.current = true;
    if (tabs.length === 1) {
      setLoopOffset((prev) => prev + d);
    } else {
      setActive((prev) => mod(prev + d, tabs.length));
    }
    window.setTimeout(() => {
      rotationActiveRef.current = false;
      flushRotationRef.current?.();
    }, isMobile ? 260 : TRANSITION_MS + 60);
  };

  const animateSingleMobileLoop = (delta) => {
    if (!mobileScrollerRef.current || !viewportWidth || !tabs.length) return;

    const scroller = mobileScrollerRef.current;
    const targetVisualIndex = mobileVisualIndexRef.current + delta;
    const targetLeft = targetVisualIndex * viewportWidth;

    mobileIsSyncingRef.current = true;
    mobileVisualIndexRef.current = targetVisualIndex;
    scroller.classList.add("no-snap");
    scroller.scrollTo({ left: targetLeft, behavior: "smooth" });

    const centeredVisualIndex = tabs.length;
    window.setTimeout(() => {
      scroller.scrollLeft = centeredVisualIndex * viewportWidth;
      mobileVisualIndexRef.current = centeredVisualIndex;
      mobileIsSyncingRef.current = false;
      scroller.classList.remove("no-snap");
    }, 350);
  };

  const handleRotate = (delta) => {
    if (!tabs.length) return;
    mobileChangeSourceRef.current = "button";
    if (rotationQueueRef.current.length < 3) rotationQueueRef.current.push(delta);
    flushRotationRef.current?.();
    if (tabs.length === 1 && isMobile) {
      animateSingleMobileLoop(delta);
    }
  };

  const handleSelect = (nextIndex) => {
    if (!tabs.length || tabs.length === 1) return;
    mobileChangeSourceRef.current = "button";
    setActive(nextIndex);
  };

  // Multi-tab mobile animation: fires when active tab changes.
  useEffect(() => {
    if (!isMobile || !mobileScrollerRef.current || !viewportWidth || tabs.length <= 1) return;
    if (mobileIsDraggingRef.current) return;
    if (mobileChangeSourceRef.current === "scroll") return;

    const scroller = mobileScrollerRef.current;
    const currentActualIndex = mod(mobileVisualIndexRef.current, tabs.length);
    const { direction, distance } = getStep(currentActualIndex, active, tabs.length);

    if (distance === 0) return;

    if (distance > 1) {
      const centeredIndex = active + tabs.length;
      mobileIsSyncingRef.current = true;
      scroller.scrollLeft = centeredIndex * viewportWidth;
      mobileVisualIndexRef.current = centeredIndex;
      window.setTimeout(() => { mobileIsSyncingRef.current = false; }, 60);
      return;
    }

    const targetVisualIndex = mobileVisualIndexRef.current + (direction === "forward" ? 1 : -1);
    const targetLeft = targetVisualIndex * viewportWidth;

    if (Math.abs(scroller.scrollLeft - targetLeft) < 2) return;

    mobileIsSyncingRef.current = true;
    mobileVisualIndexRef.current = targetVisualIndex;
    scroller.classList.add("no-snap");
    scroller.scrollTo({ left: targetLeft, behavior: "smooth" });

    const centeredVisualIndex = active + tabs.length;

    let done = false;
    const finalize = () => {
      if (done) return;
      done = true;
      // Only reposition if we landed on a repeat-buffer edge (content is identical, jump invisible).
      if (mobileVisualIndexRef.current !== centeredVisualIndex) {
        scroller.scrollLeft = centeredVisualIndex * viewportWidth;
        mobileVisualIndexRef.current = centeredVisualIndex;
      }
      mobileIsSyncingRef.current = false;
      scroller.classList.remove("no-snap");
    };

    const timeout = window.setTimeout(finalize, 350);
    return () => { window.clearTimeout(timeout); finalize(); };
  }, [active, isMobile, tabs.length, viewportWidth]);

  // Re-centre the mobile strip on layout changes (viewport resize, tab count change).
  // Not re-run on every active update to avoid killing in-progress scroll animations.
  useEffect(() => {
    if (!isMobile || !mobileScrollerRef.current || !viewportWidth || !tabs.length) return;

    const centeredVisualIndex = (tabs.length === 1 ? 0 : active) + tabs.length;
    mobileIsSyncingRef.current = true;
    mobileScrollerRef.current.scrollLeft = centeredVisualIndex * viewportWidth;
    mobileVisualIndexRef.current = centeredVisualIndex;

    const timeout = window.setTimeout(() => {
      mobileIsSyncingRef.current = false;
    }, 60);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, tabs.length, viewportWidth]);

  const handleMobileScroll = (event) => {
    if (!isMobile || !viewportWidth || !tabs.length || mobileIsSyncingRef.current) return;

    if (mobileScrollTimeoutRef.current) {
      clearTimeout(mobileScrollTimeoutRef.current);
    }

    const scroller = event.currentTarget;
    const liveRawIndex = Math.round(scroller.scrollLeft / viewportWidth);
    const liveActualIndex = mod(liveRawIndex, tabs.length);
    mobileChangeSourceRef.current = "scroll";

    if (tabs.length === 1) {
      const dragStartIndex = mobileDragStartIndexRef.current ?? liveRawIndex;
      const nextLoopOffset = loopOffsetBaseRef.current + (liveRawIndex - dragStartIndex);
      setLoopOffset((current) => (current === nextLoopOffset ? current : nextLoopOffset));
    } else {
      setActive((current) => (current === liveActualIndex ? current : liveActualIndex));
    }

    // Read position inside the timeout so we always capture the fully-settled snap position.
    mobileScrollTimeoutRef.current = setTimeout(() => {
      if (mobileIsDraggingRef.current) return;

      const rawIndex = Math.round(scroller.scrollLeft / viewportWidth);
      const dragStartIndex = mobileDragStartIndexRef.current ?? rawIndex;
      const clampedRawIndex =
        dragStartIndex + Math.max(-1, Math.min(1, rawIndex - dragStartIndex));
      const actualIndex = mod(clampedRawIndex, tabs.length);
      const centeredIndex = actualIndex + tabs.length;

      mobileIsSyncingRef.current = true;
      setActive((current) => (current === actualIndex ? current : actualIndex));

      // Only jump back when we've drifted into the leading/trailing repeat copies.
      if (Math.abs(clampedRawIndex - centeredIndex) > 0) {
        scroller.scrollLeft = centeredIndex * viewportWidth;
        mobileVisualIndexRef.current = centeredIndex;
      } else {
        mobileVisualIndexRef.current = clampedRawIndex;
      }
      mobileDragStartIndexRef.current = null;

      window.setTimeout(() => {
        mobileIsSyncingRef.current = false;
        mobileChangeSourceRef.current = "idle";
      }, 60);
    }, 160);
  };

  const handleMobileDragStart = () => {
    mobileIsDraggingRef.current = true;
    mobileChangeSourceRef.current = "scroll";
    if (mobileScrollerRef.current && viewportWidth) {
      mobileDragStartIndexRef.current = Math.round(
        mobileScrollerRef.current.scrollLeft / viewportWidth
      );
    }
    loopOffsetBaseRef.current = loopOffset;
    if (mobileScrollTimeoutRef.current) {
      clearTimeout(mobileScrollTimeoutRef.current);
      mobileScrollTimeoutRef.current = null;
    }
  };

  // On drag end, just clear the dragging flag. CSS snap handles settling;
  // handleMobileScroll's debounce fires after snap completes and does an
  // instant (invisible) reposition back to the middle repeat copy.
  const handleMobileDragEnd = () => {
    mobileIsDraggingRef.current = false;
  };

  return (
    <section ref={containerRef} className="folder">
      <div className="folder-stage">
        <div className="title">{title}</div>
        <div className="folder-body">
          <FolderTabs
            title={title}
            tabs={tabs}
            active={active}
            setActive={handleSelect}
            onRotate={handleRotate}
            groupId={groupId}
            loopOffset={loopOffset}
          />

          <div className="folder-panel-measurements" aria-hidden="true">
            {tabs.map((tab, index) => (
              <div
                key={`measure-${groupId}-${index}`}
                ref={(node) => {
                  measureContentRefs.current[index] = node;
                }}
                className="folder-panel-inner"
              >
                {tab.body}
              </div>
            ))}
          </div>

          {isMobile ? (
            <div
              ref={viewportRef}
              className="folder-panel-viewport is-horizontal"
              style={viewportStyle}
            >
              <div
                ref={mobileScrollerRef}
                className="folder-panel-scroller is-horizontal"
                onScroll={handleMobileScroll}
                onTouchStart={handleMobileDragStart}
                onTouchEnd={handleMobileDragEnd}
                onTouchCancel={handleMobileDragEnd}
                onPointerDown={handleMobileDragStart}
                onPointerUp={handleMobileDragEnd}
                onPointerCancel={handleMobileDragEnd}
              >
                {mobilePanels.map(({ tab, actualIndex, renderIndex }) => (
                  <div
                    key={`${groupId}-mobile-${renderIndex}`}
                    className="folder-track-panel is-mobile-scroll"
                    style={panelStyle}
                    role="tabpanel"
                    id={`panel-${groupId}-${actualIndex}`}
                    aria-labelledby={`tab-${groupId}-${actualIndex}`}
                    aria-hidden={actualIndex === active ? undefined : true}
                  >
                    <div className="folder-panel">
                      <div
                        ref={(node) => {
                          panelContentRefs.current[actualIndex] = node;
                        }}
                        className="folder-panel-inner"
                      >
                        {tab.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !!renderedPanels.length && (
            <div
              ref={viewportRef}
              className="folder-panel-viewport is-vertical"
              style={viewportStyle}
            >
              <div
                className={`folder-panel-track is-vertical ${
                  isTransitionEnabled ? "is-animated" : "is-static"
                }`}
                style={{ transform: trackTransform }}
              >
                {renderedPanels.map(({ actualIndex, tab, offset }, index) => {
                  const panelId = offset === 0 ? `panel-${groupId}-${actualIndex}` : undefined;

                  return (
                    <div
                      key={`${actualIndex}-${renderCenter}-${offset}`}
                      ref={(node) => {
                        panelRefs.current[index] = node;
                      }}
                      className="folder-track-panel"
                      style={panelStyle}
                      role="tabpanel"
                      id={panelId}
                      aria-labelledby={panelId ? `tab-${groupId}-${actualIndex}` : undefined}
                      aria-hidden={actualIndex === active ? undefined : true}
                    >
                      <div className="folder-panel">
                        <div
                          ref={(node) => {
                            panelContentRefs.current[index] = node;
                          }}
                          className="folder-panel-inner"
                        >
                          {tab.body}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

Content.propTypes = {
  title: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Content;
