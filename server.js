/**
 * require dependencies
 */
var express = require('express'),
    ejs = require('ejs'),
    path = require("path"),
    bodyParser = require('body-parser');
/**
 * Defined variable
 */
var buildDir = path.join(__dirname, 'build');
var distDir = path.join(__dirname, 'dist');
var dataDir = path.join(__dirname, 'webapp');
var staticDir = path.join(__dirname, 'resource');
var smartzoneWebapp = express();

smartzoneWebapp.use(bodyParser.json({limit: '20mb'}));
smartzoneWebapp.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));
smartzoneWebapp.engine('html', ejs.__express);
smartzoneWebapp.use('/build', express.static(buildDir));
smartzoneWebapp.use('/dist', express.static(distDir));
smartzoneWebapp.use('/webapp', express.static(dataDir));
smartzoneWebapp.use('/resource', express.static(staticDir));
smartzoneWebapp.set('view engine', 'html');
smartzoneWebapp.set('views', path.join(__dirname, '/'));
smartzoneWebapp.set('json spaces', 2);
smartzoneWebapp.listen(8080);
console.log("server started at port 8080 ...");
