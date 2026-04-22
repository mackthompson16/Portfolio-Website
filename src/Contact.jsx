export default function Contact() {
  return (
    <>
      <nav className="left-tabs" aria-label="Social links">
        <a
          className="left-tab retro-tab"
          href="https://www.linkedin.com/in/mackthompson1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          [ LinkedIn ]
        </a>
        <a
          className="left-tab retro-tab"
          href="https://github.com/mackthompson16"
          target="_blank"
          rel="noopener noreferrer"
        >
          [ GitHub ]
        </a>
        <a
          className="left-tab retro-tab"
          href="https://instagram.com/_mackthompson"
          target="_blank"
          rel="noopener noreferrer"
        >
          [ Instagram ]
        </a>
      </nav>

      <nav className="right-tabs" aria-label="Contact links">
        <a
          className="right-tab retro-tab"
          href="files/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          [ View Resume ]
        </a>
        <a
          className="right-tab retro-tab"
          href="mailto:mackthompson16@gmail.com?subject=LOVE%20CONFESSION&body=Hi%20Mack%2C%0A%0AI%20saw%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0A"
        >
          [ Message Me ]
        </a>
      </nav>
    </>
  );
}
