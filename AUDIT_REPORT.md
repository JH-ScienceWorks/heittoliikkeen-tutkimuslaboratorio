# Projektin loppuauditointi

Auditointi kattaa fysiikan ja matematiikan, numeerisen laskennan, pedagogisen sisällön, käyttöliittymän, saavutettavuuden, tietoturvan, yksityisyyden sekä koodin rakenteen ennen standalone-version rakentamista.

## Kriittiset havainnot

Ei kriittisiä havaintoja.

## Merkittävät havainnot

1. Tyhjä lukukenttä muuttui JavaScriptin `Number('')`-muunnoksessa hiljaisesti nollaksi. Lisäksi fysiikkaydin ei tarkistanut lähtökulmaa eikä käyttöliittymän ylärajoja. Korjattu keskittämällä äärellisyys- ja rajatarkistukset fysiikkaytimeen sekä hylkäämällä tyhjät arvot käyttöliittymärajalla.
2. Erittäin pitkä lentoaika ja pieni aika-askel saattoivat luoda miljoonia näytteitä. Epävakaa RK4-yhdistelmä saattoi edetä ei-äärellisillä arvoilla virheen varsinaisen syyn kertomatta. Korjattu näyte- ja askelrajoilla sekä ei-äärellisen tilan välittömällä tunnistuksella.
3. Epäonnistunut simulaation nollaus ehti vaihtaa ohjaimen parametrit ennen ratojen onnistunutta laskentaa. Korjattu laskemalla uusi tila ensin paikallisesti ja julkaisemalla se ohjaimelle atomisesti vasta onnistumisen jälkeen.

## Pienet havainnot

1. Vihjesarjaa ei voinut aloittaa uudelleen kolmannen vihjeen jälkeen. Korjattu kiertäväksi ja painikkeen tilaa kuvaavalla tekstillä.
2. Simulaation tilamuutoksilla ei ollut erillistä ruudunlukijan live-aluetta. Korjattu lisäämällä tilatekstille kohtelias `status`-alue ilman jatkuvasti muuttuvan ajan sisällyttämistä ilmoitukseen.
3. Canvas-kuvaajien rooli ei ollut eksplisiittinen. Korjattu lisäämällä `role="img"` olemassa olevien nimien ja tekstiyhteenvetojen rinnalle.
4. Tulosrivit rakennettiin `innerHTML`-merkkijonolla, vaikka sisältö oli vain sovelluksen sisäistä dataa. Korjattu käyttämään turvallisia DOM-solmuja ja `textContent`-ominaisuutta.
5. Dynaamisten taulukoiden otsikkosoluilta puuttui `scope`. Korjattu sarake- ja riviotsikoihin.
6. Yksi askel -painike jäi aktiiviseksi simulaation päätyttyä. Korjattu disabled-tilalla.
7. X-akselin ensimmäinen tai viimeinen merkintä saattoi pitkällä tekstillä leikkautua Canvasin reunaan. Korjattu tasaamalla reunimmaiset merkinnät sisäänpäin.

## Pelkät jatkokehitysehdotukset

- Standalone-version sisällön suojauskäytäntö, tiedostokoon optimointi ja lopullinen paketointitarkistus tehdään vasta erillisessä standalone-vaiheessa.
- Ruudunlukijan todellinen ilmoitusrytmi, selainkohtainen Canvas-tekstin rasterointi ja kaikki responsiiviset näkymät varmistetaan vielä ihmisen manuaalisessa Firefox-, Chrome- ja ruudunlukijakatselmuksessa.

## Tarkastuksen johtopäätökset

- Analyyttisen mallin yhtälöt, alkuarvokomponentit ja tunnusluvut ovat johdonmukaiset.
- RK4-toteutus ja maaosuman askeleensisäinen juurihaku vastaavat tarkoitettua mallia. Vastuksettomassa vakion kiihtyvyyden tapauksessa RK4:n poikkeuksellisen hyvä tarkkuus kuvataan pedagogisesti oikein.
- Neliöllinen vastus käyttää muotoa $\mathbf{F}_d=-k|\mathbf{v}|\mathbf{v}$, jossa $k$:n yksikkö on kg/m, ja kiihtyvyydessä vaikutus skaalautuu suhteella $k/m$.
- Fysikaalisen mallin ja ratkaisumenetelmän ero, `k=0`-ratojen päällekkäisyys sekä ratakuvan mittakaavat selitetään oikein.
- Automaattinen palaute tarkistaa kokeiden määrää ja parametreja, ei väitä arvioivansa vapaamuotoisen tekstin tieteellistä laatua.
- Sovelluskoodi ei käytä verkkopyyntöjä, analytiikkaa, evästeitä, pysyvää selaintallennusta, dynaamista koodinsuoritusta tai ulkoisia resursseja. Oppilaan teksti käsitellään tekstinä ja säilyy vain muistissa.

## Suoritetut automaattiset tarkistukset

- Koko regressiotestistö: 64/64 hyväksytty.
- Analyyttisen ja vastuksettoman RK4-ratkaisun erillinen 384 tapauksen parametriruudukko: suurin kantamapoikkeama $5{,}66\cdot10^{-11}$ m, suurin lentoaikapoikkeama $1{,}87\cdot10^{-12}$ s ja maaosuman korkeuspoikkeama 0 m.
- Vastuskertoimen ja massan suuntavaikutusten parametrivarmennus: hyväksytty.
- JavaScript-syntaksitarkistus kaikille sovellus- ja testitiedostoille: hyväksytty.
- Staattinen saavutettavuus- ja responsiivisuusauditointi: hyväksytty kaikissa määritellyissä leveys- ja zoomausskenaarioissa.
- Resurssi-, tietoturva- ja yksityisyystarkistus: 14 paikallista resurssiviittausta löytyi, puuttuvia resursseja tai kiellettyjä rajapintoja ei löytynyt 22 tarkastetusta tekstitiedostosta.
- Keskeisten tekstin ja taustan väriyhdistelmien WCAG-kontrastitarkistus: kaikki tarkistetut parit ylittivät suhteen 4,5:1.

## Manuaalisesti vielä varmistettavat asiat

- Firefoxin ja Chromen todellinen piirto ja näppäimistöjärjestys Windowsissa.
- Leveät, 1000–1100 pikselin, kapeat sekä 125 % ja 150 % zoomatut näkymät oikeissa selaimissa.
- Canvas-tekstien selainkohtainen sijoittuminen ja pitkien akselimerkintöjen leikkautumattomuus.
- Ruudunlukijan, ensisijaisesti NVDA:n, ilmoitukset simulaation tilan muuttuessa sekä Canvas-yhteenvetojen luettavuus.
- Kaikkien kolmen tutkimustehtävän pitkäkestoinen opiskelijakäyttö ja ohjetekstien ymmärrettävyys.

## Valmiusarvio

Koodin, fysiikan, numeriikan, paikallisten resurssien ja automaattisten tarkistusten perusteella projekti on valmis standalone-version teknisen rakentamisen aloittamiseen. Jaettavan version lopullinen hyväksyntä edellyttää vielä yllä lueteltua ihmisen tekemää Firefox-, Chrome- ja ruudunlukijakatselmusta. Tässä auditointikierroksessa standalone-versiota ei rakennettu.
