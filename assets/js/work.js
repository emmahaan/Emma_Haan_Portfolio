/* Emma Haan — Opening Night: the Work page ("The Case Files")
   Reads every project from assets/js/projects.js, so the site keeps one
   source of truth. Each project becomes a dossier: the big collage on the
   left with the clue pages laid out below it, the case summary on the right.
   Clicking any page opens the magnifier (lightbox). */
(function () {
  var P = window.PROJECTS || [];
  var ROOT = "";
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
  var lens = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  var current = 0, items = [];

  /* tabs */
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

  function shortCap(s, i) {
    if (s.label) return s.label;
    var a = (s.alt || "").split(":")[0];
    return a.length > 34 ? "Page " + (i + 1) : a;
  }

  function render(p, i) {
    var slides = (p.slides || []).filter(function (s) { return s.src || s.embed; });
    var images = slides.filter(function (s) { return s.src; });
    items = images.map(function (s, k) { return { src: ROOT + s.src, alt: s.alt || "", label: s.label || (k === 0 ? "The collage" : shortCap(s, k)) }; });
    var big, clues = [];
    if (slides[0] && slides[0].embed) {
      big = '<div class="video"><div class="fallback"><b>STOLEN</b><a href="' + esc(slides[0].embed.replace("youtube-nocookie.com/embed/", "youtube.com/watch?v=").replace("?rel=0", "")) + '" target="_blank" rel="noopener">Watch on YouTube</a></div>' +
            '<iframe src="' + esc(slides[0].embed) + '" title="' + esc(slides[0].alt || p.title) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    } else if (images.length) {
      var first = images[0], portrait = !(first.aspect || "").startsWith("16");
      big = '<button type="button" class="collage' + (portrait ? " portrait" : "") + '" data-open="0" aria-label="Magnify: ' + esc(first.alt) + '">' +
            '<img src="' + ROOT + esc(first.src) + '" alt="' + esc(first.alt) + '"><span class="zoom-hint">' + lens + 'Magnify</span></button>';
      clues = images.slice(1);
    }
    var many = clues.length > 16;
    var clueHtml = clues.length ? (
      '<div class="ev-head">The evidence<small>' + clues.length + ' pages · click to magnify</small></div>' +
      '<div class="clues' + (many ? " many" : "") + '">' + clues.map(function (s, k) {
        return '<button type="button" class="clue" data-open="' + (k + 1) + '" aria-label="Magnify ' + esc(items[k + 1].label) + ': ' + esc(s.alt) + '">' +
               '<img src="' + ROOT + esc(s.src) + '" alt="" loading="lazy"><span class="lens">' + lens + '</span><span class="cap">' + (many && !s.label ? "Page " + (k + 2) : esc(items[k + 1].label)) + '</span></button>';
      }).join("") + '</div>') : "";
    var blurb = [].concat(p.blurb || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    var dl = [["Role", p.role], ["Client", p.client], ["Tools", (p.tools || []).join(", ")], ["Skills", (p.skills || []).join(", ")]]
      .filter(function (r) { return r[1]; }).map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("");
    var results = (p.results || []).map(function (r) { return "<li><span>" + esc(r) + "</span></li>"; }).join("");
    var st = STAMPS[p.id];
    var prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    var nice = function (t) { return esc(t.replace(/©/g, "©")); };

    box.innerHTML =
      '<header class="case-title"><div class="meta">' + esc(p.category) + ' · ' + esc(p.year) + '</div><h2>' + nice(p.title) + '</h2><p>' + esc(p.tagline) + '</p></header>' +
      '<article class="dossier"><span class="file-tab">CASE No. ' + String(i + 1).padStart(2, "0") + '<span class="cat"> · ' + esc((p.category || "").toUpperCase()) + '</span></span>' +
        '<div class="d-left">' + big + clueHtml + '</div>' +
        '<div class="d-right">' + (st ? '<div class="stamp"><b>' + esc(st[0]) + '</b><small>' + esc(st[1]) + '</small></div>' : "") +
          '<div class="k">Case summary</div><h3>About the project</h3><div class="blurb">' + blurb + '</div>' +
          '<dl class="dl">' + dl + '</dl>' +
          (results ? '<div class="ev-head" style="margin-top:0">Results</div><ol class="exhibits">' + results + '</ol>' : "") +
        '</div>' +
      '</article>' +
      '<nav class="case-nav" aria-label="More projects"><button type="button" data-go="' + ((i - 1 + P.length) % P.length) + '"><small>← Previous showing</small><b>' + nice(prev.tabTitle || prev.title) + '</b></button>' +
      '<button type="button" data-go="' + ((i + 1) % P.length) + '"><small>Next showing →</small><b>' + nice(next.tabTitle || next.title) + '</b></button></nav>' +
      (items.length ? '<p class="tip">Tip: click the collage or any page to magnify it</p>' : "");
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
    var o = e.target.closest("[data-open]"); if (o) { openLb(+o.dataset.open, o); return; }
    var g = e.target.closest("[data-go]"); if (g) show(+g.dataset.go, true);
  });

  /* ---- the magnifier ---------------------------------------------------- */
  var lb = document.getElementById("lb"), img = document.getElementById("lb-img"), stage = document.getElementById("lb-stage");
  var lbLabel = document.getElementById("lb-label"), lbCount = document.getElementById("lb-count"), lbAlt = document.getElementById("lb-alt");
  var zoomBtn = document.getElementById("lb-zoom"), at = 0, opener = null, zoomed = false;

  function setImg(k) {
    at = (k + items.length) % items.length;
    var it = items[at];
    unzoom();
    img.src = it.src; img.alt = it.alt;
    lbLabel.textContent = it.label;
    lbCount.textContent = "Page " + (at + 1) + " of " + items.length;
    lbAlt.textContent = it.alt;
    [at + 1, at - 1].forEach(function (n) { var pre = new Image(); pre.src = items[(n + items.length) % items.length].src; });
  }
  function openLb(k, from) {
    if (!items.length) return;
    opener = from; lb.hidden = false; lb.classList.add("open");
    document.body.style.overflow = "hidden";
    setImg(k);
    document.getElementById("lb-close").focus();
  }
  function closeLb() {
    lb.classList.remove("open"); lb.hidden = true; document.body.style.overflow = "";
    if (opener) opener.focus();
  }
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
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") { zoomed ? unzoom() : closeLb(); }
    else if (e.key === "ArrowRight" && !zoomed) setImg(at + 1);
    else if (e.key === "ArrowLeft" && !zoomed) setImg(at - 1);
    else if (e.key === "z" || e.key === "+" || e.key === "=") { zoomed ? unzoom() : zoomAt(.5, .2); }
    else if (e.key === "Tab") {             // keep focus inside the magnifier
      var f = [].slice.call(lb.querySelectorAll("button")), i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  var tx = null;
  stage.addEventListener("touchstart", function (e) { tx = zoomed ? null : e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) setImg(at + (dx < 0 ? 1 : -1));
  });

  /* start on the project named in the link (work.html#stolen), else the first */
  function fromHash() { var id = location.hash.slice(1), k = P.findIndex(function (p) { return p.id === id; }); return k < 0 ? 0 : k; }
  show(fromHash(), false);
  window.addEventListener("hashchange", function () { show(fromHash(), false); });
})();
