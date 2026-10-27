/* ==========================================================================
   PROJECTS — the single source of truth for the Work page and the
   "Featured work" section on the homepage.

   Add, remove or reorder the { ... } blocks below. Each project supports:

     id           short, unique, no spaces (used in links: portfolio.html#id)
     title        project name (shown above the slides)
     tabTitle     optional shorter name for the project tab (defaults to title)
     category     e.g. "Social Media Strategy", "Campaign", "Market Research"
     year         e.g. "2026"
     tagline      one sentence: WHAT the project is
     blurb        a short paragraph: the goal, what you did, how you did it
                  (or a list of paragraphs: blurb: ["First.", "Second."])
     results      bullet list: what it DID (numbers, outcomes, feedback)
     role / client / tools / skills   shown in the details column
     featured     true = appears on the homepage (first 3 are used)
     cover        optional image for the homepage card (defaults to slide 1)
     aspect       slide shape: "16 / 9" (default, matches PowerPoint/Canva
                  decks), "4 / 3", "1 / 1" (Instagram posts), "4 / 5", "9 / 16"

   Then EITHER list slides (recommended — smoothest on phones):
     slides: [
       { src: "assets/img/projects/my-project/01.jpg", alt: "Describe it", caption: "Optional" },
       { src: "assets/img/projects/my-project/02.mp4", alt: "Video ad" }   // .mp4 plays inline
     ]
     Tip: in PowerPoint, Google Slides or Canva use File → Download/Export → JPG
     to turn a deck into one image per slide.
   OR point to a PDF:
     pdf: "assets/files/my-project.pdf"

   Leave src as "" to show a placeholder until the real image exists.
   ========================================================================== */
