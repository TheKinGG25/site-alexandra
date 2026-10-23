// Meniul de pe telefon, acordul pentru cookie-uri și filtrele de articole.

(function () {
  // ---------- Meniu ----------
  var buton = document.querySelector(".meniu-buton");
  var meniu = document.getElementById("meniu");
  if (buton && meniu) {
    var inchide = function () {
      buton.setAttribute("aria-expanded", "false");
      meniu.classList.remove("deschis");
    };
    buton.addEventListener("click", function () {
      var deschis = buton.getAttribute("aria-expanded") === "true";
      buton.setAttribute("aria-expanded", String(!deschis));
      meniu.classList.toggle("deschis", !deschis);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && meniu.classList.contains("deschis")) { inchide(); buton.focus(); }
    });
    window.matchMedia("(min-width: 62rem)").addEventListener("change", inchide);
  }

  // ---------- Cookie-uri și Google Analytics ----------
  // Google Analytics se încarcă DOAR după ce vizitatorul apasă „Accept”.
  var banner = document.getElementById("cookies");
  var CHEIE = "acord-cookies";

  function citeste() { try { return localStorage.getItem(CHEIE); } catch (e) { return null; } }
  function scrie(v) { try { localStorage.setItem(CHEIE, v); } catch (e) {} }

  function pornesteAnalytics(id) {
    if (window.gtag) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
  }

  function stergeCookieAnalytics() {
    var domenii = [location.hostname, "." + location.hostname.replace(/^www\./, "")];
    document.cookie.split(";").forEach(function (c) {
      var nume = c.split("=")[0].trim();
      if (nume === "_ga" || nume.indexOf("_ga_") === 0 || nume === "_gid") {
        domenii.forEach(function (d) {
          document.cookie = nume + "=; Max-Age=0; path=/; domain=" + d;
        });
        document.cookie = nume + "=; Max-Age=0; path=/";
      }
    });
  }

  if (banner) {
    var id = banner.getAttribute("data-ga");
    var alegere = citeste();

    if (alegere === "accept") pornesteAnalytics(id);
    else if (alegere !== "refuz") banner.hidden = false;

    banner.addEventListener("click", function (e) {
      var tinta = e.target.closest("[data-cookies]");
      if (!tinta) return;
      var valoare = tinta.getAttribute("data-cookies");
      var anterior = citeste();
      scrie(valoare);
      banner.hidden = true;
      if (valoare === "accept") pornesteAnalytics(id);
      else if (anterior === "accept") { stergeCookieAnalytics(); location.reload(); }
    });

    document.querySelectorAll("[data-setari-cookies]").forEach(function (b) {
      b.addEventListener("click", function () {
        banner.hidden = false;
        var primul = banner.querySelector("button");
        if (primul) primul.focus();
      });
    });
  }

  // ---------- Filtre pe pagina de articole ----------
  var filtre = document.querySelector(".filtre");
  if (filtre) {
    var carduri = document.querySelectorAll("[data-categorie]");
    filtre.hidden = false;
    filtre.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var cat = b.getAttribute("data-filtru");
      filtre.querySelectorAll("button").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      carduri.forEach(function (c) {
        c.hidden = cat !== "toate" && c.getAttribute("data-categorie") !== cat;
      });
    });
  }
})();
