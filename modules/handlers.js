var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.16.23.20:27017/login";

MongoClient.connect(url, function(err, db) {
  if (err) {
	  throw err;
  } else {
	console.log("Database created!");
	global.MongoDB = db;
  }
});

exports.login = function (req, res, next) {
	let query = req.body;
	MongoDB.collection("customers").find(query).toArray(function(err, result) {
		if (err) {
			next(err);
		} else {
			console.log(result);
			if (result.length == 1) {
				res.send(result);
			} else {
				res.status(401);
				res.send("User Login failed");
			}
		}
	});
}

exports.register = function (req, res, next) {
	let userData = req.body;
	MongoDB.collection("customers").insertOne(userData, function (err, data) {
		if (err) {
			next(err);
		} else {
			console.log(data);
			res.send(data);
		}
	});
}

exports.getSublist = function (req, res, next) {
	
	var min = parseInt(req.body.min);
	var max = parseInt(req.body.max);
	console.log(min,max);
	let query = {"Content":req.body.Category, value:{$gte:min,$lte:max}};
	MongoDB.collection("menu").find(query).toArray(function (err, results){
		if (err) {
			next(err);
		} else {
			console.log(results);
			res.send(results);
		}
	});
	//res.send("OK");
}

exports.insert = function (req, res, next) {
	let userData = req.body;
	MongoDB.collection("menu").insertOne(userData, function (err, data) {
		if (err) {
			next(err);
		} else {
			console.log(data);
			res.send(data);
		}
	});
}


exports.getMenu = function (req, res) {
	let query = req.body;
	MongoDB.collection("menu").find({}).toArray(function(err, result) {
		if (err) {
			throw err;
		} else {
			console.log(result);
			res.send(result);
		}
	});
}

