const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'ares_turn'
});

db.connect(function(err) {
   if(err) {
       console.log("DB error");
       throw err;
       return false;
   }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000) /* 5 years */,
    endConnectionOnClose: false
}, db);

app.use(session({
    key: '198gf9ng9i1n30g901f82fn',
    secret: 'fn19nf871n9fim10mg09123g8u1vn',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000) /* 5 years */,
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);