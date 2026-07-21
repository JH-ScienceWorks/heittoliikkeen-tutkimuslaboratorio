# Fysiikan tutkimuslaboratorio: heittoliike ja mallien vertailu

## Toteutuspäätös ja MVP-rajaus (12.7.2026)

Ensimmäinen toimiva versio toteutetaan täysin offline-toimivana selainprojektina käyttäen vain HTML:ää, CSS:ää ja modernia vanilla JavaScriptiä. Projekti ei käytä Reactia, TypeScriptiä, npm:ää, build-työkaluja, CDN-palveluja, ulkoisia kirjastoja, verkkofontteja eikä API-palveluja. Sovelluksen tulee toimia Windowsissa Firefoxilla ja Chromella avaamalla `index.html` suoraan tiedostoselaimesta.

Kehitysversio säilytetään usean tiedoston projektina. Fysiikkaydin, RK4-integraattori, simulaation ohjaus, käyttöliittymä, Canvas-kuvaajat ja automaattiset testit erotetaan tarkoituksenmukaisiin tiedostoihin. Tavalliset skriptit ladataan määrätysti ilman ES-moduuleja, jotta `file://`-käynnistys toimii selainten paikallistiedostorajoituksista huolimatta.

MVP sisältää:

- analyyttisen ilmanvastuksettoman heittoliikkeen
- numeerisen RK4-ratkaisun ilman ilmanvastusta
- numeerisen RK4-ratkaisun neliöllisellä ilmanvastuksella
- lähtönopeuden, lähtökulman, lähtökorkeuden, massan, gravitaation, vastuskertoimen ja aika-askeleen säätimet yksikköineen
- käynnistyksen, tauon, yhden aika-askeleen ja nollauksen
- synkronoidun ratakuvan, animaation ja lukuarvot
- paikka- ja nopeuskuvaajat ilman ulkoisia kuvaajakirjastoja
- lentoajan, lakikorkeuden, kantaman ja osumanopeuden
- analyyttisen ja numeerisen vastuksettoman ratkaisun vertailun
- maaosuman tarkan paikantamisen aika-askeleen sisältä
- fysiikkaytimen automaattiset testit tunnetuille analyyttisille tapauksille

Ensimmäisestä versiosta rajataan pois tutkimustehtäväjärjestelmä, CSV-vienti, tuuli, lineaarinen ilmanvastus sekä muut jatkokehitysominaisuudet. Arkkitehtuuri säilyttää erilliset voima-, integraattori-, ohjaus- ja esitysvastuut, jotta ominaisuuksia voidaan lisätä myöhemmin.

Tämä toteutuspäätös korvaa jäljempänä mainitut React- ja TypeScript-suositukset ensimmäisen version osalta. Jäljempänä kuvattu laajempi suunnitelma säilyy jatkokehityksen viitekehyksenä.

## Pedagoginen versio: ratakuvan mittakaava ja tutkimustehtävät (13.7.2026)

MVP:tä laajennetaan kahdella toisiaan tukevalla kokonaisuudella ilman fysiikkaytimen muuttamista.

Ratakuvan oletustila on **Oikea mittakaava**, jossa yksi metri vastaa samaa pikselimäärää x- ja y-suunnassa. Tällöin lähtökulma ja radan geometrinen muoto näkyvät oikeassa suhteessa, vaikka kuvaan jäisi tyhjää tilaa. Vaihtoehtoinen **Sovita kuvaajaan** -tila käyttää erillisiä akseliskaaloja ja näyttää aina varoituksen geometrisesta vääristymästä. Kaikki kolme mallia käyttävät molemmissa tiloissa yhteistä koordinaattimuunnosta. Ratakuvaan lisätään oletuksena näkyvä alkunopeusvektori, vaakasuuntainen vertailuviiva, kulmakaari ja lähtökulman numeerinen arvo. Piirtojärjestelmä erottaa data-alueen, koordinaattimuunnoksen ja vektorikerroksen, jotta uusia fysikaalisia vektoreita voidaan lisätä myöhemmin.

Tutkimustehtäväpaneeli sisältää rakenteisena datana kolme tehtävää:

