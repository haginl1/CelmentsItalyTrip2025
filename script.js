// Italy Trip 2025 - Interactive Map and Navigation
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
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
    },
    {
      name: "Siena",
      coords: [43.3188, 11.3308],
      info: "Historic Siena"
    },
    {
      name: "Alassio",
      coords: [44.0046, 8.1750],
      info: "Coastal Alassio"
    }
  ];

  // City coordinates for routes
  const cityCoords = {
    Venice: [45.4386, 12.3267],
    Florence: [43.7656, 11.2558],
    Siena: [43.3188, 11.3308],
    Sorrento: [40.6263, 14.3757],
    Alassio: [44.0046, 8.1750],
    Naples: [40.8522, 14.2681],
    Milan: [45.4642, 9.19]
  };

  // Initialize main map
  const initialCenter = [42.5, 13.5];
  const initialZoom = 6;
  const map = L.map('mapid').setView(initialCenter, initialZoom);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Add markers to main map
  locations.forEach(loc => {
    L.marker(loc.coords)
      .addTo(map)
      .bindPopup(`<b>${loc.name}</b><br>${loc.info}`);
  });

  // Reset button functionality
  const resetBtn = document.getElementById('resetMapBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      map.setView(initialCenter, initialZoom);
    });
  }

  // Helper function to create route maps
  function createRouteMap(mapId, start, end) {
    const mapElement = document.getElementById(mapId);
    if (!mapElement) return;

    const routeMap = L.map(mapId, {
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView([
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2
    ], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(routeMap);
    
    // Add start and end markers
    L.marker(start).addTo(routeMap);
    L.marker(end).addTo(routeMap);
    
    // Add route line
    L.polyline([start, end], {
      color: '#74b9ff', 
      weight: 4, 
      opacity: 0.8
    }).addTo(routeMap);
    
    // Fit bounds to show both cities
    routeMap.fitBounds([start, end], {padding: [20, 20]});
  }

  // Initialize route maps
  createRouteMap('route-map-venice-florence', cityCoords.Venice, cityCoords.Florence);
  createRouteMap('route-map-florence-siena', cityCoords.Florence, cityCoords.Siena);
  createRouteMap('route-map-siena-sorrento', cityCoords.Siena, cityCoords.Sorrento);
  createRouteMap('route-map-sorrento-alassio', cityCoords.Sorrento, cityCoords.Alassio);
  createRouteMap('route-map-alassio-naples', cityCoords.Alassio, cityCoords.Naples);
  createRouteMap('route-map-naples-milan', cityCoords.Naples, cityCoords.Milan);

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add some interactive effects to calendar cities
  document.querySelectorAll('.city').forEach(city => {
    city.addEventListener('click', function() {
      const cityName = this.getAttribute('data-city');
      if (cityCoords[cityName]) {
        map.setView(cityCoords[cityName], 10);
      }
    });
  });

  console.log('Italy Trip 2025 website loaded successfully! 🇮🇹');
});
