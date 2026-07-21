# Siirron jälkeinen nykytilan tarkistusraportti

**Tarkistuspäivä:** 16.7.2026  
**Tarkistuksen luonne:** Lukutilassa tehty rakenne-, polku-, Git- ja dokumentaatiotarkistus

## 1. Tarkistettu projektipolku

Nykyinen työkansio ja projektin tunnistettu juuri ovat:

```text
C:\AI-projects\active\heittoliikelaboratorio\app
```

Työkansio on projektin `app`-kansio. Kaikki tarkistukset rajattiin tämän kansion sisälle. Projektin ulkopuolisia kansioita, levyjä, varmuuskopioita tai pilvisynkronointikansioita ei tutkittu.

## 2. Git-tila

Projektin juuressa on `.git`-niminen hakemisto, mutta se on tyhjä. Git ei tunnista nykyistä kansiota repositoryksi.

Seuraavat lukevat Git-komennot palauttivat virheen `not a git repository`:

- `git rev-parse --show-toplevel`
- `git status --short --branch`
- `git log`
- `git tag --list`
- `git ls-files`

Työpuuta ei tämän vuoksi voida luokitella puhtaaksi tai muuttuneeksi. Nykyistä haaraa, viimeisintä committia tai commit-historiaa ei voida tunnistaa.

Pelkkä kansion uudelleennimeäminen `te`-kansiosta `app`-kansioksi ei tavallisesti tyhjennä `.git`-hakemistoa. Todennäköinen selitys on, ettei alkuperäistä Git-metatietoa kopioitu siirron yhteydessä tai tyhjä `.git`-hakemisto luotiin erikseen. Repositorya ei alustettu uudelleen, koska se voisi vaikeuttaa alkuperäisen historian palauttamista.

## 3. Kansiorakenne

Nykyinen pääasiallinen rakenne on:

```text
app/
├── .agents/
├── .codex/
├── .git/                         # olemassa, mutta tyhjä
├── css/                          # kolme tyylitiedostoa
├── js/                           # 11 tuotanto-JavaScript-tiedostoa
├── outputs/                      # tarkistushetkellä tyhjä
├── tests/                        # selain- ja Node-pohjaiset tarkistukset
├── work/                         # aiempien selainkokeiden artefakteja
├── AGENTS.md
├── AUDIT_REPORT.md
├── MIGRATION_CHECK_REPORT.md
├── PROJECT_CONTEXT.md
├── PROJECT_PLAN.md
├── README.md
├── STANDALONE_BUILD_REPORT.md
├── index.html
├── project-plan.html
└── heittoliikkeen-tutkimuslaboratorio-standalone.html
```

`work/`-kansiossa näkyi Chrome-profiileihin ja aiempiin selaintarkistuksiin viittaavia nimiä. Niiden sisältöä ei tutkittu, koska projektin turvallisuusohje kieltää selaintietojen ja piilotettujen välimuistien etsimisen tai käyttämisen. Mitään artefakteja ei poistettu tai siirretty.

`lesson-package`-kansiota ei löytynyt nykyisen `app`-kansion juuresta.

## 4. Tarkistetut dokumentit

Seuraavat tiedostot luettiin kokonaan:

- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `README.md`
- `PROJECT_PLAN.md`
- `AUDIT_REPORT.md`
- `STANDALONE_BUILD_REPORT.md`

Lisäksi käynnistys-, testaus- ja standalone-menettelyjen selvittämiseksi tarkistettiin:

- `index.html`
- `tests/test-runner.html`
- `tests/tests.js`
- `tests/static-audit.js`
- `tests/standalone-audit.js`

Dokumentaation mukainen viimeisin toimiva julkaisu on versio **1.0.0**, joka on muodostettu 13.7.2026. Nykyisen standalone-tiedoston koko on 56 046 tavua ja SHA-256-tiiviste on:

```text
0302FB72E49295D6E13B65DC013826F81E06B016DE63ED4290699912C3290493
```

Koko ja tiiviste vastaavat `STANDALONE_BUILD_REPORT.md`-raporttia. Tämä tukee johtopäätöstä, ettei standalone-tiedosto ole vahingoittunut siirrossa.

Dokumentoidut aiemmat tulokset ovat 64/64 hyväksyttyä regressiotestiä sekä hyväksytyt staattinen auditointi, standalone-vertailu ja DOM/Canvas-savukoe. Testejä ei ajettu tämän nykytilan tarkistuksen aikana, joten nämä ovat aikaisempia raportoituja tuloksia eivätkä siirretyssä kansiossa uudelleen varmennettuja tuloksia.

