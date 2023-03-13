const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const UserSchema = require("./models/user");
const User = mongoose.model("User", UserSchema);
const app = express();
const CategorySchema = require("./models/category");
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const Category = mongoose.model("Category", CategorySchema);
const passport = require("passport");


if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config()
}

require("./utils/connectdb");


app.use(cors({
    origin: 'http://localhost:3005',
    credentials: true
}));

app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) },
}));

app.use(passport.initialize());
app.use(passport.session());

require("./strategies/LocalStrategy");  
require("./strategies/FacebookStrategy");  

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

// Import product routes
const productRoutes = require("./routes/products");

// Import category routes
const categoryRoutes = require("./routes/categories");

// Import user routes
const userRoutes = require("./routes/users");

// app.use(express.json());
app.use(bodyParser.json({
    limit: "50mb"
}));

// Use product routes
app.use("/products", productRoutes);

// Use category routes
app.use("/categories", categoryRoutes);

// Use user routes
app.use("/users", userRoutes);

// const category = new Category({
//     name: 'Nootropics',
//     description: 'Nootropics'
// });

// category.save((error) => {
//     if (error) throw error;
//     console.log('Category addded')
// });

app.get('/', (req, res) => {
    res.send('Welcome to Valhalla');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});