1. lähtökulma, kantama ja komplementtikulmat
2. neliöllisen ilmanvastuksen vaikutus sekä fysikaalisen mallin ja ratkaisumenetelmän erottaminen
3. RK4-aika-askeleen vaikutus virheeseen ja laskennan määrään

Jokaisessa tehtävässä on tavoite, tehtävänanto, hypoteesi, ehdotetut kokeet, istunnon aikainen havaintotaulukko, päätelmä, vihjeet, kevyt automaattinen palaute ja tehtäväkohtainen nollaus. Oppilaan tekstit ja havainnot säilyvät vain nykyisen sivuistunnon muistissa. Versio ei käytä `localStoragea`, evästeitä, analytiikkaa, verkkopyyntöjä eikä käyttäjätilejä.

Automaattinen palaute arvioi vain havaintojen määrää, vaadittujen parametriarvojen vaihtelua ja kokeen asetusten soveltuvuutta. Se ei arvioi vapaamuotoisen hypoteesin tai päätelmän tieteellistä laatua.

Tehtäväkohtaiset lähtöasetukset tarkennetaan seuraavasti: tehtävä 1 käyttää arvoa `k=0` ja kertoo ratojen odotetusta päällekkäisyydestä; tehtävä 2 käynnistyy arvolla `k=0,02 kg/m` ja käyttää positiivisia vertailuarvoja 0,005, 0,02 ja 0,05 kg/m; tehtävä 3 käyttää arvoja $\Delta t=0{,}5$, $0{,}2$, $0{,}05$ ja $0{,}01$ s sekä näyttää aidot RK4-laskentapisteet. Tehtävä 3 erottaa tunnuslukuvirheen, maaosuman juurihakutarkennuksen, kuvaajan näytteistyksen, laskenta-askeleet ja laskentapisteet toisistaan.

Sovelluksen käynnistystila on neutraali vapaan tutkimisen perusnäkymä: mikään tutkimustehtävä ei ole aktiivinen eikä tehtäväkohtaisia asetuksia sovelleta ennen käyttäjän valintaa. Tehtävävalikon ensimmäinen vaihtoehto on “Valitse tutkimustehtävä”. Perusnäkymään palautus tyhjentää kaikki tehtäväistunnot ja palauttaa yleiset asetukset, oikean mittakaavan sekä alkunopeusvektorin. Tehtäväkohtainen nollaus säilyttää aktiivisen tehtävän mutta tyhjentää sen vastaukset ja palauttaa sen omat lähtöasetukset.

Ensimmäisen pedagogisen version viimeistely keskittyy responsiivisuuteen, näppäimistökäyttöön, näkyviin fokus- ja toimintatiloihin, Canvas-kuvaajien tekstiyhteenvetoihin sekä vastuksettoman ja ilmanvastuksellisen mallin hetkellisten arvojen rinnakkaiseen vertailuun. Uudet fysiikkamallit ja lennon hetkelliset nopeus-, kiihtyvyys- sekä voimavektorit rajataan versioon 1.1.

Julkaisua edeltävässä loppuauditoinnissa syötteiden rajat keskitetään fysiikkaytimeen ja tyhjät arvot hylätään käyttöliittymärajalla. Analyyttisten näytteiden ja RK4-askelten määrälle asetetaan suojarajat, ja neliöllisen vastuksen kiinteäaskelinen laskenta hylkää ennalta selvästi epävakaat parametriyhdistelmät. Simulaation nollaus päivittää ohjaimen tilan atomisesti vasta kaikkien ratojen onnistuneen laskennan jälkeen. Kolmiportainen vihjesarja voidaan aloittaa uudelleen kolmannen vihjeen jälkeen, mutta tehtävän vaihto ja tehtäväkohtainen nollaus palauttavat sen alkutilaan. Tarkemmat havainnot kirjataan tiedostoon `AUDIT_REPORT.md`.

## 1. Pedagogiset tavoitteet

Sovellus tukee lukion fysiikan opiskelijaa siirtymään kaavojen käyttämisestä mallien tutkimiseen. Keskeinen tavoite on ymmärtää, että fysikaalinen malli on oletuksiin perustuva kuvaus todellisuudesta.

Opiskelija oppii:

