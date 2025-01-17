mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style : "mapbox://styles/mapbox/streets-v10",
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 10, // starting zoom
});

console.log(listing.coordinates);
const marker = new mapboxgl.Marker({color:'red'})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h4>${listing.location} </h4><p>${listing.title}</p>`))
.addTo(map);ho

