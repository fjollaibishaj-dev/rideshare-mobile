
# RideShare — Java 8

## Çfarë ndërtova

Këtë javë shtova funksionalitetin për vendtakimin në aplikacionin RideShare. Përdoruesi mund ta shkruajë vetë vendtakimin dhe ta konfirmojë me butonin përkatës. Gjithashtu shtova mundësinë për të kërkuar vendndodhjen përmes GPS-it, vetëm pasi përdoruesi klikon butonin. Nëse leja refuzohet ose vendndodhja nuk mund të merret, përdoruesi mund të vazhdojë duke shkruar vendtakimin manualisht.

Krijova edhe një faqe të veçantë testimi me të dhëna lokale për shoferin Driton, pa përdorur databazën ose hyrjen me llogari.

## Provat që bëra

### Prova 1: Leja nuk kërkohet sapo hapet faqja.

**Hapat:** Hapa faqen `/java-08-test` dhe e rifreskova.

**Rezultati i pritur:** Faqja duhet të hapet pa kërkuar automatikisht lejen për vendndodhje.

**Çfarë ndodhi:** Faqja u hap normalisht dhe nuk u shfaq kërkesë për lejen e vendndodhjes. Kërkesa shfaqet vetëm pasi klikohet butoni për përdorimin e vendndodhjes.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.

**Hapat:** Klikova butonin për përdorimin e vendndodhjes dhe refuzova lejen në shfletues.

**Rezultati i pritur:** Duhet të shfaqet një mesazh që tregon se leja është refuzuar dhe përdoruesi duhet të ketë mundësi ta shkruajë vetë vendtakimin.

**Çfarë ndodhi:** U shfaq mesazhi që leja ishte refuzuar. Mund të vazhdoja duke shkruar vendtakimin manualisht dhe butoni ishte përsëri i përdorshëm.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.

**Hapat:** Kontrollova funksionin e vendndodhjes në kod për të parë se çfarë informacioni përdoret.

**Rezultati i pritur:** Në GitHub nuk duhet të publikohen koordinatat ose adresa ime reale dhe as të dhëna private nga pajisja.

**Çfarë ndodhi:** Në komponentin e vendtakimit përdoret vetëm saktësia e vendndodhjes për ta shfaqur në metra. Koordinatat nuk ruhen në aplikacion. Kontrolli përfundimtar i skedarëve që do të publikohen në GitHub duhet të bëhet para dorëzimit.

## Ku gjendet puna

Skedarët kryesorë:

- `app/components/Vendtakimi.tsx` — komponenti për vendtakimin dhe kërkimin e vendndodhjes.
- `app/java-08-test/page.tsx` — faqja e veçantë për testim.
- `app/udhetimi/[id]/page.tsx` — përdor komponentin e vendtakimit në detajet e udhëtimit.
- `mobile-week08.json` — konfigurimi i faqes së testimit.
- `package-lock.json` — skedari i varësive të projektit.

Demonstrimi lokal: `http://localhost:3000/java-08-test`

## Çfarë mbetet për përmirësim

Duhet të testohen edhe rastet kur kërkesa për vendndodhje përfundon me vonesë ose kur shfletuesi nuk e mbështet GPS-in. Gjithashtu duhet të kontrollohen rezultatet e testimit automatik në GitHub.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora ChatGPT për ndihmë në krijimin dhe përmirësimin e komponentit, vendosjen e atributeve `data-testid`, krijimin e faqes së testimit dhe shpjegimin e funksionimit të kodit. Vetë testova hapjen e faqes, konfirmimin e vendtakimit, ruajtjen e vendtakimit të konfirmuar kur ndryshohet teksti pa konfirmim dhe refuzimin e lejes për vendndodhje.

## Prova me një hyrje të re

- Hyrja që provova: Ndryshova vendtakimin nga `Biblioteka` në `Parkingu`, pa klikuar butonin e konfirmimit.
- Parashikimi im para klikimit: Vendtakimi i konfirmuar duhet të mbetet `Biblioteka`, sepse nuk e kam konfirmuar ndryshimin e ri.
- Çfarë pashë realisht: Vendtakimi i konfirmuar mbeti `Biblioteka`, ndërsa në fushën e shkrimit u shfaq `Parkingu`.
- Skedari dhe funksioni që e shpjegojnë: `app/components/Vendtakimi.tsx`, funksioni `konfirmoVendtakimin()` dhe gjendjet `draft` dhe `vendtakimiKonfirmuar`.
- Çfarë kuptova ose korrigjova: Kuptova se ndryshimi i tekstit nuk e ndryshon automatikisht vendtakimin e konfirmuar. Duhet të klikohet butoni i konfirmimit që ndryshimi të ruhet.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