- hajottamaan alkunopeuden vaaka- ja pystysuuntaisiin komponentteihin
- yhdistämään paikan, nopeuden ja kiihtyvyyden toisiinsa
- tunnistamaan ilmanvastuksettoman heittoliikkeen paraabeliksi
- laskemaan lentoajan, lakikorkeuden ja kantaman analyyttisesti
- vertaamaan analyyttistä ja numeerista ratkaisua
- tutkimaan lineaarisen ja neliöllisen ilmanvastuksen vaikutuksia
- tulkitsemaan paikka-, nopeus-, kiihtyvyys- ja energiakuvaajia
- ymmärtämään numeerisen aika-askeleen vaikutuksen tarkkuuteen
- arvioimaan mallin oletuksia, rajoituksia ja soveltuvuutta
- muodostamaan hypoteeseja sekä perustelemaan päätelmiä mittausten ja kuvaajien avulla

Sovellus ei anna vain lopputuloksia, vaan ohjaa tutkimussykliin:

```text
Kysymys → hypoteesi → parametrien valinta → simulointi
        → havaintojen keruu → mallien vertailu → johtopäätös
```

## 2. Sovelluksen toimintalogiikka

### Päänäkymä

Työtila jaetaan neljään synkronoituun alueeseen:

1. **Ohjauspaneeli**
   - alkunopeus $v_0$
   - lähtökulma $\theta$
   - lähtökorkeus $y_0$
   - massa $m$
   - gravitaatio $g$
   - ilmanvastusmalli
   - vastuskerroin
   - numeerinen aika-askel $\Delta t$

2. **Animaatio**
   - kappaleen reaaliaikainen liike
   - analyyttisen ja numeerisen mallin radat eri väreillä
   - nopeus- ja kiihtyvyysvektorit
   - liikeradan jälki
   - mittakaava, maa ja tarvittaessa koordinaatisto

3. **Synkronoidut kuvaajat**
   - $x(t)$ ja $y(t)$
   - $v_x(t)$, $v_y(t)$ ja nopeuden suuruus
   - $a_x(t)$ ja $a_y(t)$
   - liike- ja potentiaalienergia sekä kokonaisenergia
   - vaihtoehtoisesti ratakuvaaja $y(x)$

4. **Tutkimuspaneeli**
   - tehtävänanto
   - hypoteesikenttä
   - mittaus- ja havaintotaulukko
   - vihjeet
   - päätelmäkenttä
   - automaattisesti tarkistettavat osatehtävät

### Simuloinnin tilat

Simulaatiolla on selkeä tilakone:

```text
VALMIS → KÄYNNISSÄ → TAUKO → KÄYNNISSÄ
   ↑          ↓          ↓
   └────── PÄÄTTYNYT ←───┘
```

Toiminnot:

- Käynnistä
- Tauko/jatka
- Yksi aika-askel
- Nollaa
- Hidasta/nopeuta esitystä
- Siirry aikajanalla
- Näytä tai piilota malleja ja vektoreita

Parametrien muuttaminen nollaa simulaation oletusarvoisesti. Vaihtoehtoisessa vertailutilassa aiempi koe voidaan säilyttää haaleana vertailuratana.

### Mallien vertailu

Sovelluksessa voidaan näyttää yhtä aikaa:

- analyyttinen ratkaisu ilman ilmanvastusta
- numeerinen ratkaisu ilman ilmanvastusta
- numeerinen ratkaisu ilmanvastuksella

Tämä mahdollistaa kaksi erilaista vertailua:

- **menetelmävertailu:** analyyttinen vs. numeerinen ratkaisu samalla fysikaalisella mallilla
- **mallivertailu:** ilmanvastukseton vs. ilmanvastuksellinen liike

Käyttöliittymän on erotettava nämä toisistaan selvästi. Muuten opiskelija voi tulkita numeerisen virheen ilmanvastuksen fysikaaliseksi vaikutukseksi.

### Tapahtumien synkronointi

Yksi simulaation aikamuuttuja ohjaa animaatiota, kuvaajia ja lukuarvoja. Kun käyttäjä liikuttaa aikajanaa, kaikkien näkymien tulee siirtyä samaan ajanhetkeen.

Merkitään ainakin:

- lähtöhetki
- lakikorkeus
- osuma maahan
- mahdollinen vertailumallien suurimman eron hetki

