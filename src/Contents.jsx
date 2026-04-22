const contents = [
  {
    title: "Me",
    tabs: [
      {
        title: "Hi!",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Homo Sapien</h4>
              <p className="paragraph-text">
                Senior <strong>CS</strong> + (math? + business)^minor at Auburn.
              </p>
              <p className="paragraph-text">What's up <strong>thanks </strong>for reading my website. Ok I spent a lot of time in a dark room on a computer but now im trying to appreciate 
                 <strong> the life around me</strong>. I might've sold my soul to the <strong>devil</strong>. Life is fun tho.
              </p>
              <a href="./files/resume.pdf" className="link retro-tab">
                &gt;[View Resume]
              </a>
            </section>
            <section className="paragraph-item">
          
              <p className="paragraph-text">
                Send reels{" "}
                <a
                  href="mailto:mackthompson16@gmail.com"
                  className="inline-link"
                >
                  mackthompson16@gmail.com
                </a>
              </p>
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
              <h4 className="paragraph-header">Cloud Engineering Intern</h4>
              <p className="paragraph-text">
                <strong>Summer 2026.</strong>
              </p>
              <p className="paragraph-text">I'm gonna be in <strong>SILICON VALLEY BABY</strong> doing Cloud migration work/networking on the Juniper Campus.</p>
            </section>
          </div>
        ),
      },
      {
        title: "Southern Co.",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">AI Intern</h4>
              <p className="paragraph-text">
                <strong>Fall 2026.</strong>
              </p>
              <p className="paragraph-text">ML for energy systems. Super excited for this one
                 because I'll be working directly with the <strong>Chief of IT for Southern</strong> and living back at <strong>home in ATL</strong>.</p>
            </section>
          </div>
        ),
      },
      {
        title: "OCV Apps",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Manifest Merge System</h4>
              <p className="paragraph-text">
                This was a fun internship. I spent 6 months here and <strong>solved problems that I found myself</strong>. The main thing I did was build a shared config system for <strong>40+ apps</strong>.
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item">Pull shared config</li>
                <li className="sublist-item">Merge app overrides</li>
                <li className="sublist-item">Update once, ship everywhere</li>
              </ol>
              <p className="paragraph-text">
                About <strong>80% less update overhead</strong>.
              </p>
            </section>
          </div>
        ),
      },
      {
        title: "Kahua Inc",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Automation</h4>
              <p className="paragraph-text">
                Was assigned just basic CI/CD test automation stuff. <strong>First internship, nothing crazy</strong>. But I found a way to <strong>significantly improve</strong> this process, so <strong>I led a team</strong>. We built a dev tool for editing tests without restarting the whole flow; runtime re-compilation.
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item"><strong>30%</strong> faster creation for my entire team</li>
                <li className="sublist-item"><strong>20+</strong> Azure DevOps workflows by the end of the summer</li>
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
              <h4 className="paragraph-header">CV Bias Analysis</h4>
              <p className="paragraph-text">
                I did other stuff while in this lab but mainly I worked on <strong>CV metrics / dataset construction</strong>. Built a cleaned <strong>5k+ image</strong> dermatology set.
                I ended up presenting this at <strong>TAPIA</strong> that year.
              </p>
              <p className="paragraph-text">
                Found <strong>skin-tone bias</strong> in EfficientNet-B0.
              </p>
              <a href="files/poster.pdf" className="link retro-tab">
                &gt;[Research Poster]
              </a>
            </section>
          </div>
        ),
      },
      {
        title: "BWH Camp",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Founder</h4>
              <p className="paragraph-text">
                This is my <strong>favorite experience</strong> by far.
                Started in HS and scaled up every year.
                I recruited all my friends and ended up handing it off to <strong>past campers and my lil bro</strong>.
                 Wish I could do this forever but <strong>I'm a big adult man now</strong>. 
                Also built an email bot to handle parent questions to apply CS somehow. 
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item"><strong>150+ camp spots a summer</strong></li>
                <li className="sublist-item"><strong>$100K+</strong> profit</li>
                <li className="sublist-item">Bot handled <strong>75%</strong> of parent questions</li>
              </ol>
              <a
                href="https://youtu.be/GKlthhpZl3U?si=zdTVYFM-E3fBfxow"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
              >
                &gt;[Camp Movie]
              </a>
            </section>
            <section className="paragraph-item">
              <a
                href="https://instagram.com/BWH_Sports_Camp"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
              >
                &gt;[Camp Instagram]
              </a>
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
              <h4 className="paragraph-header">E-commerce Redesign</h4>
              <p className="paragraph-text">
                This one was fun because it was <strong>real</strong>. I collabed with <strong>the founder</strong> and rebuilt the site around <strong>how people actually shop</strong>.
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item"><strong>25%</strong> more traffic</li>
                <li className="sublist-item"><strong>DIY jewelry builder</strong></li>
                <li className="sublist-item">Better search visibility</li>
                <li className="sublist-item">Email flows</li>
              </ol>
              <p className="paragraph-text">
                The custom builder became the top seller and made <strong>$4K in 30 days</strong>.
              </p>
              <a
                href="https://jupjewels.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
              >
                &gt;[View Website]
              </a>
            </section>
          </div>
        ),
      },
      {
        title: "World Order",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">World Order Forecast</h4>
              <p className="paragraph-text">
                I wanted to see how well I could <strong>model + predict geopolitical cycles</strong>. I built this using Ray Dalio's metrics for empire strength.
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item"><strong>8</strong> empire metrics</li>
                <li className="sublist-item"><strong>200+ years</strong> of macro data</li>
                <li className="sublist-item"><strong>~60%</strong> directional accuracy</li>
              </ol>
              <p className="paragraph-text">
                It kind of works. Still a <strong>very hard problem</strong>. 
              </p>
              <a
                href="https://github.com/mackthompson16/World-Order-Forecast"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
              >
                &gt;[View Project]
              </a>
            </section>
          </div>
        ),
      },
      {
        title: "AI Lifeguard",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Swim-Safe-Systems</h4>
              <p className="paragraph-text">
                The capstone project for my business minor was an <strong>underwater AI lifeguard</strong> in collab with the university facilities.</p>
                 <ol className="paragraph-sublist">
                  <li className="sublist-item">water-proof <strong>multiplexing</strong> pipeline</li>
                  <li className="sublist-item"><strong>3D model</strong> attached to the pool lights</li>
                  <li className="sublist-item"><strong>Computer vision</strong> system to detect swimmers in distress</li>
               </ol>
               <p className="paragraph-text">Was pretty cool to work with <strong>electrical people</strong> and see the blueprints/infrastrutuce behind the facility.</p>
            </section>
          </div>
        ),
      },
      {
        title: "Email Bot",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Inbox Automation</h4>
              <p className="paragraph-text">
                I made this for my sports camp because I was tired of answering the <strong>same parent emails</strong> over and over.
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item"><strong>Google Cloud VM</strong></li>
                <li className="sublist-item">Gmail + Pub/Sub trigger</li>
                <li className="sublist-item">Confidence check before send</li>
              </ol>
              <p className="paragraph-text">
                It handled about <strong>75%</strong> of parent emails.
              </p>
              <a
                href="https://github.com/mackthompson16/Email-Bot"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
              >
                &gt;[View Project]
              </a>
            </section>
          </div>
        ),
      },
      {
        title: "WeCal",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">Social Platform</h4>
              <p className="paragraph-text">
                This was me trying to understand <strong> EVERYTHING ABOUT COMPUTERS</strong>. I started freshman year just connecting frontend to backend. 
                Picked it back up to deploy/containerize on the cloud. And then once again to integrate Ai stuff into it.
    
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item"><strong>React + Node + Postgres</strong></li>
                <li className="sublist-item">WebSockets for live updates</li>
                <li className="sublist-item"><strong>AI scheduling agent</strong></li>
              </ol>
              <a
                href="https://github.com/mackthompson16/cf_ai_Social-Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="link retro-tab"
              >
                &gt;[View Project]
              </a>
            </section>
          </div>
        ),
      },
      {
        title: "A BOOK?!",
        body: (
          <div className="paragraphs-list">
            <section className="paragraph-item">
              <h4 className="paragraph-header">The Conscious Disease</h4>
              <p className="paragraph-text">
                I'm writing a short book about <strong>consciousness as a limit</strong>. Not really sure where it's going, but it started after I got a traumatic brain injury from a boxing match. 
                I also think all <strong>TECH PEOPLE ARE PHILOSOPHERS</strong> suddenly. AI doom is no joke.
              </p>
              <ol className="paragraph-sublist">
                <li className="sublist-item">Observable universe</li>
                <li className="sublist-item">Divine framework</li>
                <li className="sublist-item">Search for self</li>
              </ol>
              <a href="files/conscious_disease.pdf" className="link retro-tab">
                &gt;[Read It]
              </a>
            </section>
          </div>
        ),
      },
    ],
  },
];

export default contents;
