// App.jsx
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import contentsData from "./Contents";
import Content from "./Content";
import Contact from "./Contact";
import Title from "./title";
import BackgroundGodHands from "./backgroundGodHands.js";
import {
  getBinaryCharsWithinRadius,
  splitTextForBinaryHover,
  restoreBinaryHover,
} from "./binaryHover";
import "./styles/tabs.css";
import "./styles/title.css";
import "./styles/main.css";
import "./styles/header.css";
import"./styles/content.css";
import "./styles/godHands.css";

const BINARY_FRAME_MS = 72;
const BINARY_HOVER_RADIUS_PX = 45;
const STATIC_BINARY_TARGETS = ".header-tab, .left-tab, .right-tab, .footer p";
const slugify = s =>
  (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const HEX_CHARS = "0123456789ABCDEF";

const makeBinaryToken = (source = "") =>
  HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];

export default function App() {
  const sections = Array.isArray(contentsData) ? contentsData : [];
  const [activeSection, setActiveSection] = useState(0);
  const groupId = useMemo(() => slugify("root-sections"), []);
  const sectionRefs = useRef([]);
  const appRef = useRef(null);
  const onSelect = useCallback((i) => {
    const el = sectionRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  }, []);

  // keep tabs highlighted while scrolling
  useEffect(() => {
    if (!sectionRefs.current.length) return;

    // rootMargin centers the "observation window" to pick the middle-ish section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index") || "0");
            setActiveSection(idx);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,                 // ~50% of section visible to count as active
      }
    );

    sectionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [sections.length]);

  useEffect(() => {
    const root = appRef.current;
    if (!root) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches) {
      restoreBinaryHover(root);
      return undefined;
    }

    restoreBinaryHover(root);
    splitTextForBinaryHover(root, STATIC_BINARY_TARGETS);

    let activeChars = [];
    let intervalId = null;

    const stopHover = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }

      activeChars.forEach((charNode) => {
        charNode.textContent = charNode.dataset.char || charNode.textContent;
      });
      activeChars = [];
    };

    const updateActiveChars = (clientX, clientY) => {
      const nextChars = getBinaryCharsWithinRadius(root, clientX, clientY, BINARY_HOVER_RADIUS_PX);
      if (
        activeChars.length === nextChars.length &&
        activeChars.every((charNode, index) => charNode === nextChars[index])
      ) {
        return;
      }

      stopHover();
      if (!nextChars.length) return;

      activeChars = nextChars;
      activeChars.forEach((charNode) => {
        charNode.textContent = makeBinaryToken(charNode.dataset.char || "");
      });

      intervalId = window.setInterval(() => {
        activeChars.forEach((charNode) => {
          charNode.textContent = makeBinaryToken(charNode.dataset.char || "");
        });
      }, BINARY_FRAME_MS);
    };

    const handlePointerMove = (event) => {
      updateActiveChars(event.clientX, event.clientY);
    };

    const handleMouseMove = (event) => {
      updateActiveChars(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      stopHover();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      stopHover();
      restoreBinaryHover(root);
    };
  }, []);

  return (
    <div ref={appRef} className="App">
       <BackgroundGodHands />
      <Title />

      <section className="main">
        <div className="site-header">
          <nav className="header-tabs" aria-label="Sections">
            {sections.map((c, i) => (
              <button
                key={i}
                className={`retro-tab header-tab ${i === activeSection ? "is-active" : ""}`}
                aria-controls={`section-${groupId}-${i}`}
                id={`left-tab-${groupId}-${i}`}
                onClick={() => onSelect(i)}
                type="button"
              >
                {"[ " + c.title + " ]"}
              </button>
            ))}
          </nav>
        </div>
        <div className="content-shell">
          {/* Inline content: render all sections one after another */}
          <div className="main-panel">
            {sections.map((section, i) => {
              const secId = `section-${groupId}-${i}`;
              return (
                <section
                  key={secId}
                  id={secId}
                  className={`content-section index-${i}`}
                  ref={(el) => (sectionRefs.current[i] = el)}
                  data-index={i}
                  aria-labelledby={`left-tab-${groupId}-${i}`}
                >
                  <Content title={section.title} tabs={section.tabs} />
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <Contact />
<div className="footer"><p>Last Updated 4/22/2026</p></div>
    </div>
  );
}
