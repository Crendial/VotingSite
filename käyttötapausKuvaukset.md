# Rekisteröityminen
**Käyttäjät:** Normaalit käyttäjät ja ylläpitäjät.
**Laukaisija:** Käyttäjä/ylläpitäjä avaa rekisteröinti paneelin, täyttää tiedot ja painaa rekisteröi painiketta.
**Esiehto:** Käyttäjä ei ole kirjautunut sisään ja hänellä ei ole käyttäjää.
**Jälkiehto:** Käyttäjä voi kirjautua sisään uusilla tunnuksilla.
**Käyttötapauksen kulku:**
1. Käyttäjä avaa rekisteröitymis paneelin sivun yläreunassa löytyvästä "Rekisteröidy" painikkeesta.
2. Käyttäjä täyttää tiedot (Käyttäjänimi ja salasana)
3. Käyttäjä painaa rekisteröitymis paneelin sisäistä "rekisteröidy" painiketta ja sivu tallentaa tiedot.
**Poikkeuksellinen toiminta:**
1. Käyttäjä jättää käyttäjänimen tyhjäksi ja yrittää rekisteröityä - Sivu ei hyväksy painallusta ja laittaa käyttäjänimi laatikon alle muistutuksen pakollisuudesta.
2. Käyttäjä jätttää salasanan tyhjäksi ja yrittää rekisteröityä - Sivu ei hyväksy painallusta ja laittaa salasana laatikon alle muisttutuksen pakollisuudesta.
3. Käyttäjä yrittää toisen käyttäjän käyttäjänimeä rekisteröidessä - Sivu tarkistaa, onko toisella käyttäjällä kyseistä käyttäjänimeä jo käytössä, jos on, painallus ei mene läpi ja käyttäjänimi laatikon alle tulee huomautus.

# Sisäänkirjautuminen
**Käyttäjät:** Normaalit käyttäjät ja ylläpitäjät.
**Laukaisija:** Käyttäjä/ylläpitäjä avaa kirjautumis paneelin, täyttää tiedot ja painaa kirjaudu sisään painiketta.
**Esiehto:** Käyttäjällä/ylläpitäjällä on sivun muistissa käyttötunnukset.
**Jälkiehto:** Sivu näyttää tällä hetkellä olemassa olevat äänestykset, uloskirjautumis napin ja ylläpitäjille heidän toimintoihinsa liittyvät käyttöliittymät.
**Käyttötapauksen kulku:**
1. Käyttäjä avaa kirjautumis paneelin sivun yläreunassa löytyvästä "Kirjaudu sisään" painikkeesta.
2. Käyttäjä täyttää käyttäjänimi ja salasana kentät tunnuksillaan.
3. Käyttäjä painaa paneelin sisäistä "Kirjaudu sisään" painiketta.
4. Sivu rakentaa itsensä uudelleen siten, että tämän hetkiset äänestykset, käyttäjänimi, log out painike ja ylläpitäjän käyttöliittymät ovat saatavilla ylläpitäjille.
**Poikkeuksellinen toiminta:**
1. Käyttäjä yrittää olematonta käyttäjänimeä - Sivu ei hyväksy painallusta ja laittaa käyttäjänimi laatikon alle huomautuksen.
2. Käyttäjä yrittää väärää salasanaa - Sivu ei hyväksy painallusta ja huomauttaa väärästä salasanasta.
3. Käyttäjä jättää yhden tai molemmat laatikot tyhjäksi - yksi aiemmista huomautuksista aktivoituu.

# Uloskirjautuminen
**Käyttäjät:** Normaalit käyttäjät ja ylläpitäjät.
**Laukaisija:** Käyttäjä painaa "Log Out" näppäintä oikeassa ylänurkassa.
**Esiehto:** Käyttäjä on kirjautunut sisään.
**Jälkiehto:** Sivu resetoituu tilaan ennen sisään kirjautumista.
**Käyttötapauksen kulku:**
1. Käyttäjä painaa "Log Out" painiketta.
2. Sivu resetoituu.
**Poikkeuksellinen toiminta:**
Ei ole.

# Äänestyksiin äänestäminen
**Käyttäjät:** Normaalit käyttäjät ja ylläpitäjät.
**Laukaisija:** Käyttäjä valitsee äänestyksen, valitsee yhden vaihtoehdon ja konfirmoi äänen.
**Esiehto:** Käyttäjä/ylläpitäjä on kirjautunut sisään sivulle ja ei ole äänestänyt valitussa äänestyksessä.
**Jälkiehto:** Äänestys näyttää äänet prosentteina ja sallii äänen perumisen.
**Käyttötapauksen kulku:** 
1. Käyttäjä sisäänkirjautuneena selaa äänetyksiä.
2. Käyttäjä valitsee mieleisensä äänestyksen.
3. Käyttäjä valitsee yhden kahdesta vaihtoehdosta.
4. Käyttäjä painaa "Vote" näppäintä äänestyksen ala-osassa.
5. Sivu lisää äänen äänestyksen dataan.
6. Sivu päivitää äänestyksen tilan äänestetyksi, joka näyttää molempien vaihtoehtojen osuuden prosenttina ja "cancel vote" napin.
**Poikkeuksellinen toiminta:**
1. Käyttäjä yrittää äänestää valitsematta kumpaakaan vaihtoehtoa - Sivu ei reagoi painallukseen.

# Äänestysten luonti
**Käyttäjät:** Ylläpitäjät
**Laukaisija:** Käyttäjä painaa oikeassa ylänurkassa olevaa "Make poll" näppäintä, täyttää tiedot ja painaa paneelin sisäistä "make" näppäintä.
**Esiehto:** Käyttäjä on ylläpitäjä ja kirjautunut sisään.
**Jälkiehto:** Äänestys listaan tulee uusi äänestys ja sivu reagoi sen mukaan.
**Käyttötapauksen kulku:**
1. Käyttäjä klikkaa "Make poll" näppäintä oikeassa ylänurkassa, joka avaa paneelin.
2. Käyttäjä täyttää äänestyksen tiedot ja painaa "make" näppäintä.
3. Sivu lisää äänestyksen äänestysten listaan ja uudelleen luo sivun äänestys osion.
**Poikkeuksellinen toiminta:**
1. Tietoja jätetään tyhjäksi - sivu jatkaa toimintaa normaalisti, toiminta ei muutu, antaa mahdollisuuden tyhjille vaihtoehdoille ja nimille huumorin nimissä.

# Äänestysten poisto
**Käyttäjät:** Ylläpitäjät
**Laukaisija:** Käyttäjä painaa oikeassa ylänurkassa olevaa "Delete poll" näppäintä, joka näyttää kaikkien aktiivisien äänestyksien nimet ja delete vaihtoehdon. Deleten painallus.
**Esiehto:** Käyttäjä on ylläpitäjä ja on kirjautunut sisään.
**Jälkiehto:** Äänestys poistuu äänestysten listalta ja sivu reagoi sen mukaan.
**Käyttötapauksen kulku:**
1. Käyttäjä klikkaa "Delete poll" näppäintä oikeassa ylänurkassa, joka avaa paneelin.
2. Paneelissa on lista kaikista äänestyksistä, käyttäjä etsii sen, jonka haluaa poistaa.
3. Käyttäjä painaa delete näppäintä.
4. Sivu poistaa äänesttyksen ID:n mukaan.
5. Sivun äänestyslista sekä poisto paneeli päivvittyy.
**Poikkeuksellinen toiminta:**
Ei ole.