## 5. Vanhaan `te`-polkuun ja absoluuttisiin polkuihin viittaavat kohdat

Projektin lähteistä, testeistä ja dokumentaatiosta ei löytynyt:

- vanhaan `te`-kansioon osoittavia polkuja
- nykyiseen `C:\AI-projects\active\heittoliikelaboratorio\app`-polkuun sidottuja resurssiviittauksia
- todellisia `C:\Users\...`, `/Users/...` tai `/home/...` -polkuja
- rikkoutuneita kehitysversion tai testisivun suhteellisia resurssiviittauksia

Dokumentaation `file://`-maininnat ovat yleisiä paikallisen käynnistyksen ohjeita eivätkä konekohtaisia polkuja.

Tiedostossa `tests/standalone-audit.js` esiintyy merkkijono `C:\Users\` vain kiellettyjen konekohtaisten polkujen tunnistamiseen tarkoitetussa tarkistuksessa. Se ei ole resurssipolku.

Kaikki `index.html`-tiedoston kolme CSS- ja 11 JavaScript-viittausta osoittavat olemassa oleviin tiedostoihin. Myös kaikki `tests/test-runner.html`-tiedoston suhteelliset tiedostoviittaukset ovat olemassa.

## 6. Projektin nykyinen tekninen tila

Projektin hyväksytty tekninen perusta on:

- HTML, CSS, vanilla JavaScript ja Canvas
- ei npm-riippuvuuksia
- ei palvelinta tai varsinaista build-työkalua
- ei ulkoisia kirjastoja, CDN-resursseja tai verkkofontteja
- suora paikallinen `file://`-käynnistys
- analyyttinen vastukseton heittoliike
- vastukseton RK4-ratkaisu
- neliöllisen ilmanvastuksen RK4-ratkaisu
- tarkennettu maaosuman paikannus
- animaatio, ratakuva, paikka- ja nopeuskuvaajat
- kolme tutkimustehtävää
- täysin offline-toimiva standalone-HTML

Version 1.0 tärkeimpiä hyväksyttyjä rajauksia ovat tuulen, lineaarisen ilmanvastuksen, Euler-menetelmien, energiakuvaajan, CSV-viennin, pysyvän tallennuksen, käyttäjätilien, verkkoyhteistyön, monikielisyyden sekä täydellisten hetkellisten voima- ja kiihtyvyysvektorien puuttuminen.

Dokumentaatiossa on vaihekohtainen epäselvyys manuaalisen selainkatselmuksen tilasta. `PROJECT_CONTEXT.md` ilmoittaa Firefox-katselmuksen, erilliseltä levyltä tehdyn standalone-testin ja manuaalisen selainkatselmuksen valmiiksi. `AUDIT_REPORT.md` ja `STANDALONE_BUILD_REPORT.md` puolestaan luettelevat vielä Firefoxissa, Chromessa ja ruudunlukijalla tehtäviä ihmisen tarkistuksia. Tämä ei vaikuta siirtorikolta, mutta nykyinen lopullinen manuaalinen varmennustila kannattaa selvittää.

## 7. Käynnistys- ja testausohjeet

### Kehitysversion käynnistys

1. Avaa `index.html` suoraan Windowsin tiedostoselaimesta Firefoxiin tai Chromeen.
2. Palvelinta, asennusta, npm:ää, build-vaihetta tai verkkoyhteyttä ei tarvita.

### Selainregressiot

1. Avaa `tests/test-runner.html` Firefoxissa tai Chromessa.
2. Testisivu suorittaa `tests/tests.js`-testit ja näyttää hyväksyttyjen testien määrän.
3. Dokumentoitu aikaisempi tulos on 64/64 hyväksyttyä testiä.

### Staattinen tarkistus

Projektin juuresta:

```powershell
node tests/static-audit.js
```

Tarkistus käsittelee muun muassa saavutettavuusrakennetta, responsiivisuuteen liittyviä CSS-vaatimuksia, paikallisia resurssiviittauksia ja kiellettyjä verkkorajapintoja.

### Standalone-tarkistus

Projektin juuresta:

```powershell
node tests/standalone-audit.js
```

