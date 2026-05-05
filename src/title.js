import { useEffect, useState } from "react";
import ASCIIText from "./ASCIIText";
import "./styles/title.css";

export default function Title() {
  const [titleText, setTitleText] = useState("I'm Mack");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const syncTitle = (event) => {
      setTitleText(event.matches ? "I'm\nMack" : "I'm Mack");
    };

    syncTitle(mediaQuery);
    mediaQuery.addEventListener("change", syncTitle);

    return () => mediaQuery.removeEventListener("change", syncTitle);
  }, []);

  return (
    <header className="App-title">
      <div className="title-inner">
        <ASCIIText
          text={titleText}
          enableWaves={true}
          asciiFontSize={5}
          textFontSize={260}
          planeBaseHeight={10}
        />
      </div>
    </header>
  );
}
