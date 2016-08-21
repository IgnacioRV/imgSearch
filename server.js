var express = require('express')
var app = express()
var mongo = require('mongodb').MongoClient
var dbUrl = process.env.MONGOLAB_URI
app.set('port', (process.env.PORT || 5000));
app.use(express.static('landingPage'))

app.get("/api/imagesearch/:terms", (req,res)=>{
	var terms = req.params.terms.split(' ')
	console.log(terms)
	console.log(req.query)
	/*
	We'll use an image search api and process the results to show them as a JSON file
	Possible img search API's 
		- Google 
		- 
	*/
	
})


app.get("/favicon.ico", (req, res )=>{

})

app.get("/", (req, res)=>{

})

app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
});

