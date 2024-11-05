// Steam API -avain
const apiKey = 'EC5728BA25DE2647D995F373555E2E7C';  // Vaihda tämä omaan API-avaimeesi
const steamId = '76561197970941149';  // Vaihda tämä käyttäjän Steam-ID:hen

// Rakennetaan URL API-pyyntöä varten
const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

// const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;
// https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC5728BA25DE2647D995F373555E2E7C&steamids=76561197970941149
// https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC5728BA25DE2647D995F373555E2E7C&steamids=76561197970941149

// Funktio, joka hakee pelaajan tiedot ja tulostaa ne HTML:hen
async function getSteamProfile() {
    try {
        console.log("Aloitetaan pyyntö Steam API:lle...");

        // Tässä on CORS Anywhere välimuistin osoite ja Steam API URL
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const steamApiUrl = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC5728BA25DE2647D995F373555E2E7C&steamids=76561197970941149';

        const url = corsProxy + steamApiUrl; // Yhdistämme välimuistin ja API-osoitteen

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Origin': window.location.origin, // Lisää Origin-otsikko
                'X-Requested-With': 'XMLHttpRequest' // Lisää X-Requested-With-otsikko
            }
        });

        // Tarkistetaan, että pyyntö onnistui
        if (!response.ok) {
            throw new Error(`Virhe API-pyynnössä: ${response.status}`);
        }

        // Haetaan JSON-vastaus
        const data = await response.json();

        console.log("Saatiin API-vastaus:", data);

        // Tarkistetaan, että saatiin pelaajatiedot
        if (data.response && data.response.players && data.response.players.length > 0) {
            const playerData = data.response.players[0];

            // Päivitetään HTML-sivun sisältö
            document.getElementById('playerName').textContent = playerData.personaname;
            document.getElementById('profileUrl').textContent = playerData.profileurl;
            document.getElementById('profileAvatar').src = playerData.avatarfull;
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
