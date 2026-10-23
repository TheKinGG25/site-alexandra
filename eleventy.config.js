// Configurația generatorului de site (Eleventy).
// Nu e nevoie să modifici acest fișier pentru articole, prețuri sau texte.

import { dateStructurate } from "./lib/date-structurate.js";

const luni = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  // Articolele, de la cel mai nou la cel mai vechi.
  eleventyConfig.addCollection("articole", (api) =>
    api.getFilteredByGlob("src/articole/*.md").sort((a, b) => b.date - a.date)
  );

  // „12 octombrie 2026”
  eleventyConfig.addFilter("dataRo", (data) => {
    const d = new Date(data);
    return `${d.getUTCDate()} ${luni[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  // „2026-10-12”, pentru sitemap și datele structurate
  eleventyConfig.addFilter("dataIso", (data) => new Date(data).toISOString().slice(0, 10));

  // Timpul de citit, calculat automat (aprox. 200 de cuvinte pe minut).
  eleventyConfig.addFilter("timpCitit", (continut) => {
    const text = String(continut || "").replace(/<[^>]+>/g, " ");
    const cuvinte = text.split(/\s+/).filter(Boolean).length;
    const minute = Math.max(1, Math.round(cuvinte / 200));
    return minute === 1 ? "1 minut de citit" : `${minute} minute de citit`;
  });

  // Prețuri: 1300 -> „1.300”
  eleventyConfig.addFilter("pret", (n) =>
    String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );

  eleventyConfig.addShortcode("anCurent", () => String(new Date().getFullYear()));

  eleventyConfig.addFilter("absolut", (cale, baza) => new URL(cale, baza).href);
  // Categoriile care au cel puțin un articol, pentru filtrele din pagina Articole.
  eleventyConfig.addFilter("categoriiUnice", (articole) =>
    [...new Set(articole.map((a) => a.data.categorie).filter(Boolean))]
  );
  eleventyConfig.addFilter("limita", (lista, n) => lista.slice(0, n));
  eleventyConfig.addFilter("dateStructurate", dateStructurate);
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
