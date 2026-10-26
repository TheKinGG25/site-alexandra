# Instrucțiuni pentru site

Ghid pas cu pas pentru publicarea și îngrijirea site-ului. Nu ai nevoie să știi să programezi.

## Cuprins

1. [Cum e organizat site-ul](#1-cum-e-organizat-site-ul)
2. [Publicarea gratuită pe Cloudflare Pages](#2-publicarea-gratuită-pe-cloudflare-pages)
3. [Cumpărarea și legarea domeniului](#3-cumpărarea-și-legarea-domeniului)
4. [Interfața de editare (Pages CMS)](#4-interfața-de-editare-pages-cms)
5. [Adăugarea unui articol nou](#5-adăugarea-unui-articol-nou)
6. [Schimbarea unui preț sau a unui text](#6-schimbarea-unui-preț-sau-a-unui-text)
7. [Înlocuirea pozei și a logo-ului](#7-înlocuirea-pozei-și-a-logo-ului)
8. [Google Analytics](#8-google-analytics)
9. [Ce mai e de completat](#9-ce-mai-e-de-completat)

---

## 1. Cum e organizat site-ul

Site-ul stă pe GitHub, într-un depozit (un fel de dosar online). De fiecare dată când se salvează o modificare acolo, Cloudflare reconstruiește site-ul și îl publică singur, în 1-2 minute.

Nu e nevoie să umbli în fișiere. Tot ce vei schimba de obicei (articole, prețuri, texte, date de contact) se face din **Pages CMS**, o interfață în browser, cu câmpuri de completat.

Pentru curiozitate, iată unde stau lucrurile:

| Ce | Unde |
| --- | --- |
| Articolele | `src/articole/` (câte un fișier pentru fiecare articol) |
| Prețurile și regulile de plată | `src/_data/tarife.json` |
| Date de contact, codul Google Analytics | `src/_data/site.json` |
| Textele de pe pagina Acasă | `src/_data/acasa.json` |
| Serviciile și temele | `src/_data/servicii.json` |
| Întrebările frecvente | `src/_data/intrebari.json` |
| Formarea și valorile | `src/_data/formare.json` |
| Textul „Despre mine” | `src/despre-mine.md` |
| Paginile legale | `src/protectia-datelor.md`, `src/cookie-uri.md` |
| Poze și logo | `src/assets/imagini/` |
| Culori și aspect | `src/assets/css/style.css` |

---

## 2. Publicarea gratuită pe Cloudflare Pages

Cloudflare Pages este gratuit pentru un site ca al tău: nu are limită de vizitatori și include certificatul de securitate (lacătul din bara browserului).

**O singură dată:**

1. Intră pe [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) și fă-ți un cont gratuit (e-mail și parolă).
2. În meniul din stânga, alege **Workers & Pages** (poate apărea și ca **Compute** > **Workers & Pages**), apoi apasă **Create** (Creează).
3. Alege fila **Pages**, apoi **Connect to Git** (Conectează la Git).
4. Apasă **Connect GitHub**, intră în contul tău de GitHub și dă acces la depozitul `site-alexandra`.
5. Selectează depozitul `site-alexandra` și apasă **Begin setup**.
6. Completează așa:
   - **Project name**: `alexandrapisaru` (va da și adresa provizorie `alexandrapisaru.pages.dev`)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `_site`
7. Apasă **Save and Deploy**. După 1-2 minute, site-ul e online la adresa `https://alexandrapisaru.pages.dev`.

> Important: Cloudflare publică ce se află pe ramura `main` a depozitului. Lucrul la site se face acum pe o ramură separată. Când ești mulțumită de rezultat, îți pregătesc eu unirea cu `main` (pe GitHub se numește „pull request”). Până atunci, Cloudflare îți arată și o previzualizare pentru fiecare ramură, la o adresă separată.

**De aici înainte** nu mai ai nimic de făcut: orice modificare salvată pe `main` (din Pages CMS sau din GitHub) apare pe site în 1-2 minute.

---

## 3. Cumpărarea și legarea domeniului

### Pasul 1: cumpără domeniul

Domeniile `.ro` se cumpără de la un registrar acreditat de ROTLD, de exemplu ROTLD direct ([rotld.ro](https://www.rotld.ro)), Gazduire.ro, Hostico, ROMARG sau altul. Caută `alexandrapisaru.ro` și cumpără **doar domeniul**, fără găzduire (hosting), pentru că site-ul e găzduit gratuit de Cloudflare.

### Pasul 2: adaugă domeniul în Cloudflare

1. În Cloudflare, de pe pagina principală a contului, apasă **Add a domain** (Adaugă un domeniu) și scrie `alexandrapisaru.ro`.
2. Alege planul **Free** (gratuit).
3. Cloudflare îți va arăta **două adrese de tip nameserver**, de forma `nume.ns.cloudflare.com`. Copiază-le.
4. Intră în contul de la registrarul de unde ai cumpărat domeniul, găsește secțiunea **DNS** sau **Nameservere** și înlocuiește nameserverele existente cu cele două primite de la Cloudflare.
5. Așteaptă. Poate dura de la câteva minute până la 24 de ore. Cloudflare îți trimite un e-mail când domeniul este activ.

### Pasul 3: leagă domeniul de site

1. În Cloudflare, mergi la **Workers & Pages**, deschide proiectul `alexandrapisaru`, apoi fila **Custom domains**.
2. Apasă **Set up a custom domain**, scrie `alexandrapisaru.ro` și confirmă. Cloudflare configurează totul singur.
3. Repetă pentru `www.alexandrapisaru.ro`.
4. Ca adresa cu `www` să ducă la cea fără `www`: în pagina domeniului, mergi la **Rules** > **Redirect Rules** > **Create rule**, alege șablonul **Redirect from WWW to root** și salvează.

### Pasul 4: spune-i site-ului adresa nouă

În Pages CMS, la **Date de contact și setări**, verifică dacă **Adresa site-ului** este `https://alexandrapisaru.ro`. Dacă alegi alt domeniu, scrie-l aici. E important pentru Google și pentru imaginea care apare când trimiți linkul pe WhatsApp.

### Pasul 5 (recomandat): spune-i lui Google că site-ul există

1. Intră pe [search.google.com/search-console](https://search.google.com/search-console) cu contul tău Google.
2. Adaugă proprietatea `alexandrapisaru.ro` (varianta **Domain**). Google îți dă un cod de verificare; îl adaugi în Cloudflare, la **DNS** > **Add record**, tip `TXT`.
3. În Search Console, la **Sitemaps**, adaugă `sitemap.xml`.

---

## 4. Interfața de editare (Pages CMS)

Pages CMS este gratuit și lucrează direct cu depozitul tău de pe GitHub.

**Prima dată:**

1. Intră pe [app.pagescms.org](https://app.pagescms.org).
2. Apasă **Sign in with GitHub** și intră cu contul tău de GitHub.
3. Dă acces la depozitul `site-alexandra` (apasă pe **Install** sau **Configure** dacă ți se cere).
4. Alege depozitul `site-alexandra` și ramura `main`.

În stânga vei vedea secțiunile: **Articole**, **Tarife și reguli**, **Date de contact și setări**, **Pagina Acasă**, **Despre mine**, **Servicii și teme**, **Întrebări frecvente**.

Data viitoare intri direct pe [app.pagescms.org](https://app.pagescms.org) și ești deja conectată.

---

## 5. Adăugarea unui articol nou

1. În Pages CMS, apasă pe **Articole** în stânga.
2. Apasă **Add an entry** (Adaugă).
3. Completează câmpurile:
   - **Titlu**: titlul articolului.
   - **Rezumat**: una sau două fraze. Apare în lista de articole și în rezultatele Google.
   - **Data publicării**: data de azi.
   - **Categorie**: alege una din listă.
   - **Imagine**: opțional. Dacă pui o imagine, alege una orizontală, de cel puțin 1200 de pixeli lățime, pe care ai dreptul să o folosești.
   - **Textul articolului**: scrie sau lipește textul. Poți folosi butoanele de sus pentru subtitluri, text îngroșat și liste.
4. Apasă **Save** (Salvează).
5. Peste 1-2 minute, articolul apare pe site, în pagina Articole și pe prima pagină. Timpul de citit se calculează automat.

**Ca să modifici un articol**: îl deschizi din listă, schimbi ce vrei și apeși **Save**.
**Ca să ștergi un articol**: îl deschizi și apeși pe meniul cu trei puncte, apoi **Delete**.

**Sfaturi:**

- Folosește cratima obișnuită (`-`), nu liniile lungi de pauză.
- Dacă lipești text din Word, verifică după aceea că nu au rămas formatări ciudate sau litere înclinate.
- Articolul model („Când gândurile despre viitor nu te lasă să dormi”) se poate șterge când publici primul tău articol.

**Categoriile**: dacă vrei să schimbi lista de categorii, spune-mi și le schimb eu (se modifică un singur rând, în fișierul `.pages.yml`). Filtrele din pagina Articole se actualizează singure, după categoriile folosite efectiv.

---

## 6. Schimbarea unui preț sau a unui text

### Un preț

1. În Pages CMS, apasă pe **Tarife și reguli**.
2. Găsește ședința sau pachetul și schimbă cifra din **Preț în lei**. Scrie doar cifre, fără puncte și fără „lei” (de exemplu `1300`, iar site-ul afișează „1.300 lei”).
3. Dacă e cazul, schimbă și textul din **Detalii** (de exemplu „260 lei pe ședință”).
4. Apasă **Save**.

### Un text

| Ce vrei să schimbi | Unde în Pages CMS |
| --- | --- |
| Telefonul, e-mailul, adresa, programul | Date de contact și setări |
| Textul butonului principal | Date de contact și setări |
| Titlul mare, listele, finalul paginii Acasă | Pagina Acasă |
| Textul „Despre mine” | Despre mine (text) |
| Formarea și valorile | Despre mine (formare și valori) |
| Descrierea serviciilor și temele | Servicii și teme |
| Întrebările frecvente | Întrebări frecvente |
| Regulile de plată și anulare | Tarife și reguli > Reguli de plată și anulare |

După **Save**, schimbarea apare pe site în 1-2 minute. Dacă nu o vezi, reîncarcă pagina (pe telefon, trage în jos).

**Dacă ceva nu merge**: fiecare salvare rămâne în istoric pe GitHub, așa că orice modificare se poate anula. Scrie-mi și o readuc la varianta anterioară.

---

## 7. Înlocuirea pozei și a logo-ului

Cel mai simplu e să îmi trimiți fișierele noi și le pun eu. Dacă vrei să o faci singură:

1. Pe GitHub, deschide depozitul `site-alexandra`, apoi dosarul `src/assets/imagini`.
2. Apasă **Add file** > **Upload files**.
3. Încarcă fișierele cu **exact aceste nume**, ca să le înlocuiască pe cele vechi:
   - poza de pe prima pagină: `alexandra-pisaru.jpg` (portret, pe verticală)
   - poza de la Despre mine: `alexandra-pisaru-2.jpg` (portret, pe verticală)
   - inițialele AP din meniu: `logo-ap.png` (cu fundal transparent)
   - logo-ul complet din subsol: `logo-complet.png` (cu fundal transparent)
4. Apasă **Commit changes**.

Înainte de încărcare, verifică să nu fie fotografii foarte mari (peste 2000 de pixeli sau peste 1 MB), ca site-ul să rămână rapid.

---

## 8. Google Analytics

Site-ul are deja bannerul de acord pentru cookie-uri. Bannerul apare și statisticile pornesc **doar după ce adaugi codul Google Analytics** și doar pentru vizitatorii care apasă „Accept”.

1. Intră pe [analytics.google.com](https://analytics.google.com) cu contul tău Google și apasă **Start measuring** (Începe măsurarea).
2. Numele contului: `Alexandra Pisaru`. Numele proprietății: `alexandrapisaru.ro`. Fusul orar: România. Moneda: RON.
3. La platformă, alege **Web**, scrie adresa site-ului și un nume pentru flux (de exemplu `Site`).
4. Vei primi un **ID de măsurare**, de forma `G-XXXXXXXXXX`. Copiază-l.
5. În Pages CMS, la **Date de contact și setări**, lipește codul în **Cod Google Analytics** și apasă **Save**.
6. Înapoi în Google Analytics, mergi la **Admin** > **Data collection and modification** > **Data retention** și alege **14 months** (așa scrie în Politica de cookie-uri). Tot acolo, la **Data collection**, lasă **Google signals** dezactivat.

---

## 9. Ce mai e de completat

Înainte de publicarea pe domeniul final:

- [ ] **CUI-ul** cabinetului (Pages CMS > Date de contact și setări > CUI)
- [ ] **Perioadele de păstrare a datelor** din pagina Protecția datelor, după ce le verifici cu cerințele Colegiului (le completez eu, spune-mi doar perioadele)
- [ ] **Codul Google Analytics**
- [ ] **Codul poștal** al cabinetului (opțional, ajută la Google)
- [ ] Primul articol, în locul celui model

---

## Pentru cine lucrează pe cod

```bash
npm install        # o singură dată
npm start          # previzualizare la http://localhost:8080
npm run build      # construiește site-ul în dosarul _site
npm run verifica   # caută linii de pauză lungi și cuvinte nedorite în site-ul construit
```

Site-ul este construit cu [Eleventy](https://www.11ty.dev). Fonturile Wix Madefor sunt găzduite pe site (fără Google Fonts), ca să nu se trimită date către Google înainte de acord.
