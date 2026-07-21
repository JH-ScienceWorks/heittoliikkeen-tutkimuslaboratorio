# AGENTS.md

> Projektikohtaiset ohjeet Codexille ja muille koodaaville agenteille.
> Tämä tiedosto koskee Heittoliikkeen tutkimuslaboratorio -sovellusta.

## 1. Työalue

- Työskentele vain tämän `app`-kansion sisällä.
- Älä lue, muuta, siirrä tai poista mitään tämän kansion ulkopuolelta ilman käyttäjän erillistä lupaa.
- Älä muuta `lesson-package`-kansion materiaaleja.
- Älä käytä muita levyjä, käyttäjäkansioita, pilvisynkronointikansioita tai offline-varmuuskopioita.
- Käytä suhteellisia tiedostopolkuja aina kun mahdollista.

## 2. Turvallisuusrajat

- Älä poista tiedostoja tai kansioita.
- Jos jokin näyttää tarpeettomalta, raportoi siitä ja odota hyväksyntää.
- Älä suorita ilman erillistä nimenomaista hyväksyntää tuhoavia tai vaikeasti peruttavia komentoja, kuten:
  - `rm`, `rm -rf`, `rmdir`
  - `del`, `erase`
  - `Remove-Item`, erityisesti `-Recurse` tai `-Force`
  - `git clean`
  - `git reset --hard`
  - `DROP`, `TRUNCATE`
- Älä tee laajaa tiedostojen siivousta, uudelleennimeämistä tai kansiorakenteen muutosta ilman ensin esitettyä muutossuunnitelmaa.
- Älä etsi tai käytä salasanoja, API-avaimia, evästeitä, kirjautumistietoja, selaintietoja tai piilotettuja välimuisteja.
- Älä käytä verkkoyhteyttä, asenna paketteja tai lataa riippuvuuksia ilman käyttäjän hyväksyntää.
- Älä suorita tuntemattomia skriptejä ennen niiden tarkistamista.
- Älä käytä ylläpitäjän oikeuksia.

## 3. Projektin tarkoitus

Rakennetaan ja ylläpidetään selainpohjaista suomenkielistä heittoliikkeen tutkimuslaboratoriota lukio-opetukseen.

Sovellus:

- vertailee analyyttistä vastuksetonta mallia
- vertailee vastuksetonta RK4-ratkaisua
- vertailee neliöllisen ilmanvastuksen RK4-ratkaisua
- sisältää animaation, kuvaajat ja tulostaulukot
- sisältää kolme tutkimustehtävää
- toimii paikallisesti ilman palvelinta
- toimii myös yhtenä standalone-HTML-tiedostona
- ei lähetä tai tallenna opiskelijan tietoja verkkoon

## 4. Ennen jokaista muutosta

1. Lue `PROJECT_CONTEXT.md`.
2. Tarkista Git-tila.
3. Tunnista nykyinen viimeisin toimiva versio.
4. Kerro lyhyesti:
   - mitä aiot muuttaa
   - mihin tiedostoihin muutos kohdistuu
   - mitä riskejä muutokseen liittyy
5. Tee tarvittaessa Git-commit tai versionimellinen varmuuskopio ennen laajaa muutosta.
6. Älä aloita laajaa refaktorointia tai ominaisuuden lisäystä ilman käyttäjän hyväksyntää.

## 5. Työskentelytapa

- Säilytä nykyinen toimiva versio.
- Tee muutokset pienissä, tarkistettavissa vaiheissa.
- Älä muuta fysiikkaydintä ilman selkeää syytä ja käyttäjän hyväksyntää.
- Älä muuta pedagogisia tavoitteita ilman käyttäjän hyväksyntää.
- Älä lisää uusia ominaisuuksia, joita ei ole pyydetty.
- Suosi yksinkertaisia, selkeitä ja ylläpidettäviä ratkaisuja.
- Säilytä täysin offline-toimiva rakenne.
- Älä lisää ulkoisia kirjastoja, CDN-palveluja, verkkofontteja tai API-riippuvuuksia ilman nimenomaista hyväksyntää.
- Säilytä suomenkielinen käyttöliittymä version 1.x oletuksena.
- Säilytä saavutettavuus ja näppäimistökäyttö.

