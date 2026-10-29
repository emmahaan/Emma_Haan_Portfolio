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

  applyConfig();
  initHeader();
  initMobileMenu();
  initReveal();
  initSectionNav();
  initCopy();
  initContactForm();
})();
