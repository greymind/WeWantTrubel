var nconf = require('nconf'),
	sprintf = require('sprintf-js').sprintf,
	https = require('https');

nconf.env(['G_RECAPTCHA_SECRET'])
	.file('server/api/config.json');

var allow = !nconf.get('RunningOnIISNode');

var Allowed = function (req) {
	return allow || req.hostname === 'greymind-dev.azurewebsites.net' ||
		req.hostname === 'wewanttrubel.herokuapp.com';
}

module.exports.Get = function (req, res) {
	if (!Allowed(req)) {
		res.end(403, 'Forbidden');
	};
	
	var options = {
		host: 'www.google.com',
		port: 443,
		path: sprintf('/recaptcha/api/siteverify?secret=%s&response=%s', nconf.get('G_RECAPTCHA_SECRET'), req.query.response),
		method: 'POST'
	};
	
	https.request(options, function (response) {
		var data = '';
		response.on('data', function (chunk) {
			data += chunk;
		});

		response.on('end', function () {
			var parsedData = JSON.parse(data);
			res.send(parsedData);
		});
	}).end();
};