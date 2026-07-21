# PROJECT_CONTEXT.md

> Heittoliikkeen tutkimuslaboratorio -sovelluksen yhteinen projektikonteksti.
> Päivitä vain hyväksyttyjen päätösten perusteella.

## 1. Perustiedot

**Projektin nimi:** Heittoliikkeen tutkimuslaboratorio  
**Projektityyppi:** Selainpohjainen fysiikan opetussovellus  
**Kohderyhmä:** Suomalaisen lukion fysiikan opiskelijat ja opettajat  
**Nykyinen pääversio:** 1.0  
**Nykyinen vaihe:** Julkaisukelpoinen ensimmäinen versio / ylläpito  
**Pääkieli:** Suomi  
**Omistaja:** Jussi Henttu

## 2. Tarkoitus

Sovellus tukee heittoliikkeen tutkimista, mallien vertailua ja numeerisen mallintamisen perusteiden ymmärtämistä.

Opiskelija voi:

- muuttaa lähtönopeutta, lähtökulmaa, lähtökorkeutta, massaa, gravitaatiota, vastuskerrointa ja aika-askelta
- verrata analyyttistä vastuksetonta ratkaisua
- verrata vastuksetonta RK4-ratkaisua
- verrata neliöllisen ilmanvastuksen RK4-ratkaisua
- tarkastella lentorataa, paikkaa ajan funktiona ja nopeutta ajan funktiona
- tarkastella hetkellisiä arvoja
- suorittaa kolme tutkimustehtävää
- tehdä ennusteita, kirjata havaintoja ja muodostaa päätelmiä

## 3. Hyväksytyt pääominaisuudet

- Neutraali vapaan tutkimisen aloitusnäkymä
- Analyyttinen heittoliike ilman ilmanvastusta
- RK4-ratkaisu ilman ilmanvastusta
- RK4-ratkaisu neliöllisellä ilmanvastuksella
- Maaosuman tarkka paikannus aika-askeleen sisältä
- Animaatio
- Käynnistys, tauko, yksi askel ja nollaus
- Oikea mittakaava ja kuvaajaan sovitettu näkymä
- Alkunopeusvektori
- Laskentapisteiden näyttäminen
- Tulostaulukot
- Paikka- ja nopeuskuvaajat
- Vastuksettoman ja ilmanvastusmallin hetkellisten arvojen vertailu
- Kolme tutkimustehtävää
- Portaittaiset, uudelleen aloitettavat vihjeet
- Kevyt automaattinen palaute
- Näppäimistökäyttö ja saavutettavat tekstiyhteenvedot
- Täysin offline-toimiva standalone-HTML

## 4. Tutkimustehtävät

### Tehtävä 1: Lähtökulma ja kantama

- Tutkii lähtökulman vaikutusta kantamaan.
- Vertaa komplementtikulmia.
- Käyttää vastuksetonta mallia.
- Oletusarvoisesti `k = 0`.

### Tehtävä 2: Ilmanvastuksen vaikutus

- Vertaa vastuksetonta ja neliöllisen ilmanvastuksen mallia.
- Oletusarvoisesti `k = 0,02 kg/m`.
- Korostaa fysikaalisen mallin ja ratkaisumenetelmän eroa.

### Tehtävä 3: Numeerisen aika-askeleen vaikutus

- Vertaa analyyttistä ratkaisua ja vastuksetonta RK4-ratkaisua.
- Oletusarvoisesti `k = 0`.
- Tarkastelee laskentapisteiden määrää, ratakuvan kulmikkuutta ja numeerista virhettä.
- Suositellut aika-askeleet:
  - 0,5 s
  - 0,2 s
  - 0,05 s
  - 0,01 s

## 5. Fysiikan malli

Alkunopeuden komponentit:

```latex
v_{0x} = v_0 \cos\theta
```

```latex
v_{0y} = v_0 \sin\theta
```

Vastukseton analyyttinen ratkaisu:

```latex
x(t) = v_0 \cos\theta \, t
```

```latex
y(t) = y_0 + v_0 \sin\theta \, t - \frac{1}{2}gt^2
```

Kun lähtö- ja osumakorkeus ovat samat:

```latex
t_f = \frac{2v_0\sin\theta}{g}
```

```latex
R = \frac{v_0^2\sin(2\theta)}{g}
```

Neliöllinen ilmanvastus:

```latex
\mathbf{F}_d = -k|\mathbf{v}|\mathbf{v}
```

Vastuskertoimen yksikkö tässä mallissa:

```text
kg/m
```

## 6. Pedagogiset periaatteet

