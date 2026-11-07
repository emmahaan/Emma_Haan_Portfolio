# Emma Haan — Portfolio

A static GitHub Pages site built with plain HTML, CSS and JavaScript. It has no build step: edit a file, commit it, and the site updates.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: theatre marquee, "Now Showing" project posters, interests ticker, program notes (what I bring), coming attractions (goals) and a "Meet the Cast" playbill |
| `about.html` | About Me: playbill with photo and quick facts, highlights, background, strengths, favorite things and interests |
| `portfolio.html` | Work ("The Case Files"): a tab for each project; each opens as a case file with the big collage, the clue pages below it and the summary and results beside it. Clicking the collage or any page opens a magnifier |
| `resume.html` | Forwards visitors straight to the resume PDF |
| `contact.html` | Contact: email (with a copy button), LinkedIn, resume and a few quick details |
| `404.html` | Page shown for broken links |

The site uses the "Opening Night" design: a 1920s Art Deco theatre look. The original concept files and the other directions it was chosen from are in `.open-design/`.

## Adding your content

### 1. Email, LinkedIn, location (every page at once)
Edit **`assets/js/config.js`**. Every email link, LinkedIn link, resume link and location label on the site reads from this file.

### 2. Projects
Edit **`assets/js/projects.js`**. Each project is one `{ ... }` block. The comments at the top of the file explain every field.

1. Export each project as images (JPG/PNG, about 2000px wide). In PowerPoint, Google Slides or Canva, use File → Download/Export → JPG to get one image per slide. Upload them to a folder such as `assets/img/projects/my-project/`.
2. List them under `slides` with `src`, `alt` (a short description) and an optional `label` (the caption under the page, e.g. "Example Clue"). The first slide is shown big as the collage; every slide after it appears below as a clue page visitors can click to magnify. For a video, make the first slide `{ embed: "https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0" }`.
3. The Work page reads this file, so a new project appears there with its own tab automatically. Projects with more than 12 pages show as a smaller grid labelled by page number.
4. The homepage posters are written directly in `index.html` (the "Now Showing" section): copy one `<a class="poster">` block to add a project there.
5. Optional: a short headline for a project's rubber stamp goes in the `STAMPS` list at the top of `assets/js/work.js`.

### 3. Resume
Every "Click to view my resume" link opens `assets/files/Emma_Haan_Resume.pdf` in a new tab. To update your resume, replace that file (keep the same name). The `resume` setting in `assets/js/config.js` controls where the links go.

### 4. Text placeholders
Search the HTML files for `[` or `Placeholder` and replace those with your own words.

### 5. Photo
The About page and the "Meet the Cast" playbill on the homepage use `assets/img/emma-about.jpg`. `Emma_Photo.jpg` is the preview image shown when the site is shared on social media. Replace either file (same name) to change it.

## Design system

- **Files:** one stylesheet, `assets/css/site.css`, and one script, `assets/js/site.js`, shared by every page; `assets/js/work.js` runs the Work page and its magnifier.
- **Colors:** defined once at the top of `assets/css/site.css`: night-sky ink (`--night`), gold leaf (`--gold`), cream paper (`--cream`) and Emma's periwinkle (`--peri`, `--peri-dk`) as the neon accent.
- **Type:** Limelight (Art Deco headlines), Josefin Sans (navigation and buttons), Oswald (small caps labels), Cormorant Garamond (body text) and Special Elite (typewriter labels on the case files), all from Google Fonts.
- **Motion:** marquee bulbs chase, the interests ticker scrolls, sections fade in and posters lift on hover. Visitors with "reduce motion" turned on in their system settings see no animation.

## Previewing locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing

GitHub Pages serves the site from the branch chosen in **Settings → Pages**. Merge changes into that branch (usually `main`) to publish them.
