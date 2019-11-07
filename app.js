const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require('mongoose'),
      flash                 = require('connect-flash'),
      passport              = require("passport"),
      User                  = require("./models/user"),
      LocalStrategy         = require("passport-local"),
      methodOverride        = require("method-override"),
      passportLocalMongoose = require("passport-local-mongoose"),
      Campground            = require("./models/campground"),
      Comment               = require("./models/comment"),
      seedDB                = require("./seeds");

//Changes to bypass time out db connection errors on Heroku
const host = '0.0.0.0',
      port = process.env.PORT || 3000;

//requiring routes
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index")


 
//mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://TheMooGuy:%21amLook1ng@cluster0-miakj.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() =>{
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR: ', err.mesage);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Seed the database everytime the App is run
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Charley wins bestest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, host, () =>{
	console.log("Server has started....");
});