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

// Display all employees under logged in user
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

// Add new employee under logged in user
app.post('/employees/add', (req, res) => {
    var ownerEmail = req.body.email;
    var employeeEmail = req.body.employeeEmail;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var city = req.body.city;
    var hourlyBasis = req.body.hourlyBasis;
    var hoursPerDay = req.body.hoursPerDay;
    var daysPerMonth = req.body.daysPerMonth;
    var percentPerSale = req.body.percentPerSale;
    connection.query("INSERT INTO `employees`(`ownerEmail`,`employeeEmail`,`firstName`,`lastName`,`city`,`hourlyBasis`,`hoursPerDay`,`daysPerMonth`,`percentPerSale`) VALUES ('"+ownerEmail+"','"+employeeEmail+"','"+firstName+"','"+lastName+"','"+city+"','"+hourlyBasis+"','"+hoursPerDay+"','"+daysPerMonth+"','"+percentPerSale+"')",
    (err, results) => {
        if(err){
            console.log(err);
            throw err;
        }
        else {
            console.log("1 record inserted to `employees`.")
        }
    });
});

app.post('/employees/delete', (req, res) => {
    var ownerEmail = req.body.ownerEmail;
    var id = req.body.id;
    connection.query('DELETE FROM `employees` WHERE ownerEmail = ? and id = ?', [ownerEmail,id],
    function(err, results) {
        if(err) {
            console.log(err);
            throw err;
        }
        console.log("1 record deleted from `employees`.")
    }
    )
})

app.listen(3001, () =>{
    console.log('Server-side is running on port 3001!');
})