# RideShare — Java 10 · Menaxhimi i kërkesave të rezervimit

## 1. Çfarë ndërtova

Në këtë fazë të projektit RideShare implementova sistemin për menaxhimin e kërkesave të rezervimit të udhëtimeve.

Udhëtari mund të dërgojë kërkesë për rezervim, ndërsa shoferi mund t'i shohë kërkesat në panelin e tij dhe t'i pranojë ato.

Sistemi përdor Next.js, TypeScript, NextAuth dhe Neon PostgreSQL.

## 2. Funksionalitetet e implementuara

- Ruajtja e kërkesave të rezervimit në databazën Neon.
- Lidhja e rezervimit me llogarinë GitHub të udhëtarit.
- Shfaqja e kërkesave në panelin e shoferit.
- Shfaqja e rezervimeve në panelin e udhëtarit.
- Kontrollimi automatik i kërkesave çdo 5 sekonda.
- Pranimi i kërkesave nga shoferi.
- Ndryshimi i statusit nga `Ne pritje` në `E pranuar`.
- Zvogëlimi automatik i vendeve të lira pas pranimit.
- Pengimi i pranimit të kërkesave kur nuk ka vende të lira.
- Kontrollimi i pronësisë së udhëtimit nga ana e serverit.

## 3. Skedarët kryesorë të punuar

- `lib/rezervimet.ts` – funksionet për leximin dhe pranimin e rezervimeve.
- `app/api/rezervimet/route.ts` – API për shfaqjen dhe krijimin e rezervimeve.
- `app/api/prano-rezervimin/route.ts` – API për pranimin e kërkesave nga shoferi.
- `app/components/KerkesatLive.tsx` – komponenti për shfaqjen dhe kontrollimin automatik të kërkesave.
- `app/panel/page.tsx` – paneli për shoferin dhe udhëtarin.

## 4. Testimet e realizuara

### Prova 1 – Shfaqja e kërkesave te shoferi

U kyça me llogarinë time GitHub si shofer.

Rezultati:
- Paneli identifikoi llogarinë time.
- U shfaqën kërkesat për udhëtimet e mia.
- U shfaqën emri i udhëtarit, statusi dhe vendet e lira.
- Lista kontrollohej automatikisht çdo 5 sekonda.

**Rezultati: Sukses.**

### Prova 2 – Pranimi i rezervimit

Në udhëtimin Fushë Kosovë → AAB pranova një kërkesë.

Para pranimit kishte 1 vend të lirë.

Pas pranimit:
- Statusi ndryshoi në `E pranuar`.
- Numri i vendeve të lira ndryshoi nga 1 në 0.
- Kërkesa tjetër mbeti `Ne pritje`.
- Sistemi nuk lejoi pranimin e kërkesës tjetër, sepse nuk kishte më vende të lira.

**Rezultati: Sukses.**

### Prova 3 – Rezervimi si udhëtar

Për testimin e rolit të udhëtarit ndryshova përkohësisht rolin e llogarisë sime në databazën Neon.

Dërgova një kërkesë për udhëtimin Prishtinë → AAB, ora 08:00.

Rezultati:
- Kërkesa u ruajt me sukses.
- Rezervimi u shfaq në panelin e udhëtarit.
- Statusi u shfaq si `Ne pritje`.
- Numri i vendeve të lira u shfaq si 2.

**Rezultati: Sukses.**

### Prova 4 – Rikthimi i rolit

Pas testimit e riktheva rolin e llogarisë sime në `shofer`.

E kontrollova në databazën Neon dhe roli u shfaq saktë.

**Rezultati: Sukses.**

## 5. Siguria dhe autorizimi

Sistemi kontrollon sesionin e përdoruesit përmes NextAuth dhe rolin e tij përmes profilit në databazë.

Vetëm shoferi që është pronar i udhëtimit mund ta pranojë kërkesën për atë udhëtim.

Gjithashtu, serveri kontrollon nëse ka vende të lira para se të pranojë një rezervim.

## 6. Teknologjitë e përdorura

- Next.js
- React
- TypeScript
- Neon PostgreSQL
- NextAuth
- GitHub OAuth

## 7. Ndihma nga AI

Gjatë realizimit të kësaj faze përdora ChatGPT për ndihmë në implementimin e funksionaliteteve, shpjegimin e gabimeve në TypeScript dhe SQL, kontrollimin e API-ve dhe udhëzimet për testimin e sistemit.

## 8. Përfundimi

Java 10 përfundoi me implementimin dhe testimin e sistemit për menaxhimin e kërkesave të rezervimit.

U testuan të dy rolet, shofer dhe udhëtar. U verifikua ruajtja e rezervimeve në Neon, shfaqja e tyre në panele, pranimi i kërkesave dhe përditësimi i numrit të vendeve të lira.

Funksionalitetet kryesore të kësaj faze funksionuan me sukses gjatë testimeve lokale.