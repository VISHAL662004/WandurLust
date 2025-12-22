const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js"); // { data: [...] }
const geocodeLocation = require("../utils/geocode");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const OWNER_ID = "693e5003bdffe47a1ce4c77d";

main()
  .then(() => {
    console.log("connected to db");
    initDB();
  })
  .catch(err => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  console.log("Old listings deleted");

  const listingsWithGeometry = [];

  for (let obj of initData.data) {
    try {

      const { lat, lon } = await geocodeLocation(
        obj.location,
        obj.country
      );

      listingsWithGeometry.push({
        ...obj,
        owner: OWNER_ID,
        geometry: {
          type: "Point",
          coordinates: [lon, lat]
        }
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (err) {
      console.error(
        `❌ Failed to geocode ${obj.location}, ${obj.country}`
      );
    }
  }

  await Listing.insertMany(listingsWithGeometry);
  console.log("Data initialized WITH geometry");

  mongoose.connection.close();
};
