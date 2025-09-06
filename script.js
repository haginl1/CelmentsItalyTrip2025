// Italy Trip Map Pins
const locations = [
  {
    name: "Venice Airbnb",
    coords: [45.4386, 12.3267],
    info: "Calle de Ca' Raspi, 1557, Venice"
  },
  {
    name: "Florence Airbnb",
    coords: [43.7656, 11.2558],
    info: "Via dei Bardi, 33, Florence"
  },
  {
    name: "Top of the Carlton",
    coords: [45.4372, 12.3216],
    info: "Fondamenta del Monastero, 578, Venice"
  },
  {
    name: "Gusta Pizza",
    coords: [43.7679, 11.2476],
    info: "Via Maggio, 46r, Florence"
  },
  {
    name: "Cooking Class Florence",
    coords: [43.7735, 11.2621],
    info: "Matteo Palmieri, 31 R, Florence"
  },
  {
    name: "La Giostra",
    coords: [43.7712, 11.2637],
    info: "Borgo Pinti, 12r, Florence"
  },
  {
    name: "Mercato Centrale",
    coords: [43.7780, 11.2190],
    info: "Florence"
  },
  {
    name: "Rialto Market",
    coords: [45.4380, 12.3358],
    info: "Venice"
  },
  {
    name: "Antiche Carampane",
    coords: [45.4382, 12.3271],
    info: "Venice"
  },
  {
    name: "Sorrento",
    coords: [40.6263, 14.3757],
    info: "Piazza Tasso, Sorrento"
  },
  {
    name: "Naples",
    coords: [40.8522, 14.2681],
    info: "Central Naples"
  },
  {
    name: "Milan",
    coords: [45.4642, 9.19],
    info: "Central Milan"
  }
];

const map = L.map('mapid').setView([42.5, 13.5], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

locations.forEach(loc => {
  L.marker(loc.coords)
    .addTo(map)
    .bindPopup(`<b>${loc.name}</b><br>${loc.info}`);
});
