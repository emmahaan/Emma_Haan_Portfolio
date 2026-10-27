# Emma Haan — Marketing Portfolio

A static GitHub Pages site built with plain HTML, CSS and JavaScript. It has no build step: edit a file, commit it, and the site updates.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: intro with photo, what I bring, career interests and goals, featured projects |
| `about.html` | About Me: photo as the focal point, background, aspirations, strengths, experience highlights, tools |
| `portfolio.html` | Work: a project switcher and a slide viewer for each project, with the title above and the blurb below |
| `resume.html` | Résumé: download button, education, experience, leadership, skills, certifications |
| `contact.html` | Contact: email (with a copy button), LinkedIn, résumé, and a quick message form |
| `404.html` | Page shown for broken links |

## Adding your content

### 1. Email, LinkedIn, location (every page at once)
Edit **`assets/js/config.js`**. Every email link, LinkedIn link, résumé link and location label on the site reads from this file.

### 2. Projects
Edit **`assets/js/projects.js`**. Each project is one `{ ... }` block. The comments at the top of the file explain every field.

1. Export each project as images (JPG/PNG, about 2000px wide). In PowerPoint, Google Slides or Canva, use File → Download/Export → JPG to get one image per slide. Upload them to a folder such as `assets/img/projects/my-project/`.
2. List them under `slides` with `src` and `alt` (a short description). `.mp4` files play inline (handy for video ads or reels).
3. You can use a PDF instead: set `pdf: "assets/files/my-project.pdf"`. Images give the smoothest experience, because most phones can't show a PDF inside a page. On phones, a PDF project shows an **Open PDF** button instead.
4. `featured: true` puts a project on the homepage. The first three featured projects are shown.
5. `aspect` sets the slide shape: `"16 / 9"` for slide decks (default), `"1 / 1"` or `"4 / 5"` for Instagram posts, `"9 / 16"` for stories/reels.

Until a slide has a `src`, it shows a periwinkle placeholder graphic.

### 3. Résumé
Replace **`assets/files/Emma_Haan_Resume.pdf`** with your real résumé and keep the same file name. Then update the text on `resume.html`.

### 4. Text placeholders
Search the HTML files for `[` or `Placeholder` and replace those with your own words.

### 5. Photo
The Home and About pages use `Emma_Photo.jpg` in the main folder. Replace that file (same name) to change the photo.

## Design system

- **Colors:** a periwinkle palette defined once at the top of `assets/css/style.css` (`--peri-600` is the main accent, `--ink` the dark text and footer color).
- **Type:** Plus Jakarta Sans for everything, loaded from Google Fonts.
- **Motion:** kept light. Sections fade in as you scroll, cards lift slightly on hover, and slides crossfade. Visitors with "reduce motion" turned on in their system settings see no animation.

## Previewing locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing

GitHub Pages serves the site from the branch chosen in **Settings → Pages**. Merge changes into that branch (usually `main`) to publish them.
