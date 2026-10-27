/* ==========================================================================
   PROJECTS — the single source of truth for the Work page and the
   "Featured work" section on the homepage.

   Add, remove or reorder the { ... } blocks below. Each project supports:

     id           short, unique, no spaces (used in links: portfolio.html#id)
     title        project name (shown above the slides)
     category     e.g. "Social Media Strategy", "Campaign", "Market Research"
     year         e.g. "2026"
     tagline      one sentence: WHAT the project is
     blurb        a short paragraph: the goal, what you did, how you did it
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
    id: "marketing-plan",
    title: "Project Title Two",
    category: "Marketing Plan",
    year: "2026",
    featured: true,
    tagline: "A full marketing plan for [product / business], from research to launch.",
    blurb:
      "Placeholder. Describe the business problem, the research you did and the strategy you recommended.",
    results: [
      "What it did, e.g. plan adopted by the client",
      "Key insight from the research",
      "Grade, award or feedback"
    ],
    role: "Team Lead",
    client: "Client / Course name",
    tools: ["PowerPoint", "Excel", "Qualtrics"],
    skills: ["SWOT analysis", "Segmentation", "Budgeting"],
    aspect: "16 / 9",
    slides: [
      { src: "", alt: "Plan cover" },
      { src: "", alt: "Situation analysis" },
      { src: "", alt: "Target market" },
      { src: "", alt: "Strategy and tactics" },
      { src: "", alt: "Budget and timeline" }
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
