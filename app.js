const express = require('express');
const path = require('path');
//const expressHbs = require('express-handlebars');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
//const db = require('./util/database');
//const bodyParser = require('body-parser');
//const http = require('http');
//const routes = require('./routes');
//console.log(routes.someText);
//const server = http.createServer(routes);
const app = express();

//app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
//app.set('view engine', 'hbs');

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

/*db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0]);
        console.log(result[1]);
    })
    .catch(err => {
        console.log(err);
    });*/

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
app.use(errorController.get404);

//const server = http.createServer(app);
//const server = http.createServer(routes.handler);
//server.listen(3000);

app.listen(3000, () => {
    console.log('Server Running & Ready !!!');
});
