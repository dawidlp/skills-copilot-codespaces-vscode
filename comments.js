// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
http.createServer(function(req, res) {
    // Parse the request URL
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    // If the request is for the comments data, return it
    if (pathname === '/getComments') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else {
        // Otherwise, serve the file
        var filename = path.join(__dirname, 'public', pathname);
        fs.exists(filename, function(exists) {
            if (!exists) {
                res.statusCode = 404;
                res.end('File not found');
                return;
            }
            fs.createReadStream(filename).pipe(res);
        });
    }
}).listen(3000);
console.log('Server running at http://localhost:3000/');

