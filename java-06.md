# Java 6 — RideShare PWA dhe funksionimi offline

## Çfarë ndërtova

Implementova një lexues publik të udhëtimeve për RideShare, i cili mund të shfaqë listën edhe kur pajisja nuk ka lidhje me internetin.

Faqja offline ndodhet te `/offline.html`. Ajo shfaq udhëtimet, statusin e lidhjes dhe kohën e ruajtjes së listës.

## API e udhëtimeve

Endpoint-i `/api/udhetimet` kthen të dhënat publike të udhëtimeve në formatin JSON:

- id
- nisja
- destinacioni
- ora
- vendtakimi
- vende

API-ja kthen vetëm informacionin publik të udhëtimeve.

## Service Worker dhe cache

Service Worker ndodhet te `public/sw.js`.

Cache-i publik quhet `rideshare-public-v1` dhe përdoret për të ruajtur faqen offline, ikonat dhe përgjigjen e API-së së udhëtimeve.

Përgjigjja e ruajtur përmban kohën e ruajtjes dhe informacionin nëse të dhënat vijnë nga rrjeti apo nga cache-i.

## Provat e kryera

### Prova 1 — Hapja e lexuesit offline

**Hapat:** Hapa faqen `/offline.html` në shfletues kur kisha lidhje me internetin dhe prita të ngarkoheshin udhëtimet.

**Rezultati:** Faqja u hap dhe shfaqi listën e udhëtimeve, statusin e lidhjes dhe kohën e ruajtjes.

### Prova 2 — Funksionimi pa internet

**Hapat:** Te DevTools, në skedën Network, aktivizova mënyrën Offline dhe rifreskova faqen `/offline.html`.

**Rezultati:** Udhëtimet vazhduan të shfaqeshin pa lidhje me internetin. Data dhe ora e ruajtjes ishin të dukshme.

### Prova 3 — Rifreskimi pas rikthimit të internetit

**Hapat:** E ndryshova Network nga Offline në No throttling dhe klikova butonin “Rifresko listën”.

**Rezultati:** Lista u rifreskua nga serveri dhe faqja shfaqi statusin e përditësimit.

## Kufizimet

Lexuesi offline shërben vetëm për të parë informacionin publik të udhëtimeve. Rezervimet nuk konfirmohen offline dhe kërkojnë lidhje me serverin.

## Përfundimi

RideShare ka një lexues publik të udhëtimeve që mund të përdoret edhe pa internet, duke shfaqur të dhënat e ruajtura më parë dhe duke lejuar rifreskimin e listës kur lidhja rikthehet.