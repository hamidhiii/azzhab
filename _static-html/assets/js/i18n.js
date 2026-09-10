/* ==========================================================================
   AZZHAB PERFUMES — bilingual engine (EN / AR)
   Text lives in assets/js/content.en.js + content.ar.js.
   Markup carries keys only:
     data-i18n="path.to.key"        -> textContent
     data-i18n-html="path.to.key"   -> innerHTML (allows <br>, <em>)
     data-i18n-attr="placeholder:path.to.key, aria-label:other.key"
   ========================================================================== */
(function () {
  var STORE = "azzhab-lang";
  var LANGS = ["en", "ar"];
  var cfg = window.AZZHAB_CONFIG || {};
  var fallback = LANGS.indexOf(cfg.defaultLang) > -1 ? cfg.defaultLang : "en";
  var current = fallback;

  function bank(lang) {
    return (window.AZZHAB_CONTENT && window.AZZHAB_CONTENT[lang]) || {};
  }

  function dig(obj, path) {
    var parts = path.split("."), node = obj, i;
    for (i = 0; i < parts.length; i++) {
      if (node == null || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function t(key, lang) {
    var l = lang || current;
    var value = dig(bank(l), key);
    if (value === undefined && l !== "en") value = dig(bank("en"), key);
    if (value === undefined) {
      if (window.console && console.warn) console.warn("[i18n] missing key:", key);
      return "";
    }
    return value;
  }

  function detect() {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (LANGS.indexOf(q) > -1) return q;
    var saved;
    try { saved = localStorage.getItem(STORE); } catch (e) { saved = null; }
    if (LANGS.indexOf(saved) > -1) return saved;
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (nav === "ar") return "ar";
    return fallback;
  }

  function fillConfig(lang) {
    var map = {
      phone: cfg.phone,
      email: cfg.email,
      emailSales: cfg.emailSales || cfg.email,
      company: cfg.company,
      address: lang === "ar" && cfg.addressAr ? cfg.addressAr : cfg.address,
      hours: lang === "ar" && cfg.hoursAr ? cfg.hoursAr : cfg.hours
    };
    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var key = el.getAttribute("data-cfg");
      if (map[key] === undefined) return;
      el.textContent = map[key];
      if (el.tagName === "A") {
        if (key === "phone") el.href = "tel:" + String(map[key]).replace(/[^+\d]/g, "");
        if (key === "email" || key === "emailSales") el.href = "mailto:" + map[key];
        if (key === "address" && cfg.mapUrl) { el.href = cfg.mapUrl; el.target = "_blank"; el.rel = "noopener"; }
      }
    });
    document.querySelectorAll("[data-cfg-href='map']").forEach(function (el) {
      if (cfg.mapUrl) { el.href = cfg.mapUrl; el.target = "_blank"; el.rel = "noopener"; }
      else el.classList.add("hide");
    });
    document.querySelectorAll("[data-cfg-href='whatsapp']").forEach(function (el) {
      if (cfg.whatsapp) el.href = "https://wa.me/" + String(cfg.whatsapp).replace(/[^\d]/g, "");
      else el.classList.add("hide");
    });
  }

  function apply(lang) {
    current = LANGS.indexOf(lang) > -1 ? lang : fallback;
    var root = document.documentElement;
    root.setAttribute("lang", current);
    root.setAttribute("dir", current === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v !== "") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-html"));
      if (v !== "") el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length < 2) return;
        var v = t(bits[1].trim());
        if (v !== "") el.setAttribute(bits[0].trim(), v);
      });
    });

    var meta = document.querySelector('meta[name="description"][data-i18n-meta]');
    if (meta) meta.setAttribute("content", t(meta.getAttribute("data-i18n-meta")));

    document.querySelectorAll("[data-lang-label]").forEach(function (el) {
      el.textContent = current === "ar" ? "English" : "عربي";
    });
    document.querySelectorAll("[data-lang-next]").forEach(function (el) {
      el.textContent = current === "ar" ? "EN" : "AR";
    });

    fillConfig(current);
    try { localStorage.setItem(STORE, current); } catch (e) {}
    document.dispatchEvent(new CustomEvent("azzhab:lang", { detail: { lang: current } }));
  }

  function toggle() { apply(current === "ar" ? "en" : "ar"); }

  window.AZZHAB_I18N = {
    apply: apply,
    toggle: toggle,
    t: t,
    get lang() { return current; }
  };

  document.addEventListener("DOMContentLoaded", function () {
    apply(detect());
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", toggle);
    });
  });
})();