## 6. Fysiikan ja numeriikan vaatimukset

Tarkista muutosten yhteydessä soveltuvin osin:

- alkunopeuden komponentit
- analyyttinen heittoliike ilman ilmanvastusta
- lentoaika, lakikorkeus, kantama ja osumanopeus
- RK4-integraattorin toteutus
- neliöllinen ilmanvastus
- vastusvoiman suunta
- vastuskertoimen ja massan vaikutukset
- maaosuman paikantaminen aika-askeleen sisältä
- analyyttisen ja RK4-ratkaisun vastaavuus, kun `k = 0`
- aika-askeleen vaikutus laskentapisteisiin ja numeerisiin tuloksiin

Älä esitä fysikaalisesti harhaanjohtavia väitteitä käyttöliittymässä tai tehtävissä.

## 7. Testaus

- Aja olemassa olevat testit ennen olennaista muutosta, jos mahdollista.
- Lisää tai päivitä testit aina, kun muutat:
  - fysiikkalogiikkaa
  - integraattoria
  - maaosuman paikannusta
  - tehtävälogiikkaa
  - syötevalidointia
  - saavutettavuutta
  - standalone-paketointia
- Aja kaikki regressiotestit muutosten jälkeen.
- Tarkista ainakin:
  - tunnettu 45 asteen testitapaus
  - vapaa pudotus
  - vaakaheitto
  - pystysuora heitto
  - komplementtikulmat
  - `k = 0` -vastaavuus
  - ilmanvastuksen kantamaa pienentävä vaikutus
  - raja-arvoiset ja epäkelvot syötteet
- Älä väitä Firefox- tai Chrome-katselmusta tehdyksi, ellet todella avannut sovellusta kyseisessä selaimessa.
- Erottele loppuraportissa:
  - automaattisesti testattu
  - visuaalisesti tarkistettu
  - käyttäjän vielä tarkistettava

## 8. Standalone-versio

- Kehitysversio ja standalone-versio on pidettävä toiminnallisesti vastaavina.
- Älä korvaa standalone-tiedostoa ilman regressiotarkistusta.
- Standalone-versio ei saa sisältää:
  - verkkopyyntöjä
  - ulkoisia URL-resursseja
  - analytiikkaa
  - evästeitä
  - `localStoragea`
  - `sessionStoragea`
  - API-avaimia
  - konekohtaisia polkuja
  - `eval`- tai `Function`-kutsuja
- Säilytä kehitysversio erillään jaettavasta tiedostosta.

## 9. Tiedostojen käsittely

- Älä muuta `.git`-, `.codex`- tai `.agents`-kansioiden sisältöä ilman perusteltua tarvetta.
- Älä muuta varmuuskopioita.
- Älä poista testejä tai dokumentaatiota vain saadaksesi testit läpi.
- Raportoi kaikki:
  - luodut tiedostot
  - muutetut tiedostot
  - siirretyt tiedostot
  - poistettavaksi ehdotetut tiedostot

## 10. Valmistumiskriteerit

Tehtävä on valmis vasta, kun:

- pyydetty muutos on toteutettu
- nykyiset olennaiset ominaisuudet toimivat
- soveltuvat testit hyväksytään
- standalone-yhteensopivuus on tarkistettu, jos muutos vaikuttaa siihen
- turvallisuus- ja yksityisyysvaatimukset säilyvät
- mitään `app`-kansion ulkopuolista ei ole muutettu
- loppuraportissa on:
  1. tehdyt muutokset
  2. muuttuneet tiedostot
  3. testit ja tulokset
  4. tunnetut rajoitukset
  5. ihmisen vielä tarkistettavat asiat
  6. seuraava suositeltu vaihe
