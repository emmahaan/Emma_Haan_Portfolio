/* ==========================================================================
   Shared behaviour for every page. Kept deliberately light:
   - fill in contact details from config.js
   - header divider on scroll, mobile menu
   - gentle fade-in of sections as they scroll into view
   - resume jump-link highlighting, copy-email, contact form
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SITE = window.SITE || {};

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---- Site config → page ---------------------------------------------- */
  function applyConfig() {
    $$("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      var value = SITE[key];
      if (!value) return;
      if (el.tagName === "A") {
        el.setAttribute("href", key === "email" ? "mailto:" + value : value);
        if (el.hasAttribute("data-site-text")) {
          el.textContent = key === "linkedin" ? SITE.linkedinLabel || value : value;
        }
      } else {
        el.textContent = value;
      }
    });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---- Header ------------------------------------------------------------ */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    function update() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initMobileMenu() {
    var toggle = $(".menu-toggle");
    var menu = $("#mobile-menu");
    if (!toggle || !menu) return;
    menu.inert = true;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      menu.inert = !open;
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("is-open") && !menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) setOpen(false); });
  }

  /* ---- Fade-in on scroll -------------------------------------------------- */
  function initReveal() {
    var targets = $$("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Resume jump links: highlight the section in view ------------------ */
  function initSectionNav() {
    var nav = $("[data-section-nav]");
    if (!nav || !("IntersectionObserver" in window)) return;
    var links = $$('a[href^="#"]', nav);
    var byId = {};
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) byId[sec.id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        var link = byId[entry.target.id];
        if (!link) return;
        link.classList.add("is-active");
        var list = link.closest("ul");
        if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: link.offsetLeft - 8, behavior: "smooth" });
      });
    }, { rootMargin: "-30% 0px -65% 0px" });
    Object.keys(byId).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---- Toast + copy email ---------------------------------------------- */
  var toastTimer;
  function toast(message) {
    var el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(function () { el.classList.add("is-visible"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  function initCopy() {
    $$("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = SITE[btn.getAttribute("data-copy")] || "";
        copyText(value).then(
          function () { toast("Email copied to clipboard"); },
          function () { toast(value); }
        );
      });
    });
  }

  /* ---- Contact form → delivers the message to Emma's inbox ---------------
     Uses FormSubmit (formsubmit.co), a free form-to-email service, so the page
     can send mail without a server. */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var status = $("[data-form-status]", form);
    var button = $("button[type=submit]", form);
    var idleText = status ? status.textContent : "";

    function say(msg, isError) {
      if (!status) return;
      status.textContent = msg;
      status.style.color = isError ? "#b3261e" : "";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var d = new FormData(form);
      if (d.get("_honey")) return; // spam trap
      var name = d.get("name") || "your portfolio";
      var payload = {
        name: d.get("name"),
        company: d.get("company") || "(not given)",
        email: d.get("email"),
        topic: d.get("topic"),
        message: d.get("message"),
        _subject: d.get("topic") + " \u2014 from " + name,
        _replyto: d.get("email"),
        _template: "table",
        _captcha: "false"
      };
      button.disabled = true;
      say("Sending\u2026", false);
      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(SITE.email), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res && (res.success === true || res.success === "true")) {
          form.reset();
          say("Thank you! Your message was sent. I'll reply soon.", false);
          toast("Message sent");
          fireworks(button);
        } else {
          throw new Error((res && res.message) || "send failed");
        }
      }).catch(function () {
        say("Sorry, that didn't send. Please email me directly at " + SITE.email + ".", true);
      }).then(function () {
        button.disabled = false;
        setTimeout(function () { if (status && status.textContent.indexOf("Thank you") === 0) say(idleText, false); }, 8000);
      });
    });
  }

  /* ---- Corner swirls (decoration in the top corners of each page) -------- */
  var SWIRL = "<svg viewBox='0 0 220 150' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true' focusable='false'><path class='sw-a' pathLength='1' d='M-6 24 C 26 6, 58 14, 47.3 67.0 L47.3 67.0 L45.2 73.9 L44.3 80.9 L44.5 88.0 L45.9 94.8 L48.2 101.3 L51.6 107.2 L55.8 112.4 L60.8 116.9 L66.3 120.5 L72.3 123.1 L78.5 124.6 L84.8 125.2 L91.1 124.7 L97.2 123.3 L102.8 120.9 L108.0 117.7 L112.5 113.7 L116.2 109.2 L119.2 104.1 L121.2 98.8 L122.4 93.2 L122.6 87.6 L122.0 82.1 L120.5 76.8 L118.2 71.9 L115.1 67.6 L111.5 63.8 L107.4 60.7 L102.8 58.3 L98.1 56.7 L93.2 56.0 L88.3 56.0 L83.6 56.8 L79.1 58.3 L75.0 60.5 L71.4 63.3 L68.3 66.6 L65.8 70.2 L64.0 74.2 L62.9 78.3 L62.4 82.5 L62.7 86.6 L63.5 90.6 L65.0 94.3 L67.0 97.6 L69.5 100.5 L72.4 102.9 L75.6 104.8 L78.9 106.2 L82.4 106.9 L85.9 107.1 L89.2 106.7 L92.4 105.7 L95.3 104.4 L97.9 102.5 L100.2 100.4 L101.9 98.0 L103.3 95.3 L104.1 92.6 L104.5 89.8 L104.5 87.1 L104.0 84.5 L103.1 82.1 L101.8 79.9 L100.3 78.0 L98.5 76.5 L96.6 75.3 L94.5 74.5 L92.4 74.0 L90.3 73.9 L88.4 74.2 L86.5 74.7 L84.9 75.5 L83.5 76.6 L82.3 77.8 L81.4 79.2 L80.7 80.6 L80.4 82.0 L80.3 83.5 L80.4 84.8 L80.8 86.0 L81.4 87.1 L82.1 88.0 L82.9 88.7 L83.7 89.2 L84.6 89.5 L85.5 89.6 L86.3 89.6 L87.0 89.3 L87.6 89.0'/><path class='sw-b' pathLength='1' d='M159.2 9.8 L155.0 12.2 L151.4 15.3 L148.5 19.0 L146.4 23.1 L145.1 27.4 L144.7 31.9 L145.1 36.2 L146.3 40.4 L148.3 44.1 L150.8 47.4 L153.9 50.1 L157.4 52.1 L161.1 53.4 L164.9 54.0 L168.7 53.8 L172.3 52.9 L175.6 51.4 L178.5 49.4 L180.9 46.8 L182.8 44.0 L184.0 40.9 L184.6 37.7 L184.6 34.5 L184.0 31.4 L182.9 28.6 L181.3 26.1 L179.3 24.0 L176.9 22.4 L174.4 21.3 L171.8 20.7 L169.2 20.6 L166.7 21.0 L164.4 21.8 L162.4 23.1 L160.7 24.6 L159.3 26.4 L158.4 28.4 L157.9 30.4 L157.8 32.4 L158.1 34.3 L158.7 36.1 L159.6 37.7 L160.8 38.9 L162.1 39.9 L163.6 40.6 L165.0 40.9 L166.5 41.0 L167.8 40.7 L169.0 40.3 L170.0 39.6 L170.8 38.8 L171.4 37.9 L171.8 36.9 L171.9 36.0 L171.8 35.1 L171.6 34.3 L171.2 33.7 L170.7 33.2 L170.1 32.9 L169.6 32.8'/><circle class='sw-dot' cx='132' cy='14' r='3.2'/><circle class='sw-dot sw-dot-2' cx='196' cy='84' r='2.4'/><circle class='sw-dot sw-dot-3' cx='40' cy='128' r='2.8'/><path class='sw-star' d='M150 100 l2.2 5.8 5.8 2.2 -5.8 2.2 -2.2 5.8 -2.2 -5.8 -5.8 -2.2 5.8 -2.2z'/></svg>";
  function initSwirls() {
    var first = $("main > section:first-child");
    if (!first) return;
    var wrap = document.createElement("div");
    wrap.className = "corner-swirls";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<div class="swirl swirl-l">' + SWIRL + '</div><div class="swirl swirl-r">' + SWIRL + "</div>";
    first.insertBefore(wrap, first.firstChild);
  }

  /* ---- Fireworks: mini bursts that pop out of a button -------------------- */
  var FX_COLORS = ["#5a66d6", "#959ff0", "#f5b942", "#ff7aa8", "#5fd3b0", "#ffffff", "#b9c0f7"];
  var fxLayer;
  function fxHost() {
    if (!fxLayer) {
      fxLayer = document.createElement("div");
      fxLayer.className = "fx-layer";
      fxLayer.setAttribute("aria-hidden", "true");
      document.body.appendChild(fxLayer);
    }
    return fxLayer;
  }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  function popAt(x, y, count) {
    var host = fxHost();
    var ring = document.createElement("span");
    var rc = pick(FX_COLORS.slice(0, 5));
    ring.className = "fx-ring";
    ring.style.cssText = "left:" + (x - 6) + "px;top:" + (y - 6) + "px;width:12px;height:12px;border-color:" + rc;
    host.appendChild(ring);
    ring.animate(
      [{ transform: "scale(0.4)", opacity: 0.9 }, { transform: "scale(4.2)", opacity: 0 }],
      { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    ).onfinish = function () { ring.remove(); };

    for (var i = 0; i < count; i++) {
      var bit = document.createElement("span");
      var size = 4 + Math.random() * 5;
      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      var dist = 34 + Math.random() * 46;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      bit.className = "fx-bit";
      bit.style.cssText = "left:" + (x - size / 2) + "px;top:" + (y - size / 2) + "px;width:" + size + "px;height:" + size +
        "px;background:" + pick(FX_COLORS) + ";box-shadow:0 0 6px " + rc + "80";
      host.appendChild(bit);
      bit.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: "translate(" + dx * 0.8 + "px," + dy * 0.8 + "px) scale(1)", opacity: 1, offset: 0.55 },
          { transform: "translate(" + dx + "px," + (dy + 22) + "px) scale(0.2)", opacity: 0 }
        ],
        { duration: 750 + Math.random() * 350, easing: "cubic-bezier(0.16, 0.84, 0.3, 1)" }
      ).onfinish = (function (b) { return function () { b.remove(); }; })(bit);
    }
  }

  function fireworks(el) {
    if (reduceMotion || !el.animate) return;
    var r = el.getBoundingClientRect();
    [[0, 0.3, 0.45], [140, 0.72, 0.35], [280, 0.5, 0.6], [430, 0.2, 0.55], [540, 0.85, 0.5]].forEach(function (w) {
      setTimeout(function () { popAt(r.left + r.width * w[1], r.top + r.height * w[2], 14); }, w[0]);
    });
    if (el.animate) el.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
      { duration: 380, easing: "ease-out" }
    );
  }

  /* ---- Page transitions + fireworks on the main buttons --------------------
     Followed links fade the page out first. Blue/white buttons that open
     another page set off the fireworks, then go. */
  function initTransitions() {
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.documentElement.classList.remove("is-leaving");
    });
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      var url;
      try { url = new URL(a.href, window.location.href); } catch (err) { return; }
      if (url.protocol !== window.location.protocol || url.host !== window.location.host) return;
      var path = url.pathname;
      if (!/(\.html?|\/)$/.test(path)) return;
      if (path === window.location.pathname && url.hash) return; // same-page jump
      if (reduceMotion) return;
      e.preventDefault();
      var showy = a.classList.contains("btn") && !a.classList.contains("btn-outline") && !a.classList.contains("header-cta");
      var wait = 200;
      if (showy) { fireworks(a); wait = 900; }
      setTimeout(function () { document.documentElement.classList.add("is-leaving"); }, Math.max(0, wait - 230));
      setTimeout(function () { window.location.href = url.href; }, wait);
    });
  }

  /* ---- About page: footprint trail, counters, card tilt ------------------- */
  var PRINT = '<svg viewBox="0 0 20 40" aria-hidden="true"><path d="M10 1C4.4 1 1.6 5.6 1.6 11.2c0 4.2 1.8 6.6 3.2 9.2h10.4c1.4-2.6 3.2-5 3.2-9.2C18.4 5.6 15.6 1 10 1z"/><path d="M5 26.5c0-1.7 2.2-2.8 5-2.8s5 1.1 5 2.8v4.8c0 3.2-2.2 5.2-5 5.2s-5-2-5-5.2z"/></svg>';

  function initTrail() {
    var main = $("main");
    if (!main || !document.body.classList.contains("page-work")) return;   // footprints live on the Work page
    var trail = document.createElement("div");
    trail.className = "trail";
    trail.setAttribute("aria-hidden", "true");
    main.appendChild(trail);
    var prints = [];

    // small seeded random generator, so the trail looks the same every visit
    function rng(seed) {
      return function () {
        seed = (seed + 0x6D2B79F5) | 0;
        var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function build() {
      trail.innerHTML = "";
      prints = [];
      // find the blocks of page content, so the trail can keep to the empty space on the left
      var mainTop = main.getBoundingClientRect().top;
      var blockers = [];
      $$(".page-title, .tabs-scroller, .project-header, .viewer, .project-body, .project-pager").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (!r.width) return;
        blockers.push({ top: r.top - mainTop, bottom: r.bottom - mainTop, left: r.left });
      });
      function limitFor(y0, y1) {
        var lim = 320;
        blockers.forEach(function (b) { if (b.bottom > y0 && b.top < y1) lim = Math.min(lim, b.left); });
        return lim - 10;                               // always leave a gap beside the content
      }
      var H = main.offsetHeight, rand = rng(11), y = 220;

      while (y < H - 300) {
        var D = 150 + rand() * 220;                 // height of this arc
        var scale = 0.65 + rand() * 0.6;            // each arc has its own print size
        var spacing = (38 + rand() * 48) * scale;   // ...and its own walking pace
        var t0 = -Math.PI / 2 + (rand() < 0.35 ? rand() * 0.55 : 0);
        var t1 = Math.PI / 2 - (rand() < 0.35 ? rand() * 0.55 : 0);
        var reverse = rand() < 0.4;
        var gap = 130 + rand() * 360;
        var x0 = 8 + 14 * scale;                   // arcs start near the screen edge
        var bulge = Math.min(D * 0.45, limitFor(y - 10, y + D + 10) - x0 - 18 * scale);
        if (bulge < 5) { y += 60; continue; }      // no room beside this part of the page: try further down
        var cy = y + D / 2;
        var pts = [];
        for (var k = 0; k <= 90; k++) {
          var t = t0 + ((t1 - t0) * k) / 90;
          pts.push([x0 + bulge * Math.cos(t), cy + (D / 2) * Math.sin(t)]);
        }
        if (reverse) pts.reverse();                 // some arcs walk upward
        var acc = 0, next = 0, foot = 0;
        for (var s = 0; s < pts.length - 1; s++) {
          var a = pts[s], b = pts[s + 1];
          var dx = b[0] - a[0], dy = b[1] - a[1], seg = Math.sqrt(dx * dx + dy * dy);
          while (acc + seg >= next) {
            var f = (next - acc) / seg;
            var nx = -dy / seg, ny = dx / seg, side = foot ? 1 : -1;
            var px = a[0] + dx * f + nx * side * 5 * scale;
            var py = a[1] + dy * f + ny * side * 5 * scale;
            var ang = Math.atan2(dx, -dy) * 57.2958;
            var el = document.createElement("span");
            el.innerHTML = PRINT;
            var svg = el.firstChild;
            svg.setAttribute("class", "print");
            svg.style.cssText = "left:" + px.toFixed(1) + "px;top:" + py.toFixed(1) + "px;width:" + (23 * scale).toFixed(1) + "px;height:" + (46 * scale).toFixed(1) + "px";
            svg.style.setProperty("--t", "translate(-50%, -50%) rotate(" + ang.toFixed(1) + "deg)" + (foot ? "" : " scaleX(-1)"));
            trail.appendChild(svg);
            prints.push({ el: svg, y: py });
            foot ^= 1;
            next += spacing * (0.85 + rand() * 0.3);
          }
          acc += seg;
        }
        y += D + gap;
      }
      update();
    }
    function update() {
      var top = main.getBoundingClientRect().top;
      var reach = window.innerHeight * 0.75 - top;    // how far down the page has been "walked"
      prints.forEach(function (p) { p.el.classList.toggle("on", p.y < reach); });
    }
    build();
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; update(); });
    }, { passive: true });
    var timer;
    function later() { clearTimeout(timer); timer = setTimeout(build, 150); }
    window.addEventListener("resize", later);
    window.addEventListener("load", later);
    if ("ResizeObserver" in window) new ResizeObserver(later).observe(main);   // project changed, so the page got taller or shorter
  }

  /* ---- Glowing line that circles a box (the "Let's connect" panel) ---------- */
  function initTrace() {
    if (reduceMotion) return;
    $$("[data-trace]").forEach(function (box) {
      var NS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "trace");
      svg.setAttribute("aria-hidden", "true");
      var rects = [];
      // a bright head with a tail that gets fainter and longer behind it
      [[3, 1], [8, 0.75], [16, 0.55], [26, 0.4], [40, 0.28]].forEach(function (s) {
        var r = document.createElementNS(NS, "rect");
        r.setAttribute("pathLength", "100");
        r.setAttribute("fill", "none");
        r.setAttribute("stroke", "#fff");
        r.setAttribute("stroke-width", "3.5");
        r.setAttribute("stroke-linecap", "round");
        r.style.opacity = s[1];
        r.style.setProperty("--l", s[0]);
        r.style.setProperty("--e", s[0] - 100);
        r.style.strokeDasharray = s[0] + " " + (100 - s[0]);
        svg.appendChild(r);
        rects.push(r);
      });
      box.appendChild(svg);
      function size() {
        var w = box.offsetWidth, h = box.offsetHeight;
        var rad = parseFloat(getComputedStyle(box).borderTopLeftRadius) || 22;
        svg.setAttribute("viewBox", "0 0 " + w + " " + h);
        rects.forEach(function (r) {
          r.setAttribute("x", 1.5); r.setAttribute("y", 1.5);
          r.setAttribute("width", w - 3); r.setAttribute("height", h - 3);
          r.setAttribute("rx", Math.max(0, rad - 1.5));
        });
      }
      size();
      if ("ResizeObserver" in window) new ResizeObserver(size).observe(box); else window.addEventListener("resize", size);
    });
  }

  function initCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;
    function fmt(el, v) {
      el.textContent = (el.getAttribute("data-prefix") || "") + Math.round(v).toLocaleString("en-US") + (el.getAttribute("data-suffix") || "");
    }
    if (reduceMotion || !("IntersectionObserver" in window)) return;   // the final numbers are already in the HTML
    nums.forEach(function (el) { fmt(el, 0); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target, end = +el.getAttribute("data-count"), t0 = null;
        function frame(t) {
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / 1400);
          fmt(el, end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function initTilt() {
    var cards = $$(".page-about .strength-grid .card");
    if (!cards.length || reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    cards.forEach(function (card) {
      card.addEventListener("pointerenter", function () { if (card.classList.contains("is-in")) card.classList.add("tilt-on"); });
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--rx", (-py * 8).toFixed(2) + "deg");
        card.style.setProperty("--ry", (px * 10).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  applyConfig();
  initSwirls();
  initTrail();
  initTrace();
  initCounters();
  initTilt();
  initTransitions();
  initHeader();
  initMobileMenu();
  initReveal();
  initSectionNav();
  initCopy();
  initContactForm();
})();
