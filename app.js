const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const publicPath = './public';
const index = '/index.html';
const path404 = '/404.html'

const server = http.createServer((request, response) => {
	console.log('request ', request.url);

	var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './public/index.html';
    }

	var extname = String(path.extname(filePath)).toLowerCase();
	var contentType = 'text/html';
	var mimeTypes = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.png': 'image/png',
		'.jpg': 'image/jpg',
		'.gif': 'image/gif',
		'.wav': 'audio/wav',
		'.mp4': 'video/mp4',
		'.woff': 'application/font-woff',
		'.ttf': 'application/font-ttf',
		'.eot': 'application/vnd.ms-fontobject',
		'.otf': 'application/font-otf',
		'.svg': 'application/image/svg+xml'
	};


	contentType = mimeTypes[extname] || 'application/octet-stream';
	
	
	fs.readFile(filePath, function(error, content) {
		if (error) {
			if(error.code == 'ENOENT'){
				fs.readFile(filePath + path404, function(error, content) {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(500);
				response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				response.end();
			}
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8');
		}
	});
});

server.listen(3000);