Maaosuma ratkaistaan tarkemmin kuin pelkällä ensimmäisellä negatiivisella $y$-arvolla. Viimeisten pisteiden väliin tehdään interpolointi tai tapahtuman juurihaku.

## 3. Matemaattiset mallit

Koordinaatisto:

- $x$: vaakasuoraan oikealle
- $y$: pystysuoraan ylöspäin
- maanpinta: $y=0$

Alkunopeuden komponentit:

$$
v_{0x}=v_0\cos\theta,\qquad
v_{0y}=v_0\sin\theta.
$$

### Analyyttinen malli ilman ilmanvastusta

Oletukset:

- gravitaatiokenttä on vakio
- ilmanvastusta ei ole
- kappale on pistemäinen
- maan kaarevuus ja pyöriminen sivuutetaan

Liikeyhtälöt:

$$
x(t)=x_0+v_{0x}t,
$$

$$
y(t)=y_0+v_{0y}t-\frac12gt^2,
$$

$$
v_x(t)=v_{0x},
\qquad
v_y(t)=v_{0y}-gt,
$$

$$
a_x=0,
\qquad
a_y=-g.
$$

Lentoaika saadaan yhtälön $y(t)=0$ positiivisesta juuresta:

$$
t_f=
\frac{v_{0y}+\sqrt{v_{0y}^2+2gy_0}}{g}.
$$

Lakikorkeuden hetki ja korkeus:

$$
t_{\max}=\frac{v_{0y}}{g},
$$

$$
y_{\max}=y_0+\frac{v_{0y}^2}{2g},
$$

kun $v_{0y}>0$. Kantama:

$$
R=v_{0x}t_f.
$$

Kun lähtö- ja osumakorkeus ovat samat:

$$
R=\frac{v_0^2\sin(2\theta)}{g}.
$$

### Numeerinen perusmalli

Tilavektori:

$$
\mathbf{s}=(x,y,v_x,v_y).
$$

Differentiaaliyhtälö:

$$
\frac{d\mathbf{s}}{dt}
=
(v_x,v_y,a_x,a_y).
$$

Ensisijaiseksi integraattoriksi sopii neljännen kertaluvun Runge–Kutta-menetelmä eli RK4. Opetuksellisena vaihtoehtona voidaan myöhemmin tarjota Eulerin ja symplektisen Eulerin menetelmät, jotta aika-askeleen vaikutusta voidaan tutkia.

Ensimmäisessä versiossa RK4 vähentää numeeristen virheiden aiheuttamaa hämmennystä. Euler-vertailu kannattaa lisätä vasta erillisenä tutkimusominaisuutena.

### Lineaarinen ilmanvastus

Ilmanvastus:

$$
\mathbf{F}_d=-b\mathbf{v}_{rel},
$$

missä

$$
\mathbf{v}_{rel}=\mathbf{v}-\mathbf{v}_{wind}.
$$

Kiihtyvyys:

$$
\mathbf{a}
=
(0,-g)-\frac{b}{m}\mathbf{v}_{rel}.
$$

Komponentteina ilman tuulta:

$$
a_x=-\frac{b}{m}v_x,
$$

$$
a_y=-g-\frac{b}{m}v_y.
$$

Kertoimen $b$ yksikkö on $\mathrm{kg/s}$.

### Neliöllinen ilmanvastus

$$
\mathbf{F}_d
=
-\frac12\rho C_d A
|\mathbf{v}_{rel}|\mathbf{v}_{rel}.
$$

Määritellään haluttaessa yhdistetty kerroin

$$
k=\frac12\rho C_dA,
$$

jolloin

$$
\mathbf{a}
=
(0,-g)-\frac{k}{m}
|\mathbf{v}_{rel}|\mathbf{v}_{rel}.
$$

Komponentit:

$$
a_x=-\frac{k}{m}|\mathbf{v}_{rel}|v_{rel,x},
$$

$$
a_y=-g-\frac{k}{m}|\mathbf{v}_{rel}|v_{rel,y}.
$$

Kertoimen $k$ yksikkö on $\mathrm{kg/m}$. Käyttöliittymän tulee näyttää yksiköt, koska lineaarisen ja neliöllisen mallin kertoimet eivät ole keskenään suoraan vertailukelpoisia.

