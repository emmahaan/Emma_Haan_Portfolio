/* ==========================================================================
   Portfolio rendering: homepage featured cards + the Work page slide viewer.
   Reads window.PROJECTS from assets/js/projects.js.
   ========================================================================== */
(function () {
  "use strict";

  var PROJECTS = window.PROJECTS || [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function ratio(aspect) {
    var parts = String(aspect || "16 / 9").split("/");
    var w = parseFloat(parts[0]) || 16;
    var h = parseFloat(parts[1]) || 9;
    return { value: w / h, css: w + " / " + h };
  }
  function isVideo(src) { return /\.(mp4|webm|mov)(\?|#|$)/i.test(src || ""); }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Simple placeholder shown until a real image is added */
  function placeholder(label, aspect) {
    var r = ratio(aspect);
    var W = 1600;
    var H = Math.round(W / r.value);
    var cx = W / 2;
    var cy = H / 2 - 40;
    return (
      '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="' + W + '" height="' + H + '" fill="#eceeff"/>' +
      '<g transform="translate(' + (cx - 60) + " " + (cy - 60) + ')" fill="none" stroke="#959ff0" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="4" y="12" width="112" height="96" rx="14"/><circle cx="38" cy="44" r="11"/><path d="M8 96l34-34 22 22 16-16 36 36"/></g>' +
      (label
        ? '<text x="' + cx + '" y="' + (cy + 130) + '" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="44" font-weight="600" fill="#4651b8">' + esc(label) + "</text>"
        : "") +
      "</svg>"
    );
  }

  function coverFor(p) {
    var first = p.slides && p.slides[0];
    var src = p.cover || (first && !isVideo(first.src) ? first.src : "");
    return src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : placeholder("", "16 / 10");
  }

  /* ---- Homepage: featured work ------------------------------------------ */
  function renderFeatured() {
    var wrap = $("[data-featured-work]");
    if (!wrap) return;
    var list = PROJECTS.filter(function (p) { return p.featured; });
    (list.length ? list : PROJECTS).slice(0, 3).forEach(function (p, i) {
      var a = document.createElement("a");
      a.className = "work-card";
      a.href = "portfolio.html#" + encodeURIComponent(p.id);
      a.setAttribute("data-reveal", "");
      a.style.setProperty("--i", i);
      a.innerHTML =
        '<div class="work-media">' + coverFor(p) + "</div>" +
        '<div class="work-body"><span class="work-cat">' + esc(p.category) + "</span>" +
        "<h3>" + esc(p.title) + "</h3><p>" + esc(p.tagline) + "</p>" +
        '<span class="text-link">View project ' + ARROW + "</span></div>";
      wrap.appendChild(a);
    });
  }

  /* ---- Work page viewer -------------------------------------------------- */
  function initViewer() {
    var root = $("[data-project-viewer]");
    if (!root || !PROJECTS.length) return;

    var tabsWrap = $(".tabs-scroller", root);
    var project = $(".project", root);
    var viewer = $(".viewer", root);
    var stage = $(".stage", root);
    var dots = $(".viewer-dots", root);
    var prevBtn = $("[data-prev]", root);
    var nextBtn = $("[data-next]", root);
    var counter = $(".viewer-counter", root);
    var fullBtn = $("[data-fullscreen]", root);
    var openPdf = $("[data-open-pdf]", root);
    var status = $("[data-slide-status]", root);

    var current = -1;
    var slide = 0;
    var slides = [];
    var dotEls = [];

    var tabs = PROJECTS.map(function (p, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tab-btn";
      b.id = "tab-" + p.id;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "project-panel");
      b.setAttribute("aria-selected", "false");
      b.tabIndex = -1;
      b.innerHTML = '<span class="num">' + pad(i + 1) + "</span>" + esc(p.title);
      b.addEventListener("click", function () { show(i); });
      tabsWrap.appendChild(b);
      return b;
    });

    function fill(p) {
      var r = ratio(p.aspect);
      stage.style.setProperty("--aspect", r.css);
      // Keep tall formats from running off the screen.
      stage.style.maxWidth = "calc(75vh * " + r.value.toFixed(4) + ")";

      $("[data-meta]", root).innerHTML = "<span>" + esc(p.category) + "</span><span>" + esc(p.year) + "</span>";
      $("[data-title]", root).textContent = p.title;
      $("[data-tagline]", root).textContent = p.tagline || "";
      $("[data-blurb]", root).textContent = p.blurb || "";

      var results = $("[data-results]", root);
      results.innerHTML = (p.results || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
      $("[data-results-wrap]", root).hidden = !(p.results && p.results.length);

      var facts = [];
      if (p.role) facts.push("<div><dt>Role</dt><dd>" + esc(p.role) + "</dd></div>");
      if (p.client) facts.push("<div><dt>Client</dt><dd>" + esc(p.client) + "</dd></div>");
      if (p.tools && p.tools.length) facts.push('<div><dt>Tools</dt><dd><ul class="tag-list">' + p.tools.map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("") + "</ul></dd></div>");
      if (p.skills && p.skills.length) facts.push("<div><dt>Skills</dt><dd>" + p.skills.map(esc).join(", ") + "</dd></div>");
      $("[data-facts]", root).innerHTML = facts.join("");

      stage.innerHTML = "";
      dots.innerHTML = "";
      slides = [];
      dotEls = [];
      slide = 0;

      if (p.pdf) {
        stage.setAttribute("data-mode", "pdf");
        var s = document.createElement("div");
        s.className = "slide";
        // Most phones can't display a PDF inside a page, so show a placeholder and the Open button.
        var inline = navigator.pdfViewerEnabled !== false && !window.matchMedia("(hover: none)").matches;
        s.innerHTML = inline
          ? '<iframe src="' + esc(p.pdf) + '#view=FitH" title="' + esc(p.title) + ' (PDF)" loading="lazy"></iframe>'
          : placeholder("Tap “Open PDF” to view", p.aspect);
        stage.appendChild(s);
        slides.push(s);
        openPdf.href = p.pdf;
        openPdf.hidden = false;
      } else {
        stage.setAttribute("data-mode", "slides");
        openPdf.hidden = true;
        (p.slides || []).forEach(function (sd, n) {
          var s = document.createElement("div");
          s.className = "slide";
          s.setAttribute("role", "group");
          s.setAttribute("aria-roledescription", "slide");
          s.setAttribute("aria-label", (n + 1) + " of " + p.slides.length);
          var media;
          if (sd.src && isVideo(sd.src)) {
            media = '<video src="' + esc(sd.src) + '" controls playsinline preload="metadata" aria-label="' + esc(sd.alt || "") + '"></video>';
          } else if (sd.src) {
            media = '<img src="' + esc(sd.src) + '" alt="' + esc(sd.alt || "") + '" draggable="false"' + (n > 1 ? ' loading="lazy"' : "") + ">";
          } else {
            media = placeholder("Slide " + (n + 1) + " — add your image", p.aspect);
          }
          s.innerHTML = media + (sd.caption ? '<span class="slide-caption">' + esc(sd.caption) + "</span>" : "");
          stage.appendChild(s);
          slides.push(s);

          var d = document.createElement("button");
          d.type = "button";
          d.className = "dot";
          d.setAttribute("aria-label", "Go to slide " + (n + 1));
          d.addEventListener("click", function () { go(n); });
          dots.appendChild(d);
          dotEls.push(d);
        });
      }
      update();
    }

    function update() {
      var total = slides.length;
      slides.forEach(function (s, n) {
        s.setAttribute("data-state", n === slide ? "active" : n < slide ? "before" : "after");
        s.setAttribute("aria-hidden", n === slide ? "false" : "true");
        var v = s.querySelector("video");
        if (v && n !== slide) v.pause();
      });
      dotEls.forEach(function (d, n) { d.setAttribute("aria-current", n === slide ? "true" : "false"); });

      var single = stage.getAttribute("data-mode") === "pdf" || total < 2;
      prevBtn.hidden = nextBtn.hidden = counter.hidden = dots.hidden = single;
      prevBtn.disabled = slide === 0;
      nextBtn.disabled = slide >= total - 1;
      counter.textContent = (slide + 1) + " / " + total;
      if (status && !single) status.textContent = "Slide " + (slide + 1) + " of " + total;
    }

    function go(n) {
      if (n < 0 || n >= slides.length || n === slide) return;
      slide = n;
      update();
    }

    function show(i, scroll) {
      i = (i + PROJECTS.length) % PROJECTS.length;
      if (i === current) return;
      var first = current === -1;
      current = i;
      var p = PROJECTS[i];

      tabs.forEach(function (t, n) {
        t.setAttribute("aria-selected", n === i ? "true" : "false");
        t.tabIndex = n === i ? 0 : -1;
      });
      $("#project-panel").setAttribute("aria-labelledby", tabs[i].id);
      var tab = tabs[i];
      tabsWrap.scrollTo({ left: tab.offsetLeft - (tabsWrap.clientWidth - tab.offsetWidth) / 2, behavior: first ? "auto" : "smooth" });
      if (!first) history.replaceState(null, "", "#" + p.id);
      document.title = p.title + " | Work | Emma Haan";

      var many = PROJECTS.length > 1;
      $("[data-pager]", root).hidden = !many;
      if (many) {
        $("[data-pager-prev] strong", root).textContent = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length].title;
        $("[data-pager-next] strong", root).textContent = PROJECTS[(i + 1) % PROJECTS.length].title;
      }

      if (scroll) {
        var top = $(".project-tabs", root).getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      }
      if (first || reduceMotion) { fill(p); return; }
      project.classList.add("is-switching");
      setTimeout(function () {
        fill(p);
        project.classList.remove("is-switching");
      }, 220);
    }

    prevBtn.addEventListener("click", function () { go(slide - 1); });
    nextBtn.addEventListener("click", function () { go(slide + 1); });
    $("[data-pager-prev]", root).addEventListener("click", function () { show(current - 1, true); });
    $("[data-pager-next]", root).addEventListener("click", function () { show(current + 1, true); });

    // Arrow keys: switch projects when a tab has focus, otherwise move slides.
    document.addEventListener("keydown", function (e) {
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var dir = e.key === "ArrowRight" ? 1 : -1;
      if (e.target.getAttribute && e.target.getAttribute("role") === "tab") {
        e.preventDefault();
        show(current + dir);
        tabs[current].focus();
      } else if (slides.length > 1) {
        e.preventDefault();
        go(slide + dir);
      }
    });

    // Swipe on touch screens.
    var startX = null, startY = null;
    stage.addEventListener("pointerdown", function (e) { startX = e.clientX; startY = e.clientY; });
    stage.addEventListener("pointerup", function (e) {
      if (startX == null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(slide + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener("pointercancel", function () { startX = null; });

    // Full-screen presentation mode where the browser supports it.
    if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) fullBtn.hidden = true;
    fullBtn.addEventListener("click", function () {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else {
        (viewer.requestFullscreen || viewer.webkitRequestFullscreen).call(viewer);
      }
    });

    function fromHash() {
      var id = decodeURIComponent(location.hash.slice(1));
      return PROJECTS.findIndex(function (p) { return p.id === id; });
    }
    window.addEventListener("hashchange", function () {
      var i = fromHash();
      if (i > -1) show(i);
    });
    show(Math.max(0, fromHash()));
  }

  renderFeatured();
  initViewer();
})();
