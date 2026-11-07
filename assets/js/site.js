/* Emma Haan — Opening Night: shared behaviour for every page */
(function () {
  document.documentElement.classList.add("js");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* site config (assets/js/config.js): every element with data-site="email" |
     "linkedin" | "resume" | "location" picks up the value set there */
  var SITE = window.SITE || {};
  $$("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site"), v = SITE[key];
    if (!v) return;
    if (el.tagName === "A") {
      el.setAttribute("href", key === "email" ? "mailto:" + v : v);
      if (el.hasAttribute("data-site-text")) el.textContent = key === "linkedin" ? (SITE.linkedinLabel || v) : v;
    } else el.textContent = v;
  });
  if (SITE.email) {
    $$("[data-gmail-compose]").forEach(function (a) { a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(SITE.email); });
    $$("[data-copy]").forEach(function (b) { b.setAttribute("data-copy", SITE.email); });
  }

  /* mobile menu */
  var btn = $(".menu-btn"), menu = $(".mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  }

  /* fade sections in as they scroll into view */
  var targets = $$("[data-reveal]");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* toast + copy to clipboard */
  var toastEl;
  window.odToast = function (msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("on");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("on"); }, 2200);
  };
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-copy");
      (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(
        function () { window.odToast("Email copied"); },
        function () { window.odToast(v); });
    });
  });
})();
