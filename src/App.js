// App.jsx
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import contentsData from "./Contents";
import Content from "./Content";
import Contact from "./Contact";
import Title from "./title";
import Galaxy from "./Galaxy";
import "./styles/tabs.css";
import "./styles/title.css";
import "./styles/main.css";
import "./styles/header.css";
import"./styles/content.css";
import "./styles/godHands.css";

const slugify = s =>
  (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function App() {
  const sections = Array.isArray(contentsData) ? contentsData : [];
  const [activeSection, setActiveSection] = useState(0);
  const groupId = useMemo(() => slugify("root-sections"), []);
  const sectionRefs = useRef([]);
  const pendingSectionRef = useRef(0);
  const settleTimeoutRef = useRef(null);
  const onSelect = useCallback((i) => {
    pendingSectionRef.current = i;
    setActiveSection(i);
    const el = sectionRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        pendingSectionRef.current = (() => {
          if (!sectionRefs.current.length) return 0;

          const viewportCenter = window.innerHeight * 0.42;
          let bestIndex = 0;
          let bestDistance = Number.POSITIVE_INFINITY;

          sectionRefs.current.forEach((node, index) => {
            if (!node) return;
            const rect = node.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height * 0.5;
            const distance = Math.abs(sectionCenter - viewportCenter);
            if (distance < bestDistance) {
              bestDistance = distance;
              bestIndex = index;
            }
          });

          return bestIndex;
        })();

        if (settleTimeoutRef.current) {
          window.clearTimeout(settleTimeoutRef.current);
        }

        settleTimeoutRef.current = window.setTimeout(() => {
          setActiveSection((current) =>
            current === pendingSectionRef.current ? current : pendingSectionRef.current
          );
          settleTimeoutRef.current = null;
        }, 120);

        ticking = false;
      });
    };

    pendingSectionRef.current = activeSection;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (settleTimeoutRef.current) {
        window.clearTimeout(settleTimeoutRef.current);
        settleTimeoutRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activeSection, sections.length]);

  return (
    <div className="App">
     <div>
  <Galaxy 
    mouseRepulsion
    mouseInteraction={false}
    density={1}
    glowIntensity={0.3}
    saturation={0.4}
    hueShift={140}
    twinkleIntensity={0.3}
    rotationSpeed={0.1}
    repulsionStrength={2}
    autoCenterRepulsion={0}
    starSpeed={0.5}
    speed={1}
/>
</div>
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
<div className="footer">
  <p>Last Updated 4/22/2026</p>
</div>
    </div>
  );
}
