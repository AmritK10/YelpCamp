var express     =	require("express"),
 	app         =	 express(),
 	bodyParser  =	require("body-parser"),
 	mongoose    =	require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//Schema Setup
var campGroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground=mongoose.model("Campground",campGroundSchema);

// Campground.create(
// 	{
// 	name:"San jose" ,
// 	image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
// 	description:"This is San Jose. The best Jose. Come here and enjoy the best vacation you ever wanted!"
// 	},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("Newly Created Campground");
// 			console.log(campground);
// 		}
// });

app.get("/",function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});

//CREATE - add new campground to DB
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;

	var newCampground={name:name,image:image,description:desc};
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

//NEW-Show form to create new campground
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

//SHOW-shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show",{campground:foundCampground});
		}
	});
});

app.listen(3000,function(){
	console.log("YelpCamp server has started!!")
});