Tarkistus vertaa standalone-tiedostoa kehitysversion HTML-, CSS- ja JavaScript-lähteisiin sekä tekee toiminnallisen DOM/Canvas-savukokeen.

### Standalone-version muodostaminen

`STANDALONE_BUILD_REPORT.md` kuvaa muodostamisen rakenteen:

1. HTML-rakenne otetaan tiedostosta `index.html`.
2. Kolme CSS-tiedostoa upotetaan raportin määrittelemässä järjestyksessä.
3. Yksitoista JavaScript-tiedostoa upotetaan kehitysversion latausjärjestyksessä.

Projektista ei löytynyt erillistä standalone-muodostusskriptiä. `tests/standalone-audit.js` tarkistaa jo muodostetun tiedoston mutta ei muodosta sitä. Tämä on toistettavuuteen liittyvä dokumentaatio- tai työkalupuute, ei todettu siirron aiheuttama rikkoutuminen.

## 8. Turvallisuusrajojen noudattaminen

Nykytilan tarkistuksessa noudatettiin `AGENTS.md`-ohjeita seuraavasti:

- Kaikki työ rajattiin projektin `app`-kansioon.
- Projektin ulkopuolisia tiedostoja tai kansioita ei luettu.
- `lesson-package`-materiaaleja ei muutettu.
- Verkkoa ei käytetty eikä riippuvuuksia asennettu tai ladattu.
- Ylläpitäjän oikeuksia tai lisäoikeuksia ei käytetty.
- Salasanoja, API-avaimia, evästeitä, kirjautumistietoja tai selaintietoja ei etsitty.
- Chrome-profiilien sisältöä ei luettu.
- Tuhoavia tai vaikeasti peruttavia komentoja ei käytetty.
- Testejä, selainta tai projektin omia skriptejä ei ajettu.
- Tiedostoja ei poistettu, siirretty tai nimetty uudelleen.

Tämän raportin tallentaminen on ainoa tarkistuksen jälkeen tehty tiedostomuutos.

## 9. Mahdolliset siirron jälkeiset korjaustarpeet

1. **Git-metatiedon palauttaminen:** Selvitä, onko alkuperäinen `.git`-hakemisto vielä saatavilla. Jos on, historia kannattaa palauttaa alkuperäisestä lähteestä ennen uuden repositoryn alustamista.
2. **Testien uudelleenajo:** Varmista kaikki automaattiset testit nykyisessä `app`-kansiossa vasta erillisellä hyväksytyllä tarkistuskierroksella.
3. **Manuaalisen selainkatselmuksen tila:** Selvitä dokumenttien välinen epäselvyys ja tarvittaessa toista Firefox-, Chrome- ja NVDA-katselmus nykyisille tiedostoille.
4. **Standalone-muodostamisen toistettavuus:** Harkitse myöhemmin erillistä paikallista muodostusskriptiä tai täsmällistä käsin suoritettavaa muodostusohjetta.
5. **`work/`-kansion artefaktit:** Arvioi aiempien Chrome-testien artefaktien tarpeellisuus vasta Git-tilan palauttamisen jälkeen. Mitään ei tule poistaa ilman erillistä hyväksyntää.

Lähde- tai testitiedostoissa ei havaittu siirrosta tai `te` → `app` -uudelleennimeämisestä johtuvaa polkukorjaustarvetta.

## 10. Turvallinen seuraava tarkistusvaihe

Suositeltu järjestys on:

1. Selvitä ensin alkuperäisen Git-metatiedon saatavuus. Älä suorita `git init` -komentoa ennen kuin mahdollisuus historian palauttamiseen on arvioitu.
2. Kun Git-tilanne on ratkaistu tai erikseen hyväksytty sivuutettavaksi, aja JavaScript-tiedostojen syntaksitarkistukset.
3. Aja `node tests/static-audit.js`.
4. Aja `node tests/standalone-audit.js`.
5. Avaa `tests/test-runner.html` ensisijaisissa testiselaimissa ja varmista 64/64 tulos.
6. Avaa kehitys- ja standalone-versiot Firefoxissa ja Chromessa ja tarkista käyttöliittymä, näppäimistökäyttö, animaatio, kolme tutkimustehtävää sekä selaimen konsoli.
7. Raportoi automaattisesti testatut, visuaalisesti tarkistetut ja vielä ihmisen tarkistettavat asiat erillisinä kokonaisuuksina.

Tässä tarkistuksessa ei tehty korjauksia eikä ajettu testejä.
