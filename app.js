const http = require('http');

const server = http.createServer((req, res) => {
  console.log('URL: ', req.url);
  console.log('METHOD: ', req.method);
  console.log('HEADERS: ', req.headers);
  //process.exit(); // this exits the event loop 
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my nodejs server</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
