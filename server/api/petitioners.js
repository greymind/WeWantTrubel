var mongo = require('mongodb'),
	nconf = require('nconf');

var Client = mongo.MongoClient,
	ObjectId = mongo.ObjectID;

nconf.env(['mongodb:connection'])
	.file('api/config.json');

var uri = nconf.get('mongodb:connection');
var allow = !nconf.get('RunningOnIISNode');

var Allowed = function (req) {
	return allow || req.hostname === 'greymind-dev.azurewebsites.net';
}

module.exports.GetAll = function (req, res) {
	if (!Allowed(req)) {
		res.end(403, 'Forbidden');
	};

	Client.connect(uri, function (err, db) {
		db.collection('WeWantTrubel-Petitioners')
			.find({}, { "Name": 1, "Location": 1, "TimeStamp": 1 })
			.sort({ "TimeStamp": -1 })
			.toArray(function (err, docs) {
				res.send(docs);
			});
	});
};

module.exports.Post = function (req, res) {
	if (!Allowed(req)) {
		res.end(403, 'Forbidden');
	};

	console.dir(req.body);
};