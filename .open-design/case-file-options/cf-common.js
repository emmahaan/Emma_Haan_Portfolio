/* Shared pieces for the three case-file layout options:
   project tabs, the magnifier and the "full story" panel.
   Each option page defines window.renderCase(project, index, api). */
(function () {
  var P = window.PROJECTS || [], ROOT = "../../";
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var lens = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  var STAMPS = {
    "hemingways-in-town": ["$5,000+", "raised · 2026"], "stolen": ["Highest rating", "two film contests"],
    "wolf-mansion": ["1st in Iowa", "DECA · 2025"], "ffa-mystery": ["70 guests", "$1,000+ raised"], "murder-mystery": ["Case closed", "all 50 guests · 2024"]
  };
  function pages(p) {
    var imgs = (p.slides || []).filter(function (s) { return s.src; });
    return imgs.map(function (s, k) {
      var a = (s.alt || "").split(":")[0];
      return { src: ROOT + s.src, alt: s.alt || "", label: s.label || (k === 0 ? "The collage" : (a.length > 26 ? "Page " + (k + 1) : a)), wide: (s.aspect || "").startsWith("16") };
    });
  }
  function embed(p) { var s = (p.slides || [])[0]; return s && s.embed ? s : null; }
  var nice = function (t) { return esc(String(t || "").replace(/©/g, "©")); };

  /* magnifier (reuses the live site's .lb styles) */
  document.body.insertAdjacentHTML("beforeend",
    '<div class="lb" id="lb" role="dialog" aria-modal="true" aria-labelledby="lb-label" hidden><div class="lb-top"><span class="lb-label" id="lb-label"></span><span class="lb-count" id="lb-count"></span><span class="sp"></span>' +
    '<button class="lb-btn" type="button" id="lb-zoom" aria-label="Magnify">' + lens + '</button><button class="lb-btn" type="button" id="lb-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
    '<div class="lb-stage" id="lb-stage"><img id="lb-img" alt=""></div>' +
    '<button class="lb-btn lb-side prev" type="button" id="lb-prev" aria-label="Previous page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>' +
    '<button class="lb-btn lb-side next" type="button" id="lb-next" aria-label="Next page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>' +
    '<div class="lb-foot"><span id="lb-alt"></span><small>Click the page to magnify · ← → to flip · Esc to close</small></div></div>' +
    '<div class="story" id="story" role="dialog" aria-modal="true" aria-labelledby="story-h" hidden><div class="story-card"><button class="lb-btn story-x" type="button" aria-label="Close">✕</button><div id="story-body"></div></div></div>');
  var lb = document.getElementById("lb"), img = document.getElementById("lb-img"), stage = document.getElementById("lb-stage"), zoomBtn = document.getElementById("lb-zoom");
  var items = [], at = 0, opener = null, zoomed = false;
  function setImg(k) {
    at = (k + items.length) % items.length; var it = items[at]; unzoom();
    img.src = it.src; img.alt = it.alt;
    document.getElementById("lb-label").textContent = it.label;
    document.getElementById("lb-count").textContent = "Page " + (at + 1) + " of " + items.length;
    document.getElementById("lb-alt").textContent = it.alt;
  }
  function openLb(list, k, from) { items = list; opener = from; lb.hidden = false; lb.classList.add("open"); document.body.style.overflow = "hidden"; setImg(k); document.getElementById("lb-close").focus(); }
  function closeLb() { lb.classList.remove("open"); lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  function zoomAt(rx, ry) {
    var w = img.getBoundingClientRect().width; zoomed = true; lb.classList.add("zoomed");
    img.style.width = Math.max(w * 2.4, Math.min(img.naturalWidth, w * 3)) + "px";
    requestAnimationFrame(function () { stage.scrollLeft = rx * img.offsetWidth - stage.clientWidth / 2 + img.offsetLeft; stage.scrollTop = ry * img.offsetHeight - stage.clientHeight / 2 + img.offsetTop; });
  }
  function unzoom() { zoomed = false; lb.classList.remove("zoomed"); img.style.width = ""; }
  stage.addEventListener("click", function (e) {
    if (e.target !== img) { if (!zoomed) closeLb(); return; }
    if (zoomed) return unzoom();
    var r = img.getBoundingClientRect(); zoomAt((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });
  zoomBtn.onclick = function () { zoomed ? unzoom() : zoomAt(.5, .2); };
  document.getElementById("lb-close").onclick = closeLb;
  document.getElementById("lb-prev").onclick = function () { setImg(at - 1); };
  document.getElementById("lb-next").onclick = function () { setImg(at + 1); };

  /* full story panel */
  var story = document.getElementById("story");
  function storyHtml(p) {
    var dl = [["Role", p.role], ["Client", p.client], ["Tools", (p.tools || []).join(", ")], ["Skills", (p.skills || []).join(", ")]].filter(function (r) { return r[1]; })
      .map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("");
    return '<div class="k">Case summary · ' + esc(p.category) + ' · ' + esc(p.year) + '</div><h2 id="story-h">' + nice(p.title) + '</h2>' +
      [].concat(p.blurb || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + '<dl class="dl">' + dl + '</dl>' +
      ((p.results || []).length ? '<ol class="exhibits">' + p.results.map(function (r) { return "<li><span>" + esc(r) + "</span></li>"; }).join("") + "</ol>" : "");
  }
  function openStory(p, from) { opener = from; document.getElementById("story-body").innerHTML = storyHtml(p); story.hidden = false; document.body.style.overflow = "hidden"; story.querySelector(".story-x").focus(); }
  function closeStory() { story.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  story.querySelector(".story-x").onclick = closeStory;
  story.addEventListener("click", function (e) { if (e.target === story) closeStory(); });

  document.addEventListener("keydown", function (e) {
    if (!story.hidden && e.key === "Escape") return closeStory();
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") zoomed ? unzoom() : closeLb();
    else if (e.key === "ArrowRight" && !zoomed) setImg(at + 1);
    else if (e.key === "ArrowLeft" && !zoomed) setImg(at - 1);
  });

  /* tabs + routing */
  var season = document.getElementById("season"), box = document.getElementById("case"), current = 0;
  season.innerHTML = P.map(function (p, i) {
    return '<button type="button" role="tab" aria-selected="false" data-i="' + i + '"><span class="n">No. ' + String(i + 1).padStart(2, "0") + '</span><span class="t">' + esc(p.tabTitle || p.title.replace(/©/g, "").split(":").pop().trim()) + '</span></button>';
  }).join("");
  season.addEventListener("click", function (e) { var b = e.target.closest("button[data-i]"); if (b) show(+b.dataset.i, true); });
  var api = { esc: esc, nice: nice, lens: lens, pages: pages, embed: embed, stamp: function (p) { return STAMPS[p.id]; },
    magnify: openLb, story: openStory, root: ROOT, go: function (i) { show((i + P.length) % P.length, true); }, count: P.length };
  function show(i, user) {
    current = i;
    [].forEach.call(season.children, function (b, k) { b.setAttribute("aria-selected", k === i ? "true" : "false"); });
    box.innerHTML = ""; window.renderCase(P[i], i, api, box);
    if (user) history.replaceState(null, "", "#" + P[i].id);
  }
  var k = P.findIndex(function (p) { return p.id === location.hash.slice(1); });
  show(k < 0 ? 0 : k, false);
})();
