var express = require('express')
var app = express()
var mongo = require('mongodb').MongoClient
var dbUrl = process.env.MONGOLAB_URI
var https = require('https');

app.set('port', (process.env.PORT || 5000));

app.get("/api/imagesearch/:terms", (req,resp)=>{
	/*
	var terms = req.params.terms
	res.send("You're searching " + terms)
	var page = ""
	if (req.query.offset) page = "/"+req.query.offset 
	/*
	We'll use an image search api and process the results to show them as a JSON file
	Possible img search API's 
		- Google -> Confusing documentation	
		- Bing -> Node module @ https://github.com/dudleycarr/bing-search/blob/master/README.md (almost too easy)
		- Imgur -> Always free for non-commercial usage & well documented 

	To get the data from the API we use https.request from the https module
	
	TODO: Save the search terms on a db
	*/

	/*
	var options = {
  		host: 'api.imgur.com',
  		path: '/3/gallery/search/top'+page+'?q=' + req.params.terms.replace(/ /g,'+'),
  		headers: {
		    'Content-Type': 'application/json',
		    'Authorization': 'Client-ID '+process.env.IMGUR_API
		  }
	};
	var total = "";
	var reqs = https.request(options, function(res) {
	  res.on('data', function (chunk) {
	  	total += chunk
	  });
	  res.on('end', () => {
	  	var v = []
    	var json = eval("(" + total + ")");
    	json.data.forEach(function (obj, index){
    		if (obj.is_album){
	    		var subObj = {
	    			"url" : "http://imgur.com/"+obj.cover+".jpg",
	    			"snippet": obj.title,
	    			"thumbnail": "http://imgur.com/"+obj.cover+"s.jpg",
	    			"context": obj.link
	    		}
	    			v.push(subObj)
	    	}
    	})
    	
    	resp.send(v)

    	});
	});
	reqs.end()
	
	mongo.connect(dbUrl, function (err, db){
		var searches = db.collection('imgSearches');
		searches.insert({
			"term" : terms, 
			"when" : new Date()
		}, function (err, data){

		});
		db.close()
	})
	*/

})


app.get("/api/latest/imagesearch", (req, res)=>{
	res.send("SEARCH HISTORY")
	mongo.connect(dbUrl, function (err, db){
		var searches = db.collection('imgSearches');
		searches.find({},{term: 1, when: 1, _id: 0}).limit(10).sort({_id:-1}).toArray(function (err, document){
			res.send(JSON.stringify(document))
		});
		db.close()
	})
	
})


app.get("/", (req, res)=>{
	res.send("MAIN")
})

app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
});