### Energia

Ilman ilmanvastusta:

$$
E_k=\frac12m(v_x^2+v_y^2),
$$

$$
E_p=mgy,
$$

$$
E=E_k+E_p.
$$

Kokonaisenergian pitäisi säilyä numeerisen tarkkuuden rajoissa. Ilmanvastuksella mekaaninen energia vähenee. Hävinnyt energia voidaan esittää myös ilmanvastuksen tekemänä työnä:

$$
E_{\mathrm{diss}}(t)=E(0)-E(t).
$$

## 4. Tekninen arkkitehtuuri

Suositeltu toteutus on TypeScript-pohjainen selain­sovellus. Esimerkiksi React sopii käyttöliittymän tilanhallintaan, mutta laskentaydin pidetään kehyksestä riippumattomana.

### Kerrokset

```text
Käyttöliittymä
 ├─ ohjaimet
 ├─ tutkimustehtävät
 └─ saavutettavuus ja lokalisointi
          ↓
Simulaation ohjain
 ├─ tilakone
 ├─ animaatiokello
 └─ aikajanan synkronointi
          ↓
Fysiikkaydin
 ├─ analyyttinen malli
 ├─ vastusmallit
 ├─ integraattorit
 └─ tapahtumien tunnistus
          ↓
Tulosaineisto
 ├─ radat
 ├─ tunnusluvut
 └─ virhe- ja energiadata
          ↓
Animaatio ja kuvaajat
```

### Keskeiset suunnitteluperiaatteet

- Fysiikkalaskenta ei saa riippua käyttöliittymästä.
- Sama simulaatiotulos syötetään sekä animaatiolle että kuvaajille.
- Fysikaaliset suureet säilytetään SI-yksiköissä.
- Näyttöarvojen pyöristys ei saa vaikuttaa laskentaan.
- Simulaatio lasketaan kiinteällä fysiikan aika-askeleella.
- Näytön päivitysnopeus pidetään erillään laskenta-askeleesta.
- Oletusarvoinen koordinaatisto skaalautuu koko rataan, mutta mittasuhteita ei vääristetä.
- Tehtävien sisältö erotetaan ohjelmakoodista rakenteiseksi dataksi.
- Suomenkieliset tekstit keskitetään lokalisointitiedostoon.

Web Workeria ei välttämättä tarvita ensimmäisessä versiossa. Se kannattaa ottaa käyttöön, jos pitkät simulaatiot, erittäin pienet aika-askeleet tai useiden mallien yhtäaikainen laskenta haittaavat käyttöliittymän sujuvuutta.

## 5. Ehdotettu tiedostorakenne

```text
project/
├─ public/
│  └─ assets/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ routes.ts
│  │  └─ appState.ts
│  ├─ physics/
│  │  ├─ types.ts
│  │  ├─ constants.ts
│  │  ├─ initialConditions.ts
│  │  ├─ analyticProjectile.ts
│  │  ├─ derivatives.ts
│  │  ├─ forces/
│  │  │  ├─ noDrag.ts
│  │  │  ├─ linearDrag.ts
│  │  │  └─ quadraticDrag.ts
│  │  ├─ integrators/
│  │  │  ├─ euler.ts
│  │  │  ├─ rk4.ts
│  │  │  └─ integrator.ts
│  │  ├─ events/
│  │  │  ├─ groundImpact.ts
│  │  │  └─ apex.ts
│  │  └─ derivedQuantities.ts
│  ├─ simulation/
│  │  ├─ simulationController.ts
│  │  ├─ simulationState.ts
│  │  ├─ sampler.ts
│  │  └─ comparison.ts
│  ├─ components/
│  │  ├─ Controls/
│  │  ├─ Animation/
│  │  ├─ Charts/
│  │  ├─ Measurements/
│  │  └─ Tasks/
│  ├─ exercises/
│  │  ├─ types.ts
│  │  ├─ taskEngine.ts
│  │  └─ fi/
│  │     ├─ fundamentals.ts
│  │     ├─ dragComparison.ts
│  │     └─ numericalAccuracy.ts
│  ├─ i18n/
│  │  └─ fi.ts
│  ├─ accessibility/
│  │  └─ descriptions.ts
│  ├─ styles/
│  └─ main.tsx
├─ tests/
│  ├─ unit/
│  │  ├─ analyticProjectile.test.ts
│  │  ├─ dragModels.test.ts
│  │  ├─ rk4.test.ts
│  │  └─ events.test.ts
│  ├─ integration/
│  │  ├─ modelComparison.test.ts
│  │  └─ simulationController.test.ts
│  └─ e2e/
│     ├─ basicExperiment.spec.ts
│     └─ accessibility.spec.ts
├─ docs/
│  ├─ pedagogy.md
│  ├─ mathematical-models.md
│  └─ validation.md
└─ package.json
```

