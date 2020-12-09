const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const route = require("./routes/index.route")
const bodyParser = require("body-parser")
const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);

var app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("combined"));
app.use(session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "dbs",
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
        sameSite:true 
    }
}))

route.configureRoutes(app);

export default app;