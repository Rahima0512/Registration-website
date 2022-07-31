var con = require("./connection");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine","ejs");

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mob_num = req.body.mno;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var pincode = req.body.pin;
    con.connect(function (error) {
        if (error) throw error;

        var sql = "INSERT INTO candidate(name,email,mob_num,address,city,state,pincode)VALUES ?";

        var data = [
            [name, email, mob_num, address, city, state, pincode]

        ];
        con.query(sql, [data], function (error, result) {
            if (error) throw error;

            res.send('User Registered successfully \nUser Number:\t' + (result.insertId));
        });
    });

});
app.get("/user", function (req, res) {
    
    var sql = "select * from candidate";
    con.query(sql, function (error, result) {

        if (error) console.log(error);
        res.render(__dirname+"/user",{candidate:result});


    });


});
app.listen("3000");