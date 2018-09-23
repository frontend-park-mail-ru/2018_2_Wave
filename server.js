const http = require('http');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const port = 3000;
const paths = {
  index: './dist/index.html',
  'app.bundle.js': './dist/app.bundle.js',
  favicon: './public/img/favicon.png',
  notFound: './public/404.html'
};

const server = http.createServer((request, response) => {

  let filePath;
  let code = 200;
  switch(request.url) {
    case '/':
      filePath = paths.index;
      break;
    case '/favicon.ico':
      filePath = paths.favicon;
      break;
    case '/app.bundle.js':
      filePath = paths['app.bundle.js'];
      break;
    default:
      filePath = './public' + request.url;
      if (!fs.existsSync(filePath)) {
        code = 404;
        filePath = paths.notFound;
      }
  }

  fs.readFile(filePath, function(error, content) {
    let contentType = mime.contentType(path.extname(filePath));
    if (error) {
      code = 500;
      content = 'Sorry, check with the site admin for error: ' + error.code + ' ..\n';
      contentType = 'text/plain';
    }

    response.writeHead(code, contentType);
    response.end(content);
  });

  console.log(code, request.url);

});

server.listen(port);
