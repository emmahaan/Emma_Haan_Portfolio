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
     slides[].embed   a hosted video, e.g. { embed: "https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0" }
     coverFallback    optional backup image if the cover fails to load
     slides[].label   optional caption shown in the top-left corner of the viewer (say what the slide is)
     slides[].aspect  optional: give one slide its own shape (e.g. a wide cover on a portrait deck)
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
    id: "hemingways-in-town",
    title: "Murder at Wolf Mansion: Hemingway\u2019s in Town\u00A9",
    category: "Murder Mystery Event",
    year: "2026",
    featured: true,
    tagline: "A 1920s murder mystery dinner and the direct sequel to Murder at Wolf Mansion\u00A9, featuring real historical figures, new characters and new clues.",
    blurb: [
      "Murder at Wolf Mansion: Hemingway\u2019s in Town\u00A9 is my second murder mystery and the direct sequel to Murder at Wolf Mansion\u00A9. Ernest Hemingway comes to Parkersburg with his second wife, Pauline Pfeiffer, a Parkersburg native. His first wife, Hadley Richardson, turns up too, along with F. Scott Fitzgerald and many other characters based on real historical figures. Guests walk through the historic house collecting clues, questioning the actors and working to solve the mystery.",
      "I wrote the story, clues and character bios, directed the actors, produced the event and led its marketing. As with the first mystery, it was a fundraiser for the Parkersburg Historical Society."
    ],
    results: [
      "Raised over $5,000 for the Parkersburg Historical Society",
      "Grew the Historical Society\u2019s Facebook page from 1,264 to 3,047 followers, a gain of 1,783 followers (about 141%)",
      "Received many positive comments from the community",
      "Word about the event and the historic house spread widely online"
    ],
    role: "Writer, Director & Producer",
    client: "Parkersburg Historical Society",
    skills: ["Storyboarding", "Event Management", "Cast & Team Leadership", "Marketing Direction (promotion and social media)"],
    cover: "assets/img/projects/hemingways/cover.jpg",
    aspect: "17 / 22",
    slides: [
      { src: "assets/img/projects/hemingways/cover.jpg", alt: "Collage from Murder at Wolf Mansion: Hemingway\u2019s in Town: actors in 1920s costume, a torn marriage certificate clue, a mannequin victim, dinner guests and an old photo of the Parkersburg mansion", aspect: "16 / 9" },
      { src: "assets/img/projects/hemingways/01.jpg", alt: "Opening ceremony script, page 1: Mary Wolf welcomes the guests and introduces Paul Pfeiffer, his daughter Pauline and Ernest Hemingway", label: "Opening Ceremony" },
      { src: "assets/img/projects/hemingways/02.jpg", alt: "Opening ceremony script, page 2: Mary Wolf introduces F. Scott Fitzgerald, Mabel Crane and Leon Knox", label: "Opening Ceremony" },
      { src: "assets/img/projects/hemingways/03.jpg", alt: "Opening ceremony script, page 3: Hadley Richardson, Ida Finch and Lavinia Vale join the scene", label: "Opening Ceremony" },
      { src: "assets/img/projects/hemingways/04.jpg", alt: "Round 2 clue: comparative writing drafts by F. Scott Fitzgerald and Ernest Hemingway", label: "Example Clue" },
      { src: "assets/img/projects/hemingways/05.jpg", alt: "Round 2 clue: forensic science report on stab and cutting injuries, with a knife wound", label: "Example Clue" },
      { src: "assets/img/projects/hemingways/06.jpg", alt: "Round 2 clue: forensic report pages on letter opener and scissors wounds", label: "Example Clue" },
      { src: "assets/img/projects/hemingways/08.jpg", alt: "Round 1 character bio for Ida Finch, the maid of Wolf Manor", label: "Example Bio for Round 1" },
      { src: "assets/img/projects/hemingways/07.jpg", alt: "Round 1 character bios, page 1: how one character feels about Hemingway, Pauline Pfeiffer, Fitzgerald and others, plus the Round 1 clue letter", label: "Example Bio for Round 1" },
      { src: "assets/img/projects/hemingways/09.jpg", alt: "Round 2 script and bio for Pauline Pfeiffer", label: "Example Bio for Round 2" },
      { src: "assets/img/projects/hemingways/10.jpg", alt: "Round 3 script and bio for Paul Pfeiffer", label: "Example Bio for Round 3" }
    ]
  },
  {
    id: "wolf-mansion",
    title: "DECA Community Giving Project - Murder at Wolf Mansion",
    tabTitle: "DECA PMCG Project",
    category: "Community Giving Project",
    year: "2025",
    featured: true,
    tagline: "The written portion of the DECA Community Giving Project competition, with its content based on the Murder at Wolf Mansion© fundraiser.",
    blurb:
      "This is the written portion of DECA\u2019s Community Giving Project (PMCG), a Project Management event where students use the project management process to raise money for a cause or charity through a report of up to 20 numbered pages, then present it to a judge. My report documents Murder at Wolf Mansion©, a 1920s murder mystery fundraiser for the Parkersburg Historical House, and follows DECA\u2019s required structure from executive summary through closing. It centers on the planning and analysis behind the event: three project goals, a human resources plan, a four-milestone schedule, a quality cycle with key metrics, a risk plan and a $120 budget, followed by monitoring, controlling, an evaluation against the goals, lessons learned and recommendations.",
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
    id: "stolen",
    title: "Stolen",
    category: "Short Film",
    year: "2026",
    featured: true,
    tagline: "A short film where a group of friends go on a mission to get back what was stolen from them.",
    blurb:
      "Stolen is a student-made short film that I wrote, helped direct and acted in. Lennon calls his friends together to tell them that something was stolen from him, and according to Lennon it is sitting in a girl named Lisa\u2019s house. The group sets out on a mission to break in and take it back. As head writer I wrote the script, shaping the story and characters, and I worked with the cast as a director while also performing on screen.",
    results: [
      "Received the highest rating at two film contests",
      "Received all-state recognition from the Iowa High School Speech Association"
    ],
    role: "Head Writer, Director & Actor",
    client: "Aplington-Parkersburg Speech Team",
    skills: ["Scriptwriting", "Leadership", "Managing Actors", "Storyboarding"],
    cover: "https://i.ytimg.com/vi/ekTW2sTzFkQ/maxresdefault.jpg",
    coverFallback: "https://i.ytimg.com/vi/ekTW2sTzFkQ/hqdefault.jpg",
    aspect: "16 / 9",
    slides: [
      { embed: "https://www.youtube-nocookie.com/embed/ekTW2sTzFkQ?rel=0", alt: "Stolen, a student short film written by Emma Haan" }
    ]
  },
  {
    id: "ffa-mystery",
    title: "Murder at the FFA Banquet",
    category: "Murder Mystery Event",
    year: "2026",
    tagline: "An original dinner-style murder mystery for a local FFA chapter, where every guest played a role and had clues to reveal.",
    blurb:
      "Murder at the FFA Banquet is a dinner-style murder mystery that I wrote, directed and produced for a local FFA chapter. Guests sat at tables and were given a role based on their seat, then talked within their table to solve the case. Every person had their own clues to reveal and dialogue lines to deliver. The FFA officer team played the suspects, and our advisor and teacher played the person who got killed. The slides show a few of the clues guests worked with, followed by two of the character information sheets that told each role who they were and how to act during the game.",
    results: [
      "Raised over $1,000",
      "70 guests attended"
    ],
    role: "Writer, Director & Producer",
    client: "Aplington-Parkersburg FFA Chapter",
    skills: ["Creating Stories", "Event Planning", "Directing", "Clue Design"],
    cover: "assets/img/projects/ffa-mystery/cover.jpg",
    aspect: "17 / 22",
    slides: [
      { src: "assets/img/projects/ffa-mystery/cover.jpg", alt: "Collage of photos from the Murder at the FFA Banquet: guests at dinner tables comparing clues, the FFA officer team who played the suspects, and an officer speaking at the podium", aspect: "16 / 9" },
      { src: "assets/img/projects/ffa-mystery/clue-21.jpg", alt: "Example clue: internship application", label: "Examples clues" },
      { src: "assets/img/projects/ffa-mystery/clue-23.jpg", alt: "Example clue: judge scoring rubric from a District FFA Public Speaking contest", label: "Examples clues" },
      { src: "assets/img/projects/ffa-mystery/clue-25.jpg", alt: "Example clue: Butler County EMS incident summary", label: "Examples clues" },
      { src: "assets/img/projects/ffa-mystery/clue-27.jpg", alt: "Example clue: text message conversation", label: "Examples clues" },
      { src: "assets/img/projects/ffa-mystery/clue-33.jpg", alt: "Example clue: sample chemical analysis report", label: "Examples clues" },
      { src: "assets/img/projects/ffa-mystery/sibling-1.jpg", alt: "Character information example: Little Sibling, page 1", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sibling-2.jpg", alt: "Character information example: Little Sibling, page 2", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sibling-3.jpg", alt: "Character information example: Little Sibling, page 3", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sibling-4.jpg", alt: "Character information example: Little Sibling, page 4", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sheriff-1.jpg", alt: "Character information example: Town Sheriff, page 1", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sheriff-2.jpg", alt: "Character information example: Town Sheriff, page 2", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sheriff-3.jpg", alt: "Character information example: Town Sheriff, page 3", label: "Character Information Example" },
      { src: "assets/img/projects/ffa-mystery/sheriff-4.jpg", alt: "Character information example: Town Sheriff, page 4", label: "Character Information Example" }
    ]
  },
  {
    id: "murder-mystery",
    title: "Murder at Wolf Mansion\u00A9",
    category: "Murder Mystery Event",
    year: "2024",
    tagline: "A 1920s interactive murder mystery based on real events and real people, where guests search the house for clues and question the characters.",
    blurb:
      "Murder at Wolf Mansion\u00A9 is a 1920s murder mystery based on real events and real characters from Parkersburg\u2019s history. Actors played historical figures while guests walked around the house looking for clues, talking to the characters and working together to solve the mystery. The slides open with photos from the night, then give a taste of the writing behind it: a few of the clues guests hunted for, followed by the character bios the actors used in Rounds 1, 2 and 3, which spelled out what each character thought of the others and which clues they knew.",
    results: [
      "All 50 guests attended",
      "Guests gave overwhelmingly positive feedback and hoped for more events like it",
      "Raised ticket sales and donations for the historical house"
    ],
    role: "Director, Writer & Producer",
    client: "Parkersburg Historical Society",
    skills: ["Creating Stories", "Event Planning", "Event Directing", "Marketing", "Sales"],
    cover: "assets/img/projects/murder-mystery/cover.jpg",
    aspect: "17 / 22",
    slides: [
      { src: "assets/img/projects/murder-mystery/cover.jpg", alt: "Collage of photos from the Murder at Wolf Mansion event: guests in 1920s costume reading clues, talking with characters and gathering in the historic house", aspect: "16 / 9" },
      { src: "assets/img/projects/murder-mystery/01.jpg", alt: "Clue 3: the last will and testament of Charles C. Wolf", label: "Example Clue" },
      { src: "assets/img/projects/murder-mystery/02.jpg", alt: "Clue 5: a floor plan of the Wolf Mansion with room names and sizes", label: "Example Clue" },
      { src: "assets/img/projects/murder-mystery/03.jpg", alt: "Clue 10: a newspaper-style call to the community to help rebuild the church", label: "Example Clue" },
      { src: "assets/img/projects/murder-mystery/04.jpg", alt: "Round 1 bio for Sarah Wolf, page 1: her family, and what she thinks of the other characters", label: "Example Bio for Round 1" },
      { src: "assets/img/projects/murder-mystery/05.jpg", alt: "Round 1 bio for Sarah Wolf, page 2: what she thinks of the other characters and the clues she knows", label: "Example Bio for Round 1" },
      { src: "assets/img/projects/murder-mystery/06.jpg", alt: "Round 2 bio for Elma Parker, page 1: her role and what she thinks of other characters", label: "Example Bio for Round 2" },
      { src: "assets/img/projects/murder-mystery/07.jpg", alt: "Round 2 bio for Elma Parker, page 2: the clues Elma knows", label: "Example Bio for Round 2" },
      { src: "assets/img/projects/murder-mystery/08.jpg", alt: "Round 3 bio for Mary Wolf, page 1: her role and what she thinks of other characters", label: "Example Bio for Round 3" },
      { src: "assets/img/projects/murder-mystery/09.jpg", alt: "Round 3 bio for Mary Wolf, page 2: the clues Mary knows about", label: "Example Bio for Round 3" }
    ]
  }
];
