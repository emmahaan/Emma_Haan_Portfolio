/* Emma Haan — Opening Night: the Work page ("The Case Files")
   Reads every project from assets/js/projects.js. Each project shows as a
   compact case file: the collage and a short summary side by side, with the
   clue pages on a scrolling filmstrip underneath. Clicking the collage or a
   page opens the magnifier; "Read the full story" opens the full write-up. */
(function () {
  var P = window.PROJECTS || [];
  var STAMPS = {                       // short headline for the rubber stamp on each file
    "hemingways-in-town": ["$5,000+", "raised · 2026"],
    "stolen": ["Highest rating", "two film contests"],
    "wolf-mansion": ["1st in Iowa", "DECA · 2025"],
    "ffa-mystery": ["70 guests", "$1,000+ raised"],
    "murder-mystery": ["Case closed", "all 50 guests · 2024"]
  };
  var season = document.getElementById("season"), box = document.getElementById("case");
  if (!season || !box || !P.length) return;

  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var nice = function (t) { return esc(String(t || "").replace(/©/g, "©")); };
  var lens = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  var current = 0, pages = [];
  var small = window.matchMedia("(max-width: 620px)");

  function pagesOf(p) {
    return (p.slides || []).filter(function (s) { return s.src; }).map(function (s, k) {
      var a = (s.alt || "").split(":")[0];
      return { src: s.src, alt: s.alt || "", label: s.label || (k === 0 ? "The collage" : (a.length > 18 ? "Page " + (k + 1) : a)), wide: (s.aspect || "").indexOf("16") === 0 };
    });
  }

  /* project tabs */
  season.innerHTML = P.map(function (p, i) {
    return '<button type="button" role="tab" id="tab-' + esc(p.id) + '" aria-controls="case" aria-selected="false" data-i="' + i + '">' +
      '<span class="n">No. ' + String(i + 1).padStart(2, "0") + '</span><span class="t">' + esc(p.tabTitle || p.title.replace(/©/g, "").split(":").pop().trim()) + '</span></button>';
  }).join("");
  season.addEventListener("click", function (e) { var b = e.target.closest("button[data-i]"); if (b) show(+b.dataset.i, true); });
  season.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var n = (current + (e.key === "ArrowRight" ? 1 : -1) + P.length) % P.length;
    show(n, true); season.children[n].focus();
  });

  function render(p, i) {
    pages = pagesOf(p);
    var first = (p.slides || [])[0], em = first && first.embed ? first : null, st = STAMPS[p.id];
    var big = em
      ? '<div class="video"><div class="fallback"><b>STOLEN</b></div><iframe src="' + esc(em.embed) + '" title="' + esc(em.alt || p.title) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
      : '<button type="button" class="collage" data-m="0" aria-label="Magnify: ' + esc(pages[0].alt) + '"><img src="' + esc(pages[0].src) + '" alt="' + esc(pages[0].alt) + '"><span class="zoom-hint">' + lens + 'Magnify</span></button>';
    var clues = em ? [] : pages.slice(1);
    var SHOW = small.matches ? 4 : 6;              // one row of clue pages; the rest open from the "+ more" tile
    var shown = clues.length > SHOW ? clues.slice(0, SHOW - 1) : clues, more = clues.length - shown.length;
    var prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    box.innerHTML =
      '<article class="dossier compact"><span class="file-tab">CASE No. ' + String(i + 1).padStart(2, "0") + '<span class="cat"> · ' + esc((p.category || "").toUpperCase()) + '</span></span>' +
        '<div class="d-left">' + big +
          (clues.length ? '<div class="ev-head">The evidence<small>' + clues.length + ' pages · click to magnify</small></div><div class="clues row">' +
            shown.map(function (c, k) {
              return '<button type="button" class="clue" data-m="' + (k + 1) + '" aria-label="Magnify ' + esc(c.label) + ': ' + esc(c.alt) + '"><img src="' + esc(c.src) + '" alt="" loading="lazy"><span class="lens">' + lens + '</span><span class="cap">' + esc(c.label) + '</span></button>';
            }).join('') +
            (more ? '<button type="button" class="clue more" data-m="' + (shown.length + 1) + '" aria-label="See ' + more + ' more pages"><span class="stack" aria-hidden="true"></span><b>+' + more + '</b><span class="cap">more pages</span></button>' : '') +
          '</div>' : '') +
        '</div>' +
        '<div class="d-right">' + (st ? '<div class="stamp"><b>' + esc(st[0]) + '</b><small>' + esc(st[1]) + '</small></div>' : '') +
          '<div class="k">' + esc(p.category) + ' · ' + esc(p.year) + '</div><h2>' + nice(p.title) + '</h2><p class="tagline">' + esc(p.tagline) + '</p>' +
          '<dl class="dl"><dt>Role</dt><dd>' + esc(p.role) + '</dd>' + (p.client ? '<dt>Client</dt><dd>' + esc(p.client) + '</dd>' : '') + '</dl>' +
          ((p.results || []).length ? '<ol class="exhibits">' + p.results.slice(0, 3).map(function (r) { return '<li><span>' + esc(r) + '</span></li>'; }).join('') + '</ol>' : '') +
          '<div class="row-btns"><button type="button" class="btn" data-story>Read the full story</button></div>' +
        '</div>' +
      '</article>' +
      '<nav class="case-nav" aria-label="More projects"><button type="button" data-go="' + ((i - 1 + P.length) % P.length) + '"><small>← Previous showing</small><b>' + nice(prev.tabTitle || prev.title) + '</b></button>' +
      '<button type="button" data-go="' + ((i + 1) % P.length) + '"><small>Next showing →</small><b>' + nice(next.tabTitle || next.title) + '</b></button></nav>';
  }

  function show(i, user) {
    current = i;
    [].forEach.call(season.children, function (b, k) { b.setAttribute("aria-selected", k === i ? "true" : "false"); b.tabIndex = k === i ? 0 : -1; });
    box.setAttribute("aria-labelledby", "tab-" + P[i].id);
    render(P[i], i);
    if (user) {
      history.replaceState(null, "", "#" + P[i].id);
      var y = season.getBoundingClientRect().top + window.scrollY - 90;
      if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  box.addEventListener("click", function (e) {
    var m = e.target.closest("[data-m]"); if (m) return openLb(+m.dataset.m, m);
    var s = e.target.closest("[data-story]"); if (s) return openStory(P[current], s);
    var sc = e.target.closest("[data-scroll]"); if (sc) return box.querySelector(".reel").scrollBy({ left: +sc.dataset.scroll * 480, behavior: "smooth" });
    var g = e.target.closest("[data-go]"); if (g) show(+g.dataset.go, true);
  });

  /* ---- the magnifier ---------------------------------------------------- */
  var lb = document.getElementById("lb"), img = document.getElementById("lb-img"), stage = document.getElementById("lb-stage");
  var zoomBtn = document.getElementById("lb-zoom"), at = 0, opener = null, zoomed = false;
  function setImg(k) {
    at = (k + pages.length) % pages.length; var it = pages[at]; unzoom();
    img.src = it.src; img.alt = it.alt;
    document.getElementById("lb-label").textContent = it.label;
    document.getElementById("lb-count").textContent = "Page " + (at + 1) + " of " + pages.length;
    document.getElementById("lb-alt").textContent = it.alt;
    [at + 1, at - 1].forEach(function (n) { var pre = new Image(); pre.src = pages[(n + pages.length) % pages.length].src; });
  }
  function openLb(k, from) {
    if (!pages.length) return;
    opener = from; lb.hidden = false; lb.classList.add("open"); document.body.style.overflow = "hidden";
    setImg(k); document.getElementById("lb-close").focus();
  }
  function closeLb() { lb.classList.remove("open"); lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  function zoomAt(rx, ry) {
    var w = img.getBoundingClientRect().width;
    zoomed = true; lb.classList.add("zoomed"); zoomBtn.setAttribute("aria-label", "Zoom out");
    img.style.width = Math.max(w * 2.4, Math.min(img.naturalWidth, w * 3)) + "px";
    requestAnimationFrame(function () {
      stage.scrollLeft = rx * img.offsetWidth - stage.clientWidth / 2 + img.offsetLeft;
      stage.scrollTop = ry * img.offsetHeight - stage.clientHeight / 2 + img.offsetTop;
    });
  }
  function unzoom() { zoomed = false; lb.classList.remove("zoomed"); img.style.width = ""; zoomBtn.setAttribute("aria-label", "Magnify"); }
  stage.addEventListener("click", function (e) {
    if (e.target !== img) { if (!zoomed) closeLb(); return; }
    if (zoomed) { unzoom(); return; }
    var r = img.getBoundingClientRect();
    zoomAt((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });
  zoomBtn.addEventListener("click", function () { zoomed ? unzoom() : zoomAt(.5, .2); });
  document.getElementById("lb-close").addEventListener("click", closeLb);
  document.getElementById("lb-prev").addEventListener("click", function () { setImg(at - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { setImg(at + 1); });
  var tx = null;
  stage.addEventListener("touchstart", function (e) { tx = zoomed ? null : e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) setImg(at + (dx < 0 ? 1 : -1));
  });

  /* ---- the full story panel -------------------------------------------- */
  var story = document.getElementById("story");
  function openStory(p, from) {
    var dl = [["Role", p.role], ["Client", p.client], ["Tools", (p.tools || []).join(", ")], ["Skills", (p.skills || []).join(", ")]]
      .filter(function (r) { return r[1]; }).map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("");
    document.getElementById("story-body").innerHTML =
      '<div class="k">Case summary · ' + esc(p.category) + ' · ' + esc(p.year) + '</div><h2 id="story-h">' + nice(p.title) + '</h2>' +
      [].concat(p.blurb || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + '<dl class="dl">' + dl + '</dl>' +
      ((p.results || []).length ? '<ol class="exhibits">' + p.results.map(function (r) { return "<li><span>" + esc(r) + "</span></li>"; }).join("") + "</ol>" : "");
    opener = from; story.hidden = false; document.body.style.overflow = "hidden"; story.querySelector(".story-x").focus();
  }
  function closeStory() { story.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  story.querySelector(".story-x").addEventListener("click", closeStory);
  story.addEventListener("click", function (e) { if (e.target === story) closeStory(); });

  document.addEventListener("keydown", function (e) {
    var dlg = !story.hidden ? story : lb.classList.contains("open") ? lb : null;
    if (!dlg) return;
    if (e.key === "Tab") {                 // keep focus inside the open panel
      var f = [].slice.call(dlg.querySelectorAll("button")), n = f.indexOf(document.activeElement);
      e.preventDefault(); f[(n + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); return;
    }
    if (dlg === story) { if (e.key === "Escape") closeStory(); return; }
    if (e.key === "Escape") { zoomed ? unzoom() : closeLb(); }
    else if (e.key === "ArrowRight" && !zoomed) setImg(at + 1);
    else if (e.key === "ArrowLeft" && !zoomed) setImg(at - 1);
    else if (e.key === "z" || e.key === "+" || e.key === "=") { zoomed ? unzoom() : zoomAt(.5, .2); }
  });

  /* start on the project named in the link (portfolio.html#stolen), else the first */
  function fromHash() { var id = location.hash.slice(1), k = P.findIndex(function (p) { return p.id === id; }); return k < 0 ? 0 : k; }
  show(fromHash(), false);
  window.addEventListener("hashchange", function () { show(fromHash(), false); });
  if (small.addEventListener) small.addEventListener("change", function () { render(P[current], current); });
})();
