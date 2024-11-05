// Steam API -avain
const apiKey = 'EC5728BA25DE2647D995F373555E2E7C';  // Vaihda tämä omaan API-avaimeesi
const steamId = '76561197970941149';  // Vaihda tämä käyttäjän Steam-ID:hen

// Rakennetaan URL API-pyyntöä varten
const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

// const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;
// https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC5728BA25DE2647D995F373555E2E7C&steamids=76561197970941149
// https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC5728BA25DE2647D995F373555E2E7C&steamids=76561197970941149

// Funktio, joka hakee pelaajan tiedot ja tulostaa ne HTML:hen
aasync function getSteamProfile() {
    try {
        console.log("Aloitetaan pyyntö Steam API:lle...");

        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const steamApiUrl = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC5728BA25DE2647D995F373555E2E7C&steamids=76561197970941149';
        const url = corsProxy + steamApiUrl;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Origin': window.location.origin,
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error(`Virhe API-pyynnössä: ${response.status}`);
        }

        const data = await response.json();

        console.log("Saatiin API-vastaus:", data);

        // Tarkistetaan, että saatiin pelaajatiedot
        if (data.response && data.response.players && data.response.players.length > 0) {
            const playerData = data.response.players[0];

            console.log("Pelaajatiedot:", playerData);

            // Päivitetään HTML-sisältö
            const playerName = document.getElementById('playerName');
            const profileUrl = document.getElementById('profileUrl');
            const profileAvatar = document.getElementById('profileAvatar');

            if (playerName && profileUrl && profileAvatar) {
                // Päivitetään HTML-sisältö pelaajan nimellä
                playerName.textContent = playerData.personaname;
                profileUrl.href = playerData.profileurl;
                profileUrl.textContent = playerData.profileurl;
                profileAvatar.src = playerData.avatarfull;
            } else {
                console.error('Elementtejä ei löytynyt.');
            }
        } else {
            throw new Error('Pelaajatietoja ei löytynyt.');
        }

    } catch (error) {
        console.error('Virhe:', error.message);
        document.getElementById('playerName').textContent = 'Tietojen hakeminen epäonnistui';
        document.getElementById('profileUrl').textContent = 'Yritä myöhemmin uudelleen';
    }
}


// Kutsutaan funktiota
getSteamProfile();
