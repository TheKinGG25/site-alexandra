// Verifică textele din site înainte de publicare.
// Rulare: npm run build && npm run verifica

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const interzise = [
  { regula: /[\u2014\u2013]/g, mesaj: "linie de pauză lungă (folosește cratima -)" },
  { regula: /supervizare/gi, mesaj: "cuvântul „supervizare”" },
  { regula: /pasul\.ro/gi, mesaj: "Pasul.ro" },
  { regula: /instagram/gi, mesaj: "Instagram" },
  { regula: /newsletter/gi, mesaj: "newsletter" },
];
const avertismente = [{ regula: /DE COMPLETAT/g, mesaj: "text de completat" }];

function fisiere(dir) {
  return readdirSync(dir).flatMap((f) => {
    const cale = join(dir, f);
    return statSync(cale).isDirectory() ? fisiere(cale) : /\.(html|xml|txt)$/.test(f) ? [cale] : [];
  });
}

let erori = 0;
for (const f of fisiere("_site")) {
  const text = readFileSync(f, "utf8");
  for (const { regula, mesaj } of interzise) {
    const n = (text.match(regula) || []).length;
    if (n) { erori++; console.log(`EROARE  ${f}: ${mesaj} (${n})`); }
  }
  for (const { regula, mesaj } of avertismente) {
    const n = (text.match(regula) || []).length;
    if (n) console.log(`ATENȚIE ${f}: ${mesaj} (${n})`);
  }
}
console.log(erori ? `\n${erori} probleme găsite.` : "\nTotul e în regulă.");
process.exit(erori ? 1 : 0);
