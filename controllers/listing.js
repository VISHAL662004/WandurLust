const geocodeLocation = require("../utils/geocode");
const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"},}).populate("owner");
  if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs",{listing});
};

module.exports.createListing = async (req, res) => {
  try {
    const { location, country } = req.body.listing;

    // 1. Geocode location
    const { lat, lon } = await geocodeLocation(location, country);

    // 2. Create listing
    const newListing = new Listing(req.body.listing);

    // 3. Geometry
    newListing.geometry = {
      type: "Point",
      coordinates: [lon, lat]
    };

    // 4. Image (unchanged)
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);

  } catch (err) {
    req.flash("error", "Invalid location. Please enter a valid place.");
    res.redirect("/listings/new");
  }
};


module.exports.renderEditForm = async (req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload/", "/upload/w_100,h_100/");

  res.render("./listings/edit.ejs",{ listing,originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // If location or country changed → re-geocode
    if (
      listing.location !== req.body.listing.location ||
      listing.country !== req.body.listing.country
    ) {
      const { lat, lon } = await geocodeLocation(
        req.body.listing.location,
        req.body.listing.country
      );

      listing.geometry = {
        type: "Point",
        coordinates: [lon, lat]
      };
    }

    // Update fields
    Object.assign(listing, req.body.listing);

    // Image update (unchanged)
    if (typeof req.file !== "undefined") {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

  } catch (err) {
    req.flash("error", "Invalid location update.");
    res.redirect(`/listings/${req.params.id}/edit`);
  }
};


module.exports.destroyListing = async (req,res) =>{
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings")
};