## 6. Tutkimustehtävät

Tehtävät kannattaa järjestää kasvavan avoimuuden mukaan.

### Ohjattu tutkimus: lähtökulma ja kantama

- Pidä $v_0$ ja lähtökorkeus vakioina.
- Tutki vähintään kuutta lähtökulmaa.
- Ennusta suurimman kantaman kulma ennen mittaamista.
- Piirrä tai tarkastele kantamaa kulman funktiona.
- Selitä, miksi komplementtikulmat tuottavat ilmanvastuksettomassa mallissa saman kantaman, kun alku- ja loppukorkeus ovat samat.

### Mallien vertailu

- Valitse sama alkutila kaikille malleille.
- Vertaa lentoaikaa, lakikorkeutta, kantamaa ja osumanopeutta.
- Selvitä, missä vaiheessa radat alkavat erota selvästi.
- Arvioi, milloin ilmanvastukseton malli on käyttökelpoinen.

### Massan vaikutus

- Tutki massan vaikutusta ilmanvastuksettomassa mallissa.
- Toista koe ilmanvastuksella muuttamatta kappaleen muita ominaisuuksia.
- Selitä, miksi massa vaikuttaa malleissa eri tavoin.

Tehtävänannossa on huomautettava, että todellisten kappaleiden massan muuttaminen voi samalla muuttaa pinta-alaa ja vastuskerrointa. Simulaatiossa nämä voidaan tarkoituksella pitää erillisinä muuttujina.

### Numeerisen menetelmän tarkkuus

- Aseta ilmanvastus nollaksi.
- Vertaa numeerista tulosta analyyttiseen ratkaisuun.
- Toista koe eri aika-askelilla.
- Tutki osumapaikan virhettä ja energian säilymistä.
- Päättele, miten aika-askel vaikuttaa tarkkuuteen ja laskennan määrään.

### Avoin tutkimustehtävä

> Millä lähtökulmalla kappale saavuttaa suurimman kantaman neliöllisessä ilmanvastuksessa valituilla kappaleen ominaisuuksilla?

Opiskelija määrittelee muuttujat, mittausvälin ja kulman tarkennusmenetelmän itse.

## 7. Testitapaukset

### Fysiikkaytimen yksikkötestit

1. **Vapaa pudotus levosta**
   - $v_0=0$, $y_0=20\ \mathrm m$
   - numeerisen ja analyyttisen putoamisajan tulee täsmätä määritellyn toleranssin sisällä
2. **Vaakasuora heitto**
   - $\theta=0^\circ$
   - ilman vastusta $v_x$ pysyy vakiona
   - $x(t)$ kasvaa lineaarisesti
3. **Pystysuora heitto**
   - $\theta=90^\circ$
   - $x(t)$ pysyy vakiona liukulukutoleranssin sisällä
4. **Tunnettu kantama**
   - $y_0=0$, $v_0=10\ \mathrm{m/s}$, $\theta=45^\circ$, $g=10\ \mathrm{m/s^2}$
   - kantama $10\ \mathrm m$
   - lentoaika $\sqrt2\ \mathrm s$
   - lakikorkeus $2{,}5\ \mathrm m$
5. **Komplementtikulmat**
   - $30^\circ$ ja $60^\circ$
   - sama kantama ilmanvastuksettomassa mallissa samalla lähtö- ja loppukorkeudella
6. **Massa ilman ilmanvastusta**
   - lentorata ei muutu massaa vaihdettaessa
7. **Vastuksen suunta**
   - ilmanvastusvoiman pistetulon suhteellisen nopeuden kanssa tulee olla epäpositiivinen:
   $$\mathbf F_d\cdot\mathbf v_{rel}\le 0$$
