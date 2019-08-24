var Campground = require("./models/campground")
	mongoose   = require("mongoose")
	Comment    = require("./models/comment");

var data=[
	{
		name:"Stars Galore",
		image:"https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2749&q=80",
		description:"blah blah blah blah"
	},
	{
		name:"Purple Trees",
		image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
		description:"giyuctccvv  vutctv  uvcfcdtv gcvyg hgcf"
	},
	{
		name:"Heavens Gate",
		image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
		description:"hctfc yftcg  yfucyvv blah blah blah"
	}
]
function seedDB(){
	//Remove All Campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a campground");
					Comment.create(
						{
							text:"This is a very nice place, just needs internet",
							author:"Homer"
						},
						function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("added new comment");
						}
					});
				}
			});
		});
	});
}

module.exports=seedDB;