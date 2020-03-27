const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

var connection = mysql.createPool({
    host: config.loginData.cnfHost,
    user: config.loginData.cnfUser,
    password: config.loginData.cnfPassword,
    database: config.loginData.cnfDatabase,
    port: 3306
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);


app.post('/employees/all', (req, res) => {
    connection.query('SELECT * FROM employees WHERE ownerEmail = ?', [req.body.email], (err, results) => {
        if(err){
            console.log(err);
            return res.send(JSON.stringify({ data: err }));
        }
        else {
            return res.send(JSON.stringify({ data: results }));
        }
    });
});

app.listen(3001, () =>{
    console.log('Server-side is running on port 3001!');
})