- Käytä termiä **opiskelija**, ei oppilas.
- Erota selvästi:
  - havainto
  - tulkinta
  - fysikaalinen malli
  - numeerinen ratkaisumenetelmä
- Älä anna automaattisen palautteen ymmärtää arvioivan vapaamuotoisen tekstin tieteellistä laatua.
- Ohjaa ensin havaintoon, sitten käsitteelliseen ymmärrykseen ja vasta lopuksi matemaattisempaan selitykseen.
- Älä lisää käyttöliittymään liikaa samanaikaisesti näkyviä vektoreita tai muita elementtejä.
- Hetkelliset nopeus-, kiihtyvyys- ja voimavektorit on rajattu myöhempään versioon 1.1 tai 2.0.
- Englanninkielinen käyttöliittymä on mahdollinen myöhempi versio, ei version 1.0 vaatimus.

## 7. Tekninen rakenne

**Teknologiat:**

- HTML
- CSS
- vanilla JavaScript
- Canvas
- ei ulkoisia kirjastoja
- ei build-työkaluja
- ei palvelinta

**Käyttö:**

- kehitysversio avataan `index.html`-tiedostosta
- jaettava versio avataan standalone-HTML-tiedostosta
- molemmat toimivat `file://`-osoitteella

**Tuetut selaimet:**

- Firefox
- Chrome
- Edge todennäköisesti yhteensopiva, mutta ensisijaiset testiselaimet ovat Firefox ja Chrome

## 8. Tietoturva ja yksityisyys

Sovellus:

- ei tee verkkopyyntöjä
- ei käytä ulkoisia resursseja
- ei käytä analytiikkaa
- ei käytä evästeitä
- ei käytä `localStoragea`
- ei käytä `sessionStoragea`
- ei lähetä opiskelijan tekstejä tai havaintoja
- säilyttää opiskelijan syötteet vain avoimen sivun muistissa
- ei käytä `eval`- tai `Function`-kutsuja
- ei sisällä API-avaimia tai tunnuksia
- ei saa sisältää konekohtaisia tiedostopolkuja

## 9. Testaus ja auditointi

Nykyinen versio on:

- läpäissyt regressiotestit
- auditoitu fysiikan, numeriikan, saavutettavuuden, tietoturvan ja yksityisyyden osalta
- testattu manuaalisesti Firefoxissa
- testattu standalone-versiona erilliseltä levyltä

Tunnettu analyyttinen testitapaus:

```text
v0 = 10 m/s
theta = 45°
g = 10 m/s²
y0 = 0
```

Odotetut tulokset:

```text
kantama = 10 m
lentoaika = sqrt(2) s
lakikorkeus = 2,5 m
```

## 10. Nykyinen tiedostorakenne

```text
app/
├── .agents/
├── .codex/
├── .git/
├── css/
├── js/
├── outputs/
├── tests/
├── work/
├── AGENTS.md
├── PROJECT_CONTEXT.md
├── AUDIT_REPORT.md
├── PROJECT_PLAN.md
├── README.md
├── STANDALONE_BUILD_REPORT.md
├── index.html
├── project-plan.html
└── heittoliikkeen-tutkimuslaboratorio-standalone.html
```

## 11. Hyväksytyt rajaukset

Ei version 1.0 tavoitteita:

- tuuli
- lineaarinen ilmanvastus
- Euler-menetelmä
- symplektinen Euler
- energiakuvaaja
- CSV-vienti
- opiskelijan vastausten pysyvä tallennus
- opettajan tulosnäkymä
- käyttäjätilit
- verkkoon tallentaminen
- reaaliaikainen yhteistyö
- monikielinen käyttöliittymä
- täydet hetkelliset voima- ja kiihtyvyysvektorit

## 12. Nykyinen tila

### Valmista

- sovelluslogiikka
- kolme tutkimustehtävää
- käytettävyys- ja saavutettavuuskierros
- loppuauditointi
- standalone-versio
- dokumentaatio
- manuaalinen selainkatselmus

### Seuraavat mahdolliset vaiheet

1. GitHub-repositoryn siistiminen
2. GitHub Pages -julkaisu
3. käyttäjäpalaute opettajilta ja opiskelijoilta
4. version 1.1 suunnittelu
5. mahdollinen suomi–englanti-kielivalinta
6. mahdolliset hetkelliset vektorit erillisinä valintoina

## 13. Ohje agenteille

- Lue `AGENTS.md` ennen muutoksia.
- Älä muuta tämän tiedoston hyväksyttyjä päätöksiä omin päin.
- Ehdota päätösmuutoksia erikseen.
- Päivitä tämä tiedosto vasta käyttäjän hyväksynnän jälkeen.
