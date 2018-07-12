const clientId = '5JG3WJRSY1KFDYZWSGGERCQZWH3YP4PKAHJC4SUXOTVT3NP3';
const clientSecret = 'QDVKD503CMIEAEYA2ZPBQSGR1Q5PVGTKQJSRODKPZ4FS2A4K';
const v = '20180712'

export const getVenues = (venue) => 
    fetch(`https://api.foursquare.com/v2/venues/${venue}?client_id=${clientId}&client_secret=${clientSecret}&v=${v}`, {
        headers: {}
    })
    .then(response => response.json())
    .then(r => r)
   