# Java 6 — RideShare me PWA dhe funksionim offline

## Çfarë ndërtova

Implementova funksionalitetin PWA për RideShare, me një lexues publik të udhëtimeve që mund të përdoret edhe pa internet.

Lexuesi offline ndodhet te `/offline.html` dhe shfaq të dhënat publike të udhëtimeve.

## API e udhëtimeve

Endpoint-i `/api/udhetimet` kthen të dhënat publike në formatin JSON:

- id
- nisja
- destinacioni
- ora
- vendtakimi
- vende

API-ja nuk ekspozon të dhëna personale të rezervimeve.

## Service Worker dhe cache

Service Worker ndodhet te `public/sw.js`.

Cache-i publik quhet `rideshare-public-v1` dhe përdoret për të ruajtur faqen offline, ikonat dhe përgjigjen e API-së së udhëtimeve.

Përgjigjja e API-së ruan kohën e ruajtjes dhe informacionin nëse të dhënat vijnë nga rrjeti apo nga cache-i.

## Lexuesi offline

Faqja `public/offline.html` shfaq listën e udhëtimeve, statusin e lidhjes dhe kohën e ruajtjes.

Faqja përmban butonin “Rifresko listën” për të marrë të dhënat më të reja kur interneti është i disponueshëm.

Lexuesi offline është vetëm për lexim. Rezervimet nuk konfirmohen pa internet.

## Provat e kryera

1. Hapa faqen `/offline.html` kur isha online.
2. Verifikova që udhëtimet shfaqeshin.
3. Aktivizova mënyrën Offline te DevTools → Network.
4. Rifreskova faqen dhe verifikova që udhëtimet vazhdonin të shfaqeshin.
5. Kontrollova që data dhe ora e ruajtjes ishin të dukshme.
6. Riktheva lidhjen me internetin dhe përdora “Rifresko listën”.
7. Verifikova që lista përditësohej nga serveri.

## Përfundimi

RideShare tani ka një lexues publik të udhëtimeve që funksionon edhe pa internet, duke përdorur të dhënat e ruajtura më parë. Funksionet e rezervimit vazhdojnë të kërkojnë lidhje me serverin.