8. **Nollavastus**
   - numeerinen vastusmalli kertoimella nolla lähestyy analyyttistä rataa
9. **Konvergenssi**
   - aika-askeleen pienentämisen tulee pienentää RK4-ratkaisun virhettä
10. **Energia**
    - ilmanvastuksettomassa mallissa kokonaisenergia säilyy toleranssin sisällä
    - ilmanvastuksella mekaaninen energia ei kasva tuulettomassa tapauksessa
11. **Maaosuma**
    - palautettu loppupiste täyttää $y\approx0$
    - simulaatio ei piirrä pitkää maanalaista rataosuutta
12. **Poikkeavat alkuarvot**
    - pieni ja suuri nopeus
    - negatiivinen lähtökulma lähtökorkeudelta
    - hyvin pieni massa
    - suuri vastuskerroin
    - syötteet eivät saa tuottaa `NaN`- tai äärettömiä arvoja

### Integraatio- ja käyttöliittymätestit

- parametrin muutos päivittyy kaikkiin malleihin
- animaation piste ja kuvaajien aikakursori vastaavat samaa tilaa
- tauko ei muuta simulaatioaikaa
- nollaus palauttaa lähtötilan
- yksiköt ja desimaalierotin esitetään johdonmukaisesti
- mallien värit ja viivatyylit ovat samat animaatiossa ja kuvaajissa
- käyttö onnistuu näppäimistöllä
- väri ei ole ainoa mallien erottelukeino
- käyttöliittymä toimii tavallisilla kannettavan tietokoneen ja tabletin leveyksillä

## 8. Vaiheittainen toteutussuunnitelma

### Vaihe 1: Rajaus ja pedagoginen prototyyppi

- määritellään kohderyhmä ja esitiedot
- valitaan ensimmäisen version tutkimustehtävät
- luonnostellaan työtilan käyttöpolku
- sovitaan suureet, yksiköt, oletusarvot ja sallitut vaihteluvälit
- päätetään, sisältyykö ensimmäiseen versioon sekä lineaarinen että neliöllinen vastus

Ensimmäiseen julkaistavaan versioon suosittelen neliöllistä vastusta ja vastuksetonta mallia. Lineaarinen malli voidaan lisätä vertailulaajennuksena.

### Vaihe 2: Kehysriippumaton fysiikkaydin

- tietotyypit ja yksikkökäytännöt
- analyyttinen ratkaisu
- voimamallit
- RK4-integraattori
- maaosuman ja lakikorkeuden tunnistus
- johdettujen suureiden laskenta
- yksikkötestit ja vertailuarvot

Tässä vaiheessa ei tarvita animaatiota.

### Vaihe 3: Simulaation ohjain

- tilakone
- kiinteä laskenta-askel
- tulosten näytteenotto kuvaajille
- toisto, tauko, nollaus ja aikajana
- useiden mallien yhteinen aikakanta

### Vaihe 4: Pienin toimiva käyttöliittymä

- parametrisäätimet
- ratakuva
- käynnistys- ja nollauspainikkeet
- lentoajan, kantaman ja lakikorkeuden tulokset
- syötteiden validointi

### Vaihe 5: Synkronoidut kuvaajat

- paikan ja nopeuden kuvaajat
- yhteinen aikakursori
- tapahtumamerkit
- mallien näkyvyyden valinta
- kuvaajien automaattinen mutta vakaa skaalaus

### Vaihe 6: Mallien vertailu ja numeerinen tarkkuus

- analyyttinen ja numeerinen ratkaisu rinnakkain
- erotuksen esittäminen
- aika-askeleen säätö
- virhemittarit
- energiakuvaaja

### Vaihe 7: Tutkimustehtäväjärjestelmä

- rakenteiset tehtävämäärittelyt
- hypoteesi-, havainto- ja päätelmäkentät
- mittausten tallennus taulukkoon
- vihjeet ja osittainen automaattinen palaute
- kokeen palautus tai vienti esimerkiksi CSV-muotoon myöhemmässä versiossa

### Vaihe 8: Saavutettavuus ja viimeistely

