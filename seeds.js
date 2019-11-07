const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, (err) =>{
		if(err){
			console.log(err);
		} else {
			console.log("Removed Campgrounds!");
            //Add some campgrounds
            data.forEach((seed) =>{
                Campground.create(seed, (err, campground) =>{
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                        {
                            text: "This place is great, bu I wish there was internet",
                            author: "Homer"
                        }, (err,comment) =>{
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");  
                            }
                        });
                    }
                })
            })
		}
	});
}
module.exports = seedDB;