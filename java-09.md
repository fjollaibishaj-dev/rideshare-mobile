# RideShare – Java 9: Udhëtimet e preferuara

## 1. Çfarë u implementua

Në këtë javë u implementua funksioni për ruajtjen e udhëtimeve si të preferuara.

Përdoruesi duhet të jetë i kyçur me GitHub për të ruajtur një udhëtim. Preferimet ruhen në databazën Neon dhe lidhen me profilin e përdoruesit.

Kur përdoruesi klikon yllin:
- Ylli ndryshon menjëherë në gjendjen e preferuar.
- Shfaqet mesazhi “Po ruhet…”.
- Pas ruajtjes në databazë shfaqet “I ruajtur”.
- Në rast dështimi, ylli kthehet në gjendjen fillestare dhe shfaqet “Provo përsëri”.
- Preferimi mbetet i ruajtur edhe pas rifreskimit të faqes.

Ruajtja e preferimit nuk ndryshon numrin e vendeve të lira dhe nuk krijon rezervim.

## 2. Databaza

U krijua tabela `preferimet` në Neon.

Skema ndodhet te:

`database/preferimet-java09.sql`

Tabela përmban:
- `id` – identifikuesi i preferimit.
- `github_id` – identifikuesi i përdoruesit nga GitHub.
- `udhetimi_id` – identifikuesi i udhëtimit.
- `krijuar_me` – data dhe ora e krijimit.

U shtua kufizimi `UNIQUE (github_id, udhetimi_id)` për të parandaluar ruajtjen e preferimeve të dyfishta për të njëjtin përdorues dhe udhëtim.

Në kod përdoret gjithashtu `ON CONFLICT DO NOTHING`.

## 3. Testimet manuale

### Testi 1 – Ruajtja dhe rifreskimi

**Hapat:**
1. U kyça me llogarinë GitHub.
2. Hapa faqen kryesore.
3. Klikova yllin për ta ruajtur një udhëtim si të preferuar.
4. Rifreskova faqen.

**Rezultati:** Preferimi u ruajt me sukses dhe ylli vazhdoi të shfaqej si i preferuar pas rifreskimit.

### Testi 2 – Klikimet e përsëritura

**Hapat:**
1. Klikova disa herë shpejt për ta ruajtur një udhëtim.
2. Kontrollova tabelën `preferimet` në Neon.
3. Ekzekutova një pyetje SQL për të numëruar rreshtat sipas përdoruesit dhe udhëtimit.

**Rezultati:** Për secilin kombinim të përdoruesit dhe udhëtimit u gjet vetëm një rresht. Nuk u krijuan preferime të dyfishta.

### Testi 3 – Dështimi dhe riprovimi

**Hapat:**
1. Përkohësisht shtova një gabim të qëllimshëm para ekzekutimit të SQL-së.
2. Provova të ruaj një udhëtim.
3. Kontrollova reagimin e ndërfaqes.
4. E hoqa gabimin e përkohshëm dhe provova përsëri.

**Rezultati:** U shfaq mesazhi “Provo përsëri” dhe ylli u kthye në gjendjen fillestare. Pas heqjes së gabimit, preferimi u ruajt me sukses.

## 4. Skedarët kryesorë të ndryshuar

- `database/preferimet-java09.sql` – krijimi i tabelës së preferimeve.
- `lib/preferimet.ts` – leximi dhe ruajtja e preferimeve.
- `app/page.tsx` – leximi i preferimeve nga serveri.
- `app/FaqjaKryesore.tsx` – shfaqja e udhëtimeve dhe lidhja me panelin.
- `app/components/KartaUdhetimi.tsx` – butoni i preferimit dhe reagimi vizual.

U përdor edhe funksioni ekzistues i autentikimit dhe profili i përdoruesit nga `lib/lejet.ts`.

## 5. Kufizimet

- Heqja e preferimit nuk është implementuar në këtë version.
- Testimet e sjelljes janë kryer manualisht.
- Preferimi nuk është rezervim dhe nuk ndryshon vendet e lira.

## 6. Përdorimi i AI

ChatGPT u përdor si ndihmë gjatë zhvillimit, për shpjegimin e kodit, identifikimin e gabimeve, përgatitjen e SQL-së dhe udhëzimet për testimin manual. Implementimi dhe testimi u kryen në projektin ekzistues RideShare.
