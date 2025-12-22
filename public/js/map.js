const mapDiv = document.getElementById("map");

if (!mapDiv) {
  console.error("Map div not found");
} else {
  const lat = mapDiv.dataset.lat;
  const lng = mapDiv.dataset.lng;

  if (!lat || !lng) {
    console.error("Latitude or Longitude missing");
  } else {
    const map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        `<b>${mapDiv.dataset.title}</b><br>${mapDiv.dataset.location}`
      )
      .openPopup();

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }
}
