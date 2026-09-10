/* ==========================================================================
   AZZHAB PERFUMES — interface behaviour
   ========================================================================== */
(function () {
  var cfg = window.AZZHAB_CONFIG || {};
  var doc = document;

  /* ---------- header: transparent over a dark hero, solid on scroll ---- */
  function header() {
    var el = doc.querySelector(".site-header");
    if (!el) return;
    var over = el.hasAttribute("data-over-hero");
    function sync() {
      var past = window.scrollY > 40;
      el.classList.toggle("site-header--solid", past || !over);
      el.classList.toggle("site-header--over", over && !past);
    }
    sync();
    window.addEventListener("scroll", sync, { passive: true });
  }

  /* ---------- mobile menu ---------------------------------------------- */
  function menu() {
    var burger = doc.querySelector(".burger");
    var panel = doc.querySelector(".menu");
    if (!burger || !panel) return;
    function set(open) {
      doc.documentElement.classList.toggle("is-menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      panel.setAttribute("aria-hidden", open ? "false" : "true");
    }
    set(false);
    burger.addEventListener("click", function () {
      set(!doc.documentElement.classList.contains("is-menu-open"));
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { set(false); });
    });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* ---------- mark the current page in the navigation ------------------ */
  function currentNav() {
    var page = location.pathname.split("/").pop() || "index.html";
    doc.querySelectorAll(".nav a, .menu__list a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === page) a.setAttribute("aria-current", "page");
    });
  }

  /* ---------- scroll reveal -------------------------------------------- */
  function reveal() {
    var items = doc.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach(function (el, i) {
      var group = el.parentElement;
      var index = group ? Array.prototype.indexOf.call(group.children, el) : i;
      el.style.setProperty("--d", Math.min(index, 6) * 80 + "ms");
      io.observe(el);
    });
  }

  /* ---------- forms ----------------------------------------------------- */
  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (typeof value !== "string" || !value.trim()) return;
      if (data[key] === undefined) data[key] = value.trim();
      else if (Array.isArray(data[key])) data[key].push(value.trim());
      else data[key] = [data[key], value.trim()];
    });
    return data;
  }

  function readable(data) {
    return Object.keys(data).map(function (k) {
      var v = Array.isArray(data[k]) ? data[k].join(", ") : data[k];
      return k + ": " + v;
    }).join("\n");
  }

  function validate(form) {
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (input) {
      var field = input.closest(".field") || input.closest(".form__section");
      var good = input.type === "checkbox" ? input.checked : input.checkValidity() && input.value.trim() !== "";
      if (field) field.classList.toggle("is-invalid", !good);
      if (!good && ok) { ok = false; input.focus(); }
    });
    return ok;
  }

  function forms() {
    doc.querySelectorAll("form[data-form]").forEach(function (form) {
      var status = form.querySelector(".form-status");
      var button = form.querySelector("[type=submit]");

      form.addEventListener("input", function (e) {
        var field = e.target.closest(".field");
        if (field) field.classList.remove("is-invalid");
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var T = window.AZZHAB_I18N ? window.AZZHAB_I18N.t : function () { return ""; };
        if (status) status.className = "form-status";

        if (!validate(form)) {
          if (status) { status.className = "form-status is-err"; status.textContent = T("form.invalid"); }
          return;
        }

        var payload = collect(form);
        payload._form = form.getAttribute("data-form");
        payload._page = location.pathname.split("/").pop() || "index.html";
        payload._language = window.AZZHAB_I18N ? window.AZZHAB_I18N.lang : "en";
        payload._submitted = new Date().toISOString();

        function done(okState) {
          if (!status) return;
          status.className = "form-status " + (okState ? "is-ok" : "is-err");
          status.textContent = okState ? T("form.ok") : T("form.error");
          status.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        if (!cfg.formEndpoint) {
          var subject = "[" + payload._form + "] " + (payload.company || "New enquiry");
          var to = cfg.emailSales || cfg.email || "";
          window.location.href = "mailto:" + to +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(readable(payload));
          if (status) { status.className = "form-status is-ok"; status.textContent = T("form.mailto"); }
          return;
        }

        if (button) { button.disabled = true; button.dataset.label = button.textContent; button.textContent = T("form.sending"); }
        fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        }).then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          done(true);
        }).catch(function () {
          done(false);
        }).then(function () {
          if (button) { button.disabled = false; button.textContent = button.dataset.label; }
        });
      });
    });
  }

  /* ---------- misc ------------------------------------------------------ */
  function year() {
    doc.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  doc.addEventListener("DOMContentLoaded", function () {
    header(); menu(); currentNav(); reveal(); forms(); year();
  });
})();
