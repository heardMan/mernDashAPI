require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test_cf";

const app = express();

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-8k5j15hl.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.shipDash.com',
  issuer: 'https://dev-8k5j15hl.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex:true, 
    useUnifiedTopology: true
});

app.use(jwtCheck);
app.use(apiRoutes);

app.listen(PORT, function(){
    console.log(`App now listening on Port#: ${PORT}`);
    
});

module.exports = app;