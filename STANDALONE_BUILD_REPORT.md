# Standalone-version muodostamisraportti

## Versio ja tiedosto

- Sovellus: Fysiikan tutkimuslaboratorio – heittoliike ja mallien vertailu
- Versio: 1.0.0
- Muodostamispäivä: 13.7.2026
- Tiedosto: `heittoliikkeen-tutkimuslaboratorio-standalone.html`
- Tiedoston koko: 56 046 tavua, noin 54,7 KiB
- SHA-256: `0302FB72E49295D6E13B65DC013826F81E06B016DE63ED4290699912C3290493`

## Lähdetiedostot

Standalone-version HTML-rakenne muodostettiin tiedostosta `index.html`.

CSS upotettiin tässä järjestyksessä:

1. `css/styles.css`
2. `css/pedagogy.css`
3. `css/accessibility.css`

JavaScript upotettiin kehitysversion latausjärjestyksessä:

1. `js/physics.js`
2. `js/integrator.js`
3. `js/simulation.js`
4. `js/axis.js`
5. `js/trajectory-view.js`
6. `js/charts.js`
7. `js/tasks-data.js`
8. `js/task-engine.js`
9. `js/tasks-ui.js`
10. `js/ui.js`
11. `js/app.js`

Testisivua, testiaineistoa, ulkoisia kirjastoja tai base64- ja data-URI-resursseja ei sisällytetty standalone-tiedostoon. Tuotantolähteet upotettiin luettavina ja lähdetiedostokommenteilla erotettuina.

## Paketointi- ja toiminnallisuusvertailu

`tests/standalone-audit.js` tarkisti seuraavat asiat:

- kaikki kehitysversion 60 DOM-tunnistetta ovat standalone-versiossa
- kolme CSS-tiedostoa ja 11 JavaScript-tiedostoa ovat mukana muuttumattomina ja oikeassa järjestyksessä
- neutraali käynnistystila ja oletusparametrit ovat samat
- tunnettu tapaus $v_0=10$ m/s, $\theta=45°$, $y_0=0$ ja $g=10$ m/s² antaa kantamaksi 10 m, lentoajaksi $\sqrt{2}$ s ja lakikorkeudeksi 2,5 m
- analyyttisen, vastuksettoman RK4- ja vastusmallin tunnusluvut vastaavat kehitysversiota
- kaikki kolme tutkimustehtävää latautuvat
- vihjeet etenevät ja alkavat uudelleen oikein
- havainnon kirjaaminen toimii
- oikean mittakaavan koordinaattimuunnos vastaa kehitysversiota
- parametri- ja turvallisuusrajat ovat samat
- uusi sivuistunto alkaa ilman aktiivista tehtävää, tekstejä tai havaintoja
- koko standalone-sovellus alustuu DOM- ja Canvas-testiympäristössä ilman konsolivirheitä

Paketointitarkistuksen tulos: **PASS**.

## Turvallisuus- ja yksityisyystarkistus

Standalone-tiedostosta ei löytynyt:

- `fetch`-, `XMLHttpRequest`-, `WebSocket`- tai `sendBeacon`-verkkopyyntöjä
- ulkoisia URL- tai resurssiviittauksia
- analytiikkaa, evästeitä, `localStoragea` tai `sessionStoragea`
- `eval`- tai `Function`-koodinsuoritusta
- API-avaimia, tunnuksia, salaisuuksia tai konekohtaisia polkuja
- `innerHTML`-sijoituksia
- testiympäristön tuotantoon kuulumattomia skriptejä

Oppilaan tekstit ja havainnot ovat vain JavaScript-muistissa ja poistuvat sivun sulkemisen tai uudelleenlatauksen yhteydessä.

## Testitulokset

- Kehitysversion regressiotestit: **64/64 hyväksytty**
- Staattinen saavutettavuus- ja responsiivisuustarkistus: **PASS**
- Standalone-paketointi- ja toiminnallisuusvertailu: **PASS**
- Standalone-ajonaikainen DOM- ja Canvas-savukoe: **PASS**, ei konsolivirheitä
- Paikallisten resurssien tarkistus: standalone-tiedostossa ei ole ulkoisia tai erillisiä resurssiriippuvuuksia

## Erot kehitysversioon

Toiminnallisia eroja ei ole. Standalone-versiossa kehitysversion kolme CSS-tiedostoa ja 11 tuotanto-JavaScript-tiedostoa on upotettu suoraan HTML-tiedostoon. Kehitysversion testit ja dokumentaatiot eivät sisälly jaettavaan tiedostoon.

Automaattinen selainohjaus ei ollut käytettävissä muodostusympäristössä. Lopullisessa ihmisen katselmuksessa tulee vielä avata standalone-tiedosto `file://`-osoitteella Firefoxissa ja Chromessa, tarkistaa selaimen konsoli sekä kokeilla animaatio, tutkimustehtävät, vihjekierto, havaintojen kirjaaminen ja sivun uudelleenavaus.
