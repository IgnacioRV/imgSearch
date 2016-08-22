var express = require('express')
var app = express()
var mongo = require('mongodb').MongoClient
var dbUrl = process.env.MONGOLAB_URI
var https = require('https');

app.set('port', (process.env.PORT || 5000));
app.use(express.static('landingPage'));

app.get("/api/imagesearch/:terms", (req,resp)=>{
	var terms = req.params.terms
	console.log("terms: " + terms)
	console.log("offset: " + req.query.offset)
	var page = ""
	if (req.query.offset) page = "/"+req.query.offset 
	/*
	We'll use an image search api and process the results to show them as a JSON file
	Possible img search API's 
		- Google -> Confusing documentation	
		- Bing -> Node module @ https://github.com/dudleycarr/bing-search/blob/master/README.md (almost too easy)
		- Imgur -> Always free for non-commercial usage & well documented

	To get the data from the API we use http.request from the http module, here's an example:

	var options = {
  		host: 'jsonplaceholder.typicode.com',
  		path: '/posts/1',
  		headers: {
		    'Content-Type': 'application/json',
		  }
	};

	var req = http.request(options, function(res) {
	  res.on('data', function (chunk) {
    	console.log('BODY: ' + chunk);
  		});
	});
	req.end()
	*/
	var options = {
  		host: 'api.imgur.com',
  		path: '/3/gallery/search/top'+page+'?q=' + req.params.terms.replace(/ /g,'+'),
  		headers: {
		    'Content-Type': 'application/json',
		    'Authorization': 'Client-ID d98ca8a3b977439'
		  }
	};
	var total = "";
	var req = https.request(options, function(res) {
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
	    		console.log(subObj)
	    		v.push(subObj)
	    		console.log(v)
    		}
    	})
    	console.log(typeof(json))
    	resp.send(v)
    	console.log(v)
    	});
	});
	req.end()

	


})


app.get("/favicon.ico", (req, res )=>{

})

app.get("/", (req, res)=>{

})

app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
});

