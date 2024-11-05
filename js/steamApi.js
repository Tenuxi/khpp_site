// Steam API -avain
const apiKey = 'AF70B0B16442EAAF9938983AB40A402D';  // Vaihda tämä omaan API-avaimeesi
const steamId = '76561197970941149';  // Vaihda tämä käyttäjän Steam-ID:hen

// Rakennetaan URL API-pyyntöä varten
const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

// Funktio, joka hakee pelaajan tiedot ja tulostaa ne HTML:hen
async function getSteamProfile() {
    try {
        // Tehdään GET-pyyntö
        const response = await fetch(url);
        
        // Tarkistetaan, että pyyntö onnistui
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Haetaan JSON-vastaus
        const data = await response.json();

        // Haetaan pelaajan tiedot
        const playerData = data.response.players[0];

        // Päivitetään HTML-sivun sisältö
        document.getElementById('playerName').textContent = playerData.personaname;
        document.getElementById('profileUrl').textContent = playerData.profileurl;

        // (Valinnaisesti) Voit lisätä lisää tietoa kuten kuvaa tai tilastoja
        console.log(`Pelaajan nimi: ${playerData.personaname}`);
        console.log(`Profiilin URL: ${playerData.profileurl}`);
    } catch (error) {
        console.error('Virhe:', error);
        // Jos on virhe, ilmoitetaan käyttäjälle
        document.getElementById('playerName').textContent = 'Tietojen hakeminen epäonnistui';
        document.getElementById('profileUrl').textContent = 'Yritä myöhemmin uudelleen';
    }
}

// Kutsutaan funktiota
getSteamProfile();
