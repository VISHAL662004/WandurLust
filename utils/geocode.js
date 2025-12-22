async function geocodeLocation(location, country) {
  const query = encodeURIComponent(`${location}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "WanderLust-Airbnb-Clone"
    }
  });

  if (!response.ok) {
    throw new Error("Geocoding failed");
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}

module.exports = geocodeLocation;
