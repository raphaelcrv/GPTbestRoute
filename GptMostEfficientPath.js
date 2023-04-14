// coordenadas dos pontos turísticos
// coordenadas dos pontos turísticos
const locations = [
  {name: 'Central Park', lat: 40.785091, lng: -73.968285},
  {name: 'Metropolitan Museum of Art', lat: 40.779436, lng: -73.963244},
  {name: 'Estatua da Liberdade', lat: 40.689247, lng: -74.044502},
  {name: 'The Museum of Modern Art', lat: 40.7614327, lng: -73.9776216},
  {name: 'Empire State Building', lat: 40.748817, lng: -73.985428},
  {name: 'Times Square', lat: 40.758899, lng: -73.985071},
  {name: 'Ponte do Brooklyn', lat: 40.706086, lng: -73.996864},
  {name: 'Museu Solomon R. Guggenheim', lat: 40.782979, lng: -73.958971},
  {name: 'Estação Grand Central', lat: 40.752726, lng: -73.977229},
  {name: 'High Line', lat: 40.747993, lng: -74.004765},
  {name: 'Museu Americano de História Natural', lat: 40.7813241, lng: -73.9739882},
  {name: 'Plaza Hotel', lat: 40.7647767, lng: -73.974824},
];

// função para calcular a distância entre duas coordenadas
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// função para encontrar o ponto mais próximo
function findNearestNeighbor(currentLocation, locations) {
  let nearestNeighbor = null;
  let nearestDistance = Infinity;
  locations.forEach(location => {
    const distance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      location.lat,
      location.lng
    );
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestNeighbor = location;
    }
  });
  return nearestNeighbor;
}

// encontra o ponto inicial mais próximo da localização atual
navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  const startingPoint = { lat: latitude, lng: longitude };
  let nearestNeighbor = findNearestNeighbor(startingPoint, locations);

  // define o ponto inicial como destino e remove da lista de pontos turísticos
  locations.splice(locations.indexOf(nearestNeighbor), 1);
  let route = [nearestNeighbor];

  // encontra o próximo ponto mais próximo até que todos os pontos tenham sido visitados
  while (locations.length > 0) {
    nearestNeighbor = findNearestNeighbor(route[route.length - 1], locations);
    locations.splice(locations.indexOf(nearestNeighbor), 1);
    route.push(nearestNeighbor);
  }
  // cria uma URL com as rotas
  const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${route[0].lat},${route[0].lng}&waypoints=${route.slice(1).map(location => location.lat + ',' + location.lng).join('|')}`;

  // abre a URL no Google Maps
  console.log(url)
    console.log(route)
});