- näppäimistökäyttö
- ruudunlukijatekstit
- vaihtoehtoinen sanallinen kuvaus animaatiosta
- värisokeille sopivat värit ja viivatyylit
- responsiivisuus
- suomenkielinen terminologia ja numeroiden esitystapa

### Vaihe 9: Validointi opetuskäytössä

- opettajan asiantuntija-arvio
- pieni opiskelijapilotti
- havaitaan käsitteelliset väärintulkinnat
- mitataan, auttaako käyttöliittymä todella mallien vertailussa
- korjataan tehtävien ohjeistus ennen laajempaa julkaisua

## 9. Vaikeimmat ja riskialtteimmat kohdat

### Mallien käsitteellinen erottaminen

Suurin pedagoginen riski on, että opiskelija sekoittaa fysikaalisen mallin ja ratkaisumenetelmän. Käyttöliittymässä tulee ilmaista erikseen:

- mikä voimamalli on käytössä
- ratkaistaanko se analyyttisesti vai numeerisesti
- mikä ero aiheutuu ilmanvastuksesta
- mikä ero aiheutuu numeerisesta virheestä

### Aika-askeleen ja animaation erottaminen

Jos fysiikan laskenta sidotaan näytön kuvataajuuteen, tulokset voivat riippua laitteen suorituskyvystä. Simulaation tulee käyttää kiinteää laskenta-askelta ja interpoloida animaation näyttötila erikseen.

### Maaosuman täsmällinen tunnistus

Suurella aika-askeleella kappale voi siirtyä yhden askeleen aikana maan yläpuolelta selvästi maan alle. Tämä vääristää lentoaikaa, kantamaa ja osumanopeutta. Tapahtuma täytyy paikantaa askeleen sisältä.

### Kuvaajien ja animaation synkronointi

Kaikkien näkymien on perustuttava samaan tulosaineistoon ja samaan aikakursoriin. Erilliset laskennat voivat tuottaa pieniä mutta opetuksellisesti häiritseviä eroja.

### Skaalaus ja vertailtavuus

Automaattinen skaalaus voi saada kaksi erilaista rataa näyttämään samankaltaisilta. Toisaalta kiinteä asteikko voi tehdä pienistä radoista lähes näkymättömiä. Vertailutilassa asteikko on lukittava yhteiseksi, ja mittakaavan muutoksesta on kerrottava käyttäjälle.

### Vastuskertoimien ymmärrettävyys

Lineaarisen $b$:n ja neliöllisen $k$:n yksiköt sekä merkitys ovat erilaiset. Epäselvä yleinen “ilmanvastus”-liukusäädin johtaisi helposti virhepäätelmiin. Käyttöliittymässä tarvitaan mallikohtaiset nimet, yksiköt ja selitykset.

### Liian suuri ominaisuusmäärä

Tuuli, kappaleen pyöriminen, Magnus-ilmiö, muuttuva ilman tiheys ja kolmiulotteinen liike ovat kiinnostavia, mutta heikentäisivät ensimmäisen version pedagogista fokusta. Ne kannattaa rajata jatkokehitykseen.

### Näennäinen fysikaalinen realismi

Tarkka animaatio voi näyttää todemmalta kuin malli on. Sovelluksen on näytettävä mallin oletukset ja muistutettava, ettei esimerkiksi vakioinen $C_d$ kuvaa kaikkia nopeusalueita tai kappaleita täydellisesti.

## 10. Ensimmäisen version hyväksymiskriteerit

Ensimmäinen varsinainen toteutus voidaan katsoa onnistuneeksi, kun:

- analyyttinen ja numeerinen vastukseton ratkaisu täsmäävät sovitulla toleranssilla
- neliöllinen ilmanvastus voidaan kytkeä päälle ja sen parametrit ovat yksiköllisiä
- animaatio, lukuarvot ja vähintään paikka- sekä nopeuskuvaajat ovat synkronoituja
- lakikorkeus, lentoaika, kantama ja osuma tunnistetaan luotettavasti
- opiskelija voi suorittaa vähintään kolme ohjattua tutkimustehtävää
- numeerisen aika-askeleen vaikutusta voidaan tutkia
- sovellus toimii ilman hiirtä ja erottaa mallit myös ilman värejä
- fysiikkaydin läpäisee tunnettuja analyyttisiä tapauksia koskevat testit.
