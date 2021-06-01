const express = require('express');
const path = require('path');
//const sequelize = require('./util/database');
//const db = require('./util/database');
//const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

/*const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');*/

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

app.use((req, res, next ) => {
    User.findById('60b69efab0d5ff972418fd5a')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//const server = http.createServer(app);
//const server = http.createServer(routes.handler);
//server.listen(3000);

/*
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    .sync()
    //.sync( { force: true })
    .then(result => {
        //console.log(result);
        return User.findByPk(1);
    })
    .then(user => {
        if (!user){
            return User.create({ name: 'Andrew', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        //console.log(user);
        //return user.createCart();
    })
    .then(cart => {
        app.listen(3000, () => {
            console.log('Server Running & Ready !!!');
        });
    })
    .catch(err => {
        console.log(err);
    });
*/
mongoConnect(() => {
    app.listen(3000, () => {
        console.log('Server Running & Ready !!!');
    });
});