window.PROJECTS = [
  {
    id: "social-campaign",
    title: "Project Title One",
    category: "Social Media Campaign",
    year: "2026",
    featured: true,
    tagline: "A [platform] campaign to grow awareness for [brand / organization] among [audience].",
    blurb:
      "Placeholder. Explain the goal in one sentence, then what you planned and created, and why your approach fit the audience. Keep it short enough to read in 20 seconds.",
    results: [
      "Result with a number, e.g. grew followers 35% in 6 weeks",
      "Result with a number, e.g. 4.8% average engagement rate",
      "Feedback or recognition received"
    ],
    role: "Social Media Strategist",
    client: "Client / Course name",
    tools: ["Canva", "Meta Business Suite", "Later"],
    skills: ["Content calendar", "Copywriting", "Analytics"],
    aspect: "16 / 9",
    slides: [
      { src: "", alt: "Campaign overview", caption: "Overview" },
      { src: "", alt: "Audience research" },
      { src: "", alt: "Content examples" },
      { src: "", alt: "Results dashboard" }
    ]
  },
  {
    id: "wolf-mansion",
    title: "DECA Community Giving Project - Murder at Wolf Mansion",
    tabTitle: "DECA PMCG Project",
    category: "Community Giving Project",
    year: "2025",
    featured: true,
    tagline: "The written portion of the DECA Community Giving Project competition, with its content based on the Murder at Wolf Mansion fundraiser.",
    blurb: [
      "This is the written portion of DECA\u2019s Community Giving Project (PMCG), a Project Management event where students use the project management process to raise money or collect donations for a cause or charity. Entries are a written report of no more than 20 numbered pages, which is then presented to a judge. My report documents Murder at Wolf Mansion, a 1920s murder mystery fundraiser for the Parkersburg Historical House, but this project focuses on the planning, analysis and writing behind the event rather than the event itself.",
      "I wrote the report to follow DECA\u2019s required structure: an executive summary; initiating (the funding need, the lack of community gathering spaces, and the project\u2019s scope and rationale); planning and organizing; execution; monitoring and controlling; closing; a bibliography; and an appendix. Planning and organizing carries most of the business analysis. It includes three project goals, a human resources plan with roles and strengths, a four-milestone schedule, a plan, execute, test and adjust quality cycle with key metrics, a risk plan that pairs each issue with its potential impact and a response, and a $120 budget broken down by expense.",
      "The later sections show how the plan was tracked and judged: monitoring of the schedule, budget and quality; a controlling framework for correcting problems during the event; an evaluation of results against the original goals; lessons learned for each phase; and recommendations for future projects."
    ],
    results: [
      "Won first place in Iowa",
      "Competed at the International Career Development Conference and placed in the top 10% in Planning and Organizing",
      "Featured on the front page of local newspapers"
    ],
    role: "Director, Writer & Producer",
    client: "Parkersburg Historical Society",
    tools: ["Canva"],
    skills: ["Graphic Design", "Project Management", "Writing"],
    aspect: "17 / 22",
    slides: [
      { src: "assets/img/projects/wolf-mansion/01.jpg", alt: "Project Management Community Giving Project cover: Murder at Wolf Mansion, created by Emma Haan and Ellie Reints" },
      { src: "assets/img/projects/wolf-mansion/02.jpg", alt: "Table of contents" },
      { src: "assets/img/projects/wolf-mansion/03.jpg", alt: "Executive summary, page 1: initiating, project goals and human resources plan" },
      { src: "assets/img/projects/wolf-mansion/04.jpg", alt: "Executive summary, page 2: schedule, quality and risk management, budget and execution" },
      { src: "assets/img/projects/wolf-mansion/05.jpg", alt: "Executive summary, page 3: monitoring, controlling and closing the project" },
      { src: "assets/img/projects/wolf-mansion/06.jpg", alt: "Initiating: statement of the problem" },
      { src: "assets/img/projects/wolf-mansion/07.jpg", alt: "Initiating: project scope" },
      { src: "assets/img/projects/wolf-mansion/08.jpg", alt: "Planning and organizing: project goals (profit, participate, preserve)" },
      { src: "assets/img/projects/wolf-mansion/09.jpg", alt: "Planning and organizing: human resources management plan" },
      { src: "assets/img/projects/wolf-mansion/10.jpg", alt: "Planning and organizing: schedule and milestones" },
      { src: "assets/img/projects/wolf-mansion/11.jpg", alt: "Planning and organizing: quality management plan" },
      { src: "assets/img/projects/wolf-mansion/12.jpg", alt: "Planning and organizing: risk management plan" },
      { src: "assets/img/projects/wolf-mansion/13.jpg", alt: "Planning and organizing: proposed project budget" },
      { src: "assets/img/projects/wolf-mansion/14.jpg", alt: "Execution: event setup and guest arrival" },
      { src: "assets/img/projects/wolf-mansion/15.jpg", alt: "Execution: three rounds of investigation and conclusion of the event" },
      { src: "assets/img/projects/wolf-mansion/16.jpg", alt: "Monitoring and controlling: monitoring schedule, budget and quality" },
      { src: "assets/img/projects/wolf-mansion/17.jpg", alt: "Monitoring and controlling: controlling issues during the event" },
      { src: "assets/img/projects/wolf-mansion/18.jpg", alt: "Closing the project: evaluation of key metrics" },
      { src: "assets/img/projects/wolf-mansion/19.jpg", alt: "Closing the project: lessons learned" },
      { src: "assets/img/projects/wolf-mansion/20.jpg", alt: "Closing the project: recommendations for future projects" },
      { src: "assets/img/projects/wolf-mansion/21.jpg", alt: "Bibliography" },
      { src: "assets/img/projects/wolf-mansion/22.jpg", alt: "Appendix: guest feedback, example clue, check-in table and guest guesses" }
    ]
  },
  {
    id: "brand-refresh",
    title: "Project Title Three",
    category: "Branding",
    year: "2025",
    featured: true,
    tagline: "A brand refresh for [organization]: logo, colors, voice and templates.",
    blurb:
      "Placeholder. What wasn't working with the old brand, what you changed and how the new look supports the organization's goals.",
    results: [
      "What it did, e.g. templates now used for every event post",
      "Measurable outcome",
      "Skill this project shows"
    ],
    role: "Designer & Marketing Lead",
    client: "Student organization",
    tools: ["Canva", "Adobe Illustrator"],
    skills: ["Brand guidelines", "Visual identity"],
    aspect: "16 / 9",
    slides: [
      { src: "", alt: "Brand board" },
      { src: "", alt: "Before and after" },
      { src: "", alt: "Templates in use" }
    ]
  },
  {
    id: "market-research",
    title: "Project Title Four",
    category: "Market Research",
    year: "2025",
    tagline: "A survey and competitive analysis on [topic] with clear recommendations.",
    blurb: "Placeholder. The question you set out to answer, how you gathered data and what you found.",
    results: ["Number of responses collected", "Top finding", "Recommendation made"],
    role: "Researcher",
    client: "Course name",
    tools: ["Google Forms", "Excel", "Tableau"],
    skills: ["Survey design", "Data analysis", "Presenting"],
    aspect: "16 / 9",
    slides: [
      { src: "", alt: "Research question" },
      { src: "", alt: "Key findings chart" },
      { src: "", alt: "Recommendations" }
    ]
  },
  {
    id: "content-series",
    title: "Project Title Five",
    category: "Content Creation",
    year: "2024",
    tagline: "A series of Instagram posts and short videos for [brand / event].",
    blurb: "Placeholder. The idea behind the series and how you kept it consistent and on-brand.",
    results: ["Reach or views", "Engagement", "What you learned"],
    role: "Content Creator",
    client: "Client / Personal",
    tools: ["Canva", "CapCut", "Instagram"],
    skills: ["Short-form video", "Copywriting"],
    aspect: "1 / 1",
    slides: [
      { src: "", alt: "Post one" },
      { src: "", alt: "Post two" },
      { src: "", alt: "Post three" }
    ]
  }
];
