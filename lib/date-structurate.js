// Date structurate (schema.org), ca Google să înțeleagă cine ești și unde e cabinetul.

export function dateStructurate(site, pagina) {
  const abs = (cale) => new URL(cale, site.url).href;

  const persoana = {
    "@type": "Person",
    "@id": abs("/#alexandra"),
    name: site.nume,
    jobTitle: site.titlu,
    telephone: site.telefonLink,
    email: site.email,
    url: abs("/despre-mine/"),
    image: abs("/assets/imagini/alexandra-pisaru.jpg"),
    sameAs: [site.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universitatea Spiru Haret" },
  };

  const adresa = {
    "@type": "PostalAddress",
    streetAddress: site.strada,
    addressLocality: site.oras,
    addressRegion: "Sector 1",
    addressCountry: "RO",
  };
  if (site.codPostal) adresa.postalCode = site.codPostal;

  const cabinet = {
    "@type": "MedicalBusiness",
    "@id": abs("/#cabinet"),
    name: `${site.nume}, psiholog clinician și psihoterapeut`,
    description: "Psihoterapie și consiliere pentru adulți, cupluri, familii și adolescenți de la 12 ani, în cabinet și online.",
    url: abs("/"),
    image: abs("/assets/imagini/previzualizare.jpg"),
    logo: abs("/assets/imagini/logo-complet.png"),
    telephone: site.telefonLink,
    email: site.email,
    priceRange: "230 - 280 lei",
    currenciesAccepted: "RON",
    paymentAccepted: "Numerar, transfer bancar",
    address: adresa,
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    }],
    availableLanguage: "ro",
    founder: { "@id": abs("/#alexandra") },
  };

  const grafic = [cabinet, persoana];

  if (pagina.articol) {
    grafic.push({
      "@type": "BlogPosting",
      headline: pagina.title,
      description: pagina.description,
      datePublished: new Date(pagina.date).toISOString().slice(0, 10),
      inLanguage: "ro",
      mainEntityOfPage: abs(pagina.url),
      image: abs(pagina.imagine || "/assets/imagini/previzualizare.jpg"),
      author: { "@id": abs("/#alexandra") },
    });
  }

  // „<” e scris sigur, ca textul să nu poată închide eticheta <script>.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": grafic }).replace(/</g, "\\u003c");
}
