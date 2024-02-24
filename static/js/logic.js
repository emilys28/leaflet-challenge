// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// use D3 to request the query URL
d3.json(queryUrl).then(function (data) {
  console.log(data),
  createFeatures(data.features)
});

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    // Convert timestamp to Date object
    const eventDate = new Date(feature.properties.time);
    
    // Format date and time
    const dateTimeString = eventDate.toLocaleString();

    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p><p>Date & Time: ${dateTimeString}</p>`);
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  function CircleMarkers(feature,latlng){
    let options = {
        //size based on magnitude
        radius:feature.properties.mag*5,
        //colors based on depth
        fillColor: depthColor(feature.geometry.coordinates[2]),
        color: depthColor(feature.geometry.coordinates[2]),
        weight: 1,
        opacity: .8,
        fillOpacity: 0.35
    }
    return L.circleMarker(latlng, options);
}
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.   
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: CircleMarkers
  });
  
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

// Color circles based on depth
function depthColor(depth) {
  switch(true) {
      case (-10 <= depth && depth <= 10):
        return "#1de278";
      case (10 <= depth && depth <= 30):
        return "#c5f00f";
      case (30 <= depth && depth <= 50):
        return "#f8dd07";
      case (50 <= depth && depth <= 70):
        return "#fda302";
      case (70 <= depth && depth <= 90):
        return "#ff7a00";
      case (depth >= 90):
        return "#ff491d";
  }
}
// Adding a legend
let legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90],
        labels = [];

    // loop through density intervals
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + depthColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

function createMap(earthquakes) {
  
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  legend.addTo(myMap);
}