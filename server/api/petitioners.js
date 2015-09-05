var mongo = require('mongodb'),
	nconf = require('nconf'),
	assert = require('assert');

var Server = mongo.Server,
	Db = mongo.Db,
	Client = mongo.MongoClient,
	ObjectId = mongo.ObjectID;

nconf.env(['mongodb:connection'])
	.file('api/config.json');

var uri = nconf.get('mongodb:connection');

var os = require( 'os' );

var networkInterfaces = os.networkInterfaces( );

console.log( networkInterfaces );

var Allowed = function (req) {
	var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
	console.log(ip);
	return (ip === '');
}

module.exports.GetAll = function (req, res) {
	if (!Allowed(req)) {
		res.end(403, 'Forbidden');
	};

	Client.connect(uri, function (err, db) {
		assert.equal(err, null);

		db.collection('WeWantTrubel-Petitioners')
			.find()
			.toArray(function (err, docs) {
				assert.equal(err, null);
				res.send(docs);
			});
	});
};

module.exports.Post = function (req, res) {

};