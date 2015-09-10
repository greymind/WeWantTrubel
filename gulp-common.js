var fs = require('fs');
var beautify = require('js-beautify');

// Paths
var paths = {};
paths.Home = "./";

paths.Node = "node_modules/"
paths.Bower = "bower_components/";

paths.Client = "client/"
paths.Lib = paths.Client + "lib/";
paths.App = paths.Client + "app/";
paths.Services = paths.App + "services/";

paths.Server = "server/"

module.exports.Paths = paths;

// Beautify and write HTML to file
module.exports.WriteHtml = function (filePath, html, cb) {
	var file = fs.createWriteStream(filePath);
    file.write(beautify.html(html, {}));
    file.end(function () {
		cb();
	});
}