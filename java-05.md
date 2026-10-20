# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Në këtë projekt implementova hyrjen me GitHub OAuth përmes NextAuth, panelin personal të përdoruesit dhe kontrollin e lejeve për ndryshimin e orës së udhëtimit.

**Identiteti** tregon se cili përdorues është kyçur në aplikacion. Në këtë projekt identiteti merret nga llogaria GitHub dhe ID-ja e përdoruesit.

**Roli** përcakton çfarë lejohet të bëjë përdoruesi. Në provat e mia, roli ishte `shofer`.

**Pronësia** përcakton se cilit shofer i përket një udhëtim. Serveri kontrollon pronësinë para se të lejojë ndryshimin e orës, edhe nëse ndryshohet ID-ja e dërguar nga formulari.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Hapa `/panel` pa qenë i kyçur dhe aplikacioni më kërkoi të hyja me GitHub.

Pastaj u kyça me GitHub dhe paneli shfaqi emrin e përdoruesit, rolin `shofer` dhe ID-në time GitHub.

Pas rifreskimit të faqes, sesioni vazhdoi të funksiononte dhe të dhënat e përdoruesit u shfaqën përsëri. Kur dola nga llogaria, paneli nuk lejonte përdorimin pa hyrje dhe shfaqte kërkesën për t'u kyçur përsëri.

**Rezultati:** Prova kaloi me sukses.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Si shofer me ID `333374005`, ndryshova orën e udhëtimit me ID `2` nga `08:15` në `08:25`.

Paneli shfaqi mesazhin se ora u ruajt me sukses. Kontrollova listën e udhëtimeve dhe faqen e detajeve, ku ora e re u shfaq si `08:25`. Pastaj e verifikova ndryshimin edhe në Neon SQL Editor, ku pyetja SQL për udhëtimin me ID `2` tregoi orën `08:25`.

Në fund, e riktheva orën në `08:15` dhe ruajtja përfundoi me sukses.

**Rezultati:** Prova kaloi me sukses. Ndryshimi i orës funksionon për udhëtimin që më përket dhe ora përfundimtare është `08:15`.

### Prova 3: Veprimi pa leje refuzohet

Nga formulari i panelit përdora Inspect në shfletues për të ndryshuar përkohësisht vlerën e fushës së fshehur `id` nga `2` në `1`. Pastaj vendosa një orë të re dhe klikova `Ruaj orën`.

Aplikacioni shfaqi mesazhin:

> Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.

Në Neon SQL Editor ekzekutova një pyetje SQL për të kontrolluar udhëtimet me ID `1` dhe `2`.

Rezultati tregoi se udhëtimi me ID `1` mbeti në `08:00`, me pronar `DEMO-SHOFER-2`, ndërsa udhëtimi me ID `2` mbeti në `08:15`, me pronar ID-në time GitHub.

Pas provës, rifreskova panelin dhe ruajta përsëri orën `08:15` për udhëtimin tim.

**Rezultati:** Prova kaloi me sukses. Serveri refuzoi ndryshimin e një udhëtimi që nuk më përket.

## Ku gjendet puna

Repository: https://github.com/fjollaibishaj-dev/rideshare-mobile

Aplikacioni i publikuar në Vercel: https://rideshare-mobile-bpne.vercel.app/

Skedari i dokumentimit për këtë detyrë është `java-05.md`, pranë `README.md` dhe jashtë dosjes së aplikacionit.

## Çfarë mbetet për përmirësim

Kërkesa për rezervimin e një vendi është ende simulim. Në një version të ardhshëm do të shtoja një proces të plotë rezervimi, me konfirmimin nga shoferi, përditësimin e vendeve të lira dhe njoftimin e pasagjerit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të kuptuar hapat e implementimit, për të testuar hyrjen me GitHub, për të kontrolluar pronësinë dhe për të përgatitur dokumentimin. Vetë i provova veprimet në aplikacion, kontrollova rezultatet në panel dhe verifikova të dhënat në Neon SQL Editor.