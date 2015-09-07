var lodash = require('lodash'),
	mongo = require('mongodb'),
	moment = require('moment'),
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

var _configMode = true;

module.exports.GetAll = function (req, res) {
	if (!Allowed(req)) {
		res.sendStatus(403);
	};

	Client.connect(uri, function (err, db) {
		if (_configMode) {
			res.send(nconf.get('petitioners'));
		}
		else {
			db.collection('WeWantTrubel-Petitioners')
				.find({}, { "Name": 1, "Location": 1, "TimeStamp": 1 })
				.sort({ "TimeStamp": -1 })
				.toArray(function (err, docs) {
					nconf.set('petitioners', docs);
					res.send(docs);
				});
		}
	});
};

module.exports.Post = function (req, res) {
	if (!Allowed(req)) {
		return res.sendStatus(403);
	};

	Client.connect(uri, function (err, db) {
		if (err) return res.sendStatus(500);

		var petitionDefaults = {
			Name: '',
			Location: '',
			Email: '',
			Notify: false,
			TimeStamp: moment().format()
		};

		var petition = lodash.merge(petitionDefaults, req.body);

		if (!petition.Name || !petition.Location) {
			return res.sendStatus(400);
		}

		if (_configMode) {
			var petitioners = nconf.get('petitioners');
			petitioners.unshift(petition);
			nconf.set('petitioners', petitioners);
			res.sendStatus(201);
		}
		else {
			db.collection('WeWantTrubel-Petitioners')
				.insert(petition, function (err, result) {
					if (err) return res.sendStatus(400);
					console.log(result);
					res.sendStatus(201);
				});
		}
	});
};