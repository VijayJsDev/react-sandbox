const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');



mongoose.connect('mongodb://localhost:27017/loginDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/products');
    }
    else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login');
})

app.get('/logout', (req, res) => {
    res.render('logout');
})

app.get('/products', requireLogin, (req, res) => {
    res.render('products')
})

app.get('/cart', requireLogin, (req, res) => {
    res.render('cart');
})

app.get('/order-confirmation', requireLogin, (req, res) => {
    res.render('order-confirmation');
})

app.get('/order-history', requireLogin, (req, res) => {
    res.render('order-history');
})

app.get('/topsecret', requireLogin, (req, res) => {
    res.send("TOP SECRET!!!")
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP!")
})

