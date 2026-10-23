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
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: `Atestat de liberă practică în psihologie clinică, cod RUP ${site.codRup}`,
      recognizedBy: { "@type": "Organization", name: "Colegiul Psihologilor din România" },
    },
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
    name: `${site.nume}, ${site.titluScurt}`,
    description: "Psihoterapie pentru adulți, adolescenți, cupluri și familii, în cabinet lângă Piața Victoriei și online.",
    url: abs("/"),
    image: abs("/assets/imagini/previzualizare.png"),
    logo: abs("/assets/imagini/logo.svg"),
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
      image: abs(pagina.imagine || "/assets/imagini/previzualizare.png"),
      author: { "@id": abs("/#alexandra") },
    });
  }

  // „<” e scris sigur, ca textul să nu poată închide eticheta <script>.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": grafic }).replace(/</g, "\\u003c");
}
