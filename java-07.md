
# RideShare · Java 7

## Rasti im
GitHub: fjollaibishaj-dev
Kodi: P7-696
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): 5 – Autorizimi i shoferit
ID i udhëtimit në projektin tim: 2
Të dhënat fiktive të rastit: Prizren → AAB, 10:00, 1 vende. Ora për provën e re: 10:05.

## Parashikimi
Para kodimit prisja që lista të shfaqte udhëtimet me të dhënat e tyre dhe që përdoruesi të mund të hapte detajet e secilit udhëtim. Për skenarin e autorizimit prisja që shoferi të mund të ndryshonte orën vetëm të udhëtimit të vet. Nëse provonte të ndryshonte udhëtimin e një shoferi tjetër, sistemi duhej ta refuzonte kërkesën.

## Dy probleme
1. Në panel shfaqej mesazhi "Kërkesa për vend mbetet simulim këtë javë.", por kërkesa ruhej realisht në databazën Neon. Problemi u vërejt pasi dërgova një kërkesë për rezervim dhe kontrollova tabelën rezervimet, ku kërkesa kishte statusin "Ne pritje".
2. Në kartelën e udhëtimit ID 3, Lipjan → AAB, me 0 vende të lira, shfaqej mesazhi "Nuk ka vende të lira". Përdoruesi nuk kishte lidhje për të hapur detajet nga kartela.

## Korrigjimi
Skedari: app/panel/page.tsx

Ky skedar shfaq panelin e përdoruesit dhe informacionet për llogarinë e tij. Ndryshova mesazhin e fundit nga "Kërkesa për vend mbetet simulim këtë javë." në "Kërkesat ruhen me statusin “Në pritje”.".

E bëra këtë ndryshim sepse kërkesat ruhen realisht në databazë dhe mesazhi i vjetër nuk përputhej me funksionimin e aplikacionit. Nuk ndryshova logjikën e rezervimit ose databazën.

## Versionet
Para: https://github.com/fjollaibishaj-dev/rideshare-mobile/commit/8f889c17488f6b8dd5b8c9e62c6e011840bd44c7

Pas: https://github.com/fjollaibishaj-dev/rideshare-mobile/commit/6c0206420d3233c400423953187a48b5435962cb

## Provat që bëra

### Prova 1
Hapat: Hapa listën e udhëtimeve, kontrollova tri udhëtimet, hapa detajet e udhëtimit ID 2 dhe provova adresën e udhëtimit ID 99.

Pritshmëria: Udhëtimet të shfaqen me të dhënat përkatëse dhe ID që nuk ekziston të shfaqë mesazhin se udhëtimi nuk u gjet.

Vëzhgimi: U shfaqën tri udhëtimet. ID 2 hapi detajet Fushë Kosovë → AAB. ID 99 shfaqi mesazhin "Udhëtimi nuk u gjet".

### Prova 2
Hapat: Hapa faqen e kërkesës për udhëtimin ID 2, plotësova emrin dhe emailin, dërgova kërkesën dhe kontrollova tabelën rezervimet në Neon.

Pritshmëria: Kërkesa të ruhet në databazë me statusin "Ne pritje".

Vëzhgimi: Aplikacioni shfaqi mesazhin "Kërkesa u ruajt me sukses." Në Neon u gjet kërkesa me statusin "Ne pritje".

### Prova 3
Hapat: Hapa panelin me llogarinë time GitHub, kontrollova rolin shofer, ndryshova orën e udhëtimit tim ID 2 dhe e riktheva në orën fillestare.

Pritshmëria: Shoferi të mund të ndryshojë orën e udhëtimit të vet, por jo të udhëtimit të një shoferi tjetër.

Vëzhgimi: Paneli shfaqi rolin "shofer" dhe ndryshimi i orës së udhëtimit tim u ruajt me sukses. Në një provë të mëparshme, ndryshimi i udhëtimit që nuk më përkiste u refuzua me mesazhin "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi."

## Ndryshimi i ri
Nuk e kam demonstruar ende ndryshimin e kolegut. Për këtë arsye, nuk mund të përshkruaj rezultatin e testimit pa e parë dhe provuar ndryshimin e tij.

## Ndihma nga AI
Përdora ChatGPT për të kuptuar problemet gjatë testimit, për të analizuar kodin. E verifikova vetë ndryshimin në localhost dhe kontrollova ruajtjen e kërkesës në databazën Neon.

