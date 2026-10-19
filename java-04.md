# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

E lidha aplikacionin UniRide me databazën Neon duke përdorur PostgreSQL dhe paketën `@neondatabase/serverless`. Skedari `lib/db.ts` e lexon lidhjen nga variabla e mjedisit `DATABASE_URL`, ndërsa `lib/udhetimet.ts` lexon udhëtimet nga tabela `udhetimet`. Të dhënat shfaqen në faqen kryesore të aplikacionit.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Në Neon SQL Editor ndryshova orën e udhëtimit me ID `2` nga `08:15` në `08:25`. Pas rifreskimit të UniRide, ora u shfaq si `08:25`. Pastaj e riktheva orën në `08:15` dhe kontrollova që ndryshimi u ruajt në databazë.

### Prova 2: Lista bosh dhe rikthimi

Në skedarin `lib/udhetimet.ts` shtova përkohësisht `WHERE false` në pyetjen SQL. Aplikacioni shfaqi mesazhin “Nuk u gjet asnjë udhëtim për momentin”. E hoqa `WHERE false`, e ruajta skedarin dhe rifreskova faqen. Të tri udhëtimet u shfaqën përsëri.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Në `.env.local` ndryshova përkohësisht emrin e variablës nga `DATABASE_URL` në `DATABASE_URL_TEST` pa ndryshuar vlerën sekrete. Pas rinisjes së serverit, aplikacioni shfaqi mesazhin “Databaza nuk është konfiguruar.” E riktheva emrin `DATABASE_URL`, rinisa serverin dhe të tri udhëtimet u shfaqën përsëri. `.env.local` duhet të mbetet jashtë GitHub për të mbrojtur kredencialet.

## Ku gjendet puna

- `schema.sql` — struktura dhe të dhënat fillestare të tabelës, nëse ky skedar është pjesë e repository-t.
- `lib/db.ts` — lidhja me Neon.
- `lib/udhetimet.ts` — leximi i udhëtimeve nga databaza.
- `app/page.tsx` — ngarkimi i udhëtimeve për faqen kryesore.
- `app/FaqjaKryesore.tsx` — paraqitja e faqes kryesore.
- `components/KartaUdhetimi.tsx` — paraqitja e kartave të udhëtimeve.

Repository: https://github.com/fjollaibishaj-dev/rideshare-mobile

## Çfarë mbetet për përmirësim

Një përmirësim i ardhshëm është trajtimi më i qartë i gabimeve të lidhjes me databazën, në mënyrë që përdoruesi të shohë një mesazh të kuptueshëm në vend të ekranit teknik të gabimit. Kërkesa “Në pritje” mbetet simulim dhe nuk krijon rezervim real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora ChatGPT për udhëzime gjatë lidhjes me Neon, testimit të pyetjeve SQL dhe përgatitjes së raportit. I verifikova vetë rezultatet duke ndryshuar orën në Neon, duke testuar listën bosh dhe duke kontrolluar sjelljen e aplikacionit kur mungonte `DATABASE_URL`.