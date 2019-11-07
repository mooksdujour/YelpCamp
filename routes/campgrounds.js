const express = require("express"),
      router  = express.Router(),
      Campground = require("../models/campground"),
      middleware = require("../middleware");

//INDEX - show all campgrounds

router.get("/", (req, res) => {
    //Get all the campgrounds from the DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");

});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) =>{
	var name = req.body.name,
        price = req.body.price,
	    image = req.body.image,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
	    newCampground = {name: name, price: price, image:image, description: description, author: author};
	// create a new campground and save to the DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            //redirect back to the campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
});

//SHOW - shows more info about one campground
router.get("/:id", middleware.isLoggedIn, (req, res) => {
    //find the campground by id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template wit that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        res.render("campgrounds/edit", {campground: foundCampground});    
    });
});
//UPDATE Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) =>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) =>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DESTROY Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        };
    });
});

module.exports = router;