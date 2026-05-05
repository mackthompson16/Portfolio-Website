const ST = ({ as = "p", className = "", children, ...rest }) => {
  const Component = as;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

const contents = [
  {
    title: "Me",
    tabs: [
      {
        title: "Hi!",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Homo Sapien</ST>
              <ST as="p" className="paragraph-text">
                Senior <strong>CS</strong> + (math? + business)^minor at Auburn.
              </ST>
              <ST as="p" className="paragraph-text">What's up <strong>thanks </strong>for reading my website. Ok I spent a lot of time in a dark room on a computer but now im trying to appreciate 
                 <strong> the life around me</strong>. I might've sold my soul to the <strong>devil</strong>. Life is fun tho.
              </ST>
              <ST as="a" href="./files/resume.pdf" className="link retro-tab" radius={90} duration={0.8}>
                &gt;[View Resume]
              </ST>
            </section>
            <section className="paragraph-item">
          
              <ST as="p" className="paragraph-text">
                Send reels{" "}
                <a
                  href="mailto:mackthompson16@gmail.com"
                  className="inline-link"
                >
                  mackthompson16@gmail.com
                </a>
              </ST>
            </section>
          </div>
        ),
      },
    ],
  },
  {
    title: "Professional",
    tabs: [
      {
        title: "HPE Cloud",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Cloud Engineering Intern</ST>
              <ST as="p" className="paragraph-text">
                <span className="date-stamp">Summer 2026 | Sunnyvale, CA</span>
              </ST>
              <ST as="p" className="paragraph-text">I'm gonna be in <strong>SILICON VALLEY BABY</strong> doing Cloud migration work/networking on the Juniper Campus.</ST>
            </section>
          </div>
        ),
      },
      {
        title: "Southern Co.",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">AI Intern</ST>
              <ST as="p" className="paragraph-text">
                <span className="date-stamp">Fall 2026 | Atlanta, GA</span>
              </ST>
              <ST as="p" className="paragraph-text">Super excited for this one
                 because I'll be working directly with the <strong>Chief of IT </strong> on AI for energy/cyber, and living at <strong> home in ATL.</strong>
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "OCV Apps",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Manifest Merge System</ST>
              <ST as="p" className="paragraph-text">
                <span className="date-stamp">Sep 2025 - Present | Opelika, AL</span>
              </ST>
              <ST as="p" className="paragraph-text">
                I spent 6 months here and <strong>solved problems that I found myself</strong>. The main thing I did was build a shared config system for <strong>40+ apps</strong>.
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ Pull shared config (80% shared)</ST>
                <ST as="li" className="sublist-item">+ Merge app-specific configurations</ST>
                <ST as="li" className="sublist-item">+ Update once, ship everywhere</ST>
              </ol>
              <ST as="p" className="paragraph-text">
                About <strong>80% less update overhead</strong>.
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "Kahua Inc",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Automation</ST>
              <ST as="p" className="paragraph-text">
                <span className="date-stamp">May 2025 - Aug 2025 | Alpharetta, GA</span>
              </ST>
              <ST as="p" className="paragraph-text">
                Basic CI/CD test automation stuff; <strong>first internship, nothing crazy</strong>. But I found a way to <strong>significantly improve</strong> this process, so <strong>I led a team</strong>. We built a dev tool for editing tests without restarting the whole flow; runtime re-compilation.
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ <strong>30%</strong> faster creation for my entire team</ST>
                <ST as="li" className="sublist-item">+ <strong>20+</strong> Azure DevOps workflows by the end of the summer</ST>
              </ol>
            </section>
          </div>
        ),
      },
      {
        title: "Research",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">CV Bias Analysis</ST>
              <ST as="p" className="paragraph-text">
                <span className="date-stamp">Feb 2025 - Sep 2025 | Auburn, AL</span>
              </ST>
              <ST as="p" className="paragraph-text">
                While I did other stuff while in this lab, I mainly worked on <strong>CV metrics / dataset construction</strong>. Ended up building a <strong> ~5k image</strong> dermatology set, and
                found <strong>skin-tone bias</strong> in EfficientNet-B0.  
              </ST>
              <ST as="p" className="paragraph-text">
                 I ended up presenting this at <strong>TAPIA</strong> that year.
              </ST>
              <ST as="a" href="files/poster.pdf" className="link retro-tab" radius={90} duration={0.8}>
                &gt;[Research Poster]
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "BWH Camp",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Founder</ST>
              <ST as="p" className="paragraph-text">
                <span className="date-stamp">Jun 2021 - Dec 2024 | Atlanta, GA</span>
              </ST>
              <ST as="p" className="paragraph-text">
                This is my <strong>favorite experience</strong>.
                It started in HS and scaled up every year.
                I recruited my friends, eventually handing it off to <strong>past campers and my lil bro</strong>.
                 Wish I could do this forever but <strong>I'm a big adult man now</strong>. 
                I also built an email bot to handle parent questions. 
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ <strong>150+ camp spots</strong></ST>
                <ST as="li" className="sublist-item">+ <strong>$100K+</strong> profit</ST>
                <ST as="li" className="sublist-item">+ Employed <strong>7+</strong> people per summer</ST>
              </ol>
              <ST
                as="a"
                href="https://youtu.be/GKlthhpZl3U?si=zdTVYFM-E3fBfxow"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
                radius={90}
                duration={0.8}
              >
                &gt;[Camp Movie]
              </ST>
            </section>
          
          </div>
        ),
      },
    ],
  },
  {
    title: "Projects",
    tabs: [
      {
        title: "JupJewels",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">E-commerce Redesign</ST>
              <ST as="p" className="paragraph-text">
                This one was fun because it was <strong>real</strong>. I collabed with <strong>the founder</strong> and rebuilt the site around <strong>how people actually shop</strong>.
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ <strong>25%</strong> more traffic</ST>
                <ST as="li" className="sublist-item">+ <strong>DIY jewelry builder</strong></ST>
                <ST as="li" className="sublist-item">+ Better search visibility</ST>
                <ST as="li" className="sublist-item">+ Email flows</ST>
              </ol>
              <ST as="p" className="paragraph-text">
                The custom builder became the top seller and made <strong>$4K in 30 days</strong>.
              </ST>
              <ST
                as="a"
                href="https://jupjewels.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
                radius={90}
                duration={0.8}
              >
                &gt;[View Website]
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "World Order",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">World Order Forecast</ST>
              <ST as="p" className="paragraph-text">
                I wanted to see how well I could <strong>model + predict geopolitical cycles</strong>. I built this using Ray Dalio's metrics for empire strength.
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ <strong>8</strong> empire metrics</ST>
                <ST as="li" className="sublist-item">+ <strong>200+ years</strong> of macro data</ST>
                <ST as="li" className="sublist-item">+ <strong>~60%</strong> directional accuracy</ST>
              </ol>
              <ST as="p" className="paragraph-text">
                It kind of works. Still a <strong>very hard problem</strong>. 
              </ST>
              <ST
                as="a"
                href="https://github.com/mackthompson16/World-Order-Forecast"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
                radius={90}
                duration={0.8}
              >
                &gt;[View Project]
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "AI Lifeguard",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Swim-Safe-Systems</ST>
              <ST as="p" className="paragraph-text">
                The capstone project for my business minor was an <strong>underwater AI lifeguard</strong> in collab with the university facilities.
              </ST>
                 <ol className="paragraph-sublist">
                  <ST as="li" className="sublist-item">+ water-proof <strong>multiplexing</strong> pipeline</ST>
                  <ST as="li" className="sublist-item">+ <strong>3D model</strong> attached to the pool lights</ST>
                  <ST as="li" className="sublist-item">+ <strong>Computer vision</strong> system to detect swimmers in distress</ST>
               </ol>
               <ST as="p" className="paragraph-text">Was pretty cool to work with <strong>electrical people</strong> and see the blueprints/infrastrutuce behind the facility.</ST>
            </section>
          </div>
        ),
      },
      {
        title: "Email Bot",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Inbox Automation</ST>
              <ST as="p" className="paragraph-text">
                I made this for my sports camp because I was tired of answering the <strong>same parent emails</strong> over and over.
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ <strong>Google Cloud VM</strong></ST>
                <ST as="li" className="sublist-item">+ Gmail + Pub/Sub trigger</ST>
                <ST as="li" className="sublist-item">+ Confidence check before send</ST>
              </ol>
              <ST as="p" className="paragraph-text">
                It handled about <strong>75%</strong> of parent emails.
              </ST>
              <ST
                as="a"
                href="https://github.com/mackthompson16/Email-Bot"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
                radius={90}
                duration={0.8}
              >
                &gt;[View Project]
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "WeCal",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">Social Platform</ST>
              <ST as="p" className="paragraph-text">
                This was me trying to understand <strong> EVERYTHING ABOUT COMPUTERS</strong>. I started freshman year just connecting frontend to backend. 
                Picked it back up to deploy/containerize on the cloud. And then once again to integrate Ai stuff into it.
    
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ <strong>React + Node + Postgres</strong></ST>
                <ST as="li" className="sublist-item">+ WebSockets for live updates</ST>
                <ST as="li" className="sublist-item">+ <strong>AI scheduling agent</strong></ST>
              </ol>
              <ST
                as="a"
                href="https://github.com/mackthompson16/cf_ai_Social-Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
                radius={90}
                duration={0.8}
              >
                &gt;[View Project]
              </ST>
            </section>
          </div>
        ),
      },
      {
        title: "A BOOK?!",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <ST as="h4" className="paragraph-header">The Conscious Disease</ST>
              <ST as="p" className="paragraph-text">
                I'm writing a short book about <strong>consciousness as a limit</strong>. Not really sure where it's going, but it started after I got a traumatic brain injury from a boxing match. 
                I also think all <strong>TECH PEOPLE ARE PHILOSOPHERS</strong> suddenly. AI doom is no joke.
              </ST>
              <ol className="paragraph-sublist">
                <ST as="li" className="sublist-item">+ Observable universe</ST>
                <ST as="li" className="sublist-item">+ Divine framework</ST>
                <ST as="li" className="sublist-item">+ Search for self</ST>
              </ol>
              <ST as="a" href="files/conscious_disease.pdf" className="link retro-tab" radius={90} duration={0.8}>
                &gt;[Read It]
              </ST>
            </section>
          </div>
        ),
      },
    ],
  },
];

export default contents;
