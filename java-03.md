# Java 3 — RideShare

## Prova 1 — Lista e udhëtimeve në telefon

Hapat:
1. Nisa aplikacionin me `npm.cmd run dev`.
2. Hapa `http://localhost:3000`.
3. Kontrollova faqen në pamjen e telefonit përmes Chrome DevTools.

Rezultati:
Faqja kryesore shfaqi saktësisht tri karta udhëtimesh dhe nuk pati lëvizje horizontale në pamjen e telefonit.

## Prova 2 — Detajet, vendet e lira dhe faqja 404

Hapat:
1. Hapa `http://localhost:3000/udhetimi/2`.
2. Hapa `http://localhost:3000/udhetimi/3`.
3. Hapa `http://localhost:3000/udhetimi/99`.

Rezultati:
Te udhëtimi nr. 2 u shfaq vendi i takimit Fushë Kosovë. Te udhëtimi nr. 3 u shfaq mesazhi se nuk ka vende të lira për rezervim. Te adresa e udhëtimit nr. 99 u shfaq faqja e personalizuar me mesazhin “Udhëtimi nuk u gjet”.

## Prova 3 — Formulari i kërkesës dhe kthimi te detajet

Hapat:
1. Hapa `http://localhost:3000/udhetimi/2/kerkesa`.
2. Kontrollova fushat për emrin dhe email-in.
3. Klikova “Kthehu te detajet e udhëtimit”.

Rezultati:
Faqja e kërkesës u hap dhe shfaqi fushat për emrin dhe email-in. Butoni “Kthehu te detajet e udhëtimit” më ktheu me sukses te detajet e udhëtimit nr. 2.