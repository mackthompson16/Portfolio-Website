// App.jsx
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import contentsData from "./Contents";
import Content from "./Content";
import Contact from "./Contact";
import Title from "./title";
import BackgroundGodHands from "./backgroundGodHands.js";
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

  return (
    <div className="App">
       <BackgroundGodHands rangePx={2700} />
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
<div className="footer"><p>Last Updated 1/23/2026</p></div>
    </div>
  );
}
