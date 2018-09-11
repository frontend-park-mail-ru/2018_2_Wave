const http = require('http');
const fs = require('fs');

const port = 3000;
const paths = {
  index: './index.html',
  favicon: './img/favicon.png',
  notFound: './404.html'
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
    default:
      filePath = '.' + request.url;
      if (!fs.existsSync(filePath)) {
        code = 404;
        filePath = paths.notFound;
      }
  }

  fs.readFile(filePath, function(error, content) {
    if (error) {
      code = 500;
      content = 'Sorry, check with the site admin for error: ' + error.code + ' ..\n';
    }
    response.writeHead(code);
    response.end(content, 'utf-8');
  });

  console.log(code, request.url);

});

server.listen(port);
