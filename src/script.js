const locationStatus = document.getElementById('locationStatus');
const placeName = document.getElementById('placeName');
const mapLink = document.getElementById('map');

function getLocation() {
    if (!navigator.geolocation) {
        locationStatus.textContent = 'Geolocation não é suportada pelo seu navegador.';
    } else {
        locationStatus.textContent = 'Localizando…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationStatus.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    mapLink.innerHTML = `<a href="https://www.google.com/maps/@${latitude},${longitude},15z" target="_blank">Ver no Google Maps</a>`;

    // Chama a função para obter o nome do lugar
    getPlaceName(latitude, longitude);
}

function error() {
    locationStatus.textContent = 'Não foi possível obter a sua localização.';
}

// Função para obter o nome do lugar baseado nas coordenadas
function getPlaceName(latitude, longitude) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ 'location': latLng }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                placeName.textContent = `Você está em: ${results[0].formatted_address}`;
            } else {
                placeName.textContent = 'Nenhum resultado encontrado.';
            }
        } else {
            placeName.textContent = `Erro ao obter nome do lugar: ${status}`;
        }
    });
}

document.getElementById('getLocation').addEventListener('click', getLocation);
