const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const bodyParser = require('body-parser');
//const http = require('http');
//const routes = require('./routes');
//console.log(routes.someText);
//const server = http.createServer(routes);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded());
//app.use((req, res, next) => {
// console.log('In the middleware');
// next(); // Allows the request to continue to the next middleware in line
//});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//const server = http.createServer(app);
//const server = http.createServer(routes.handler);
//server.listen(3000);

app.listen(3000);
