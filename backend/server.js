var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var mysql = require('mysql');
var cors = require('cors');
const jwt = require('jsonwebtoken');


var connection = mysql.createConnection({
    host: 'database-3.c7enosmetzgt.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'testDB'
});

connection.connect(function(error){
    if(!!error) {
        console.log('error');
    }
    else {
        console.log('connection succesful');
    }
});

var app = express();
app.use(cors());

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile('index.html', {root: path.join(__dirname, './views')});
});

// function for verifying jwt token from client side
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

//registering a new user with post request
app.post('/register', (req, res) => {  
    console.log("dfghjkdfghjk");
    connection.query('insert into users(name, username, password) VALUES (\'' + req.body.name + '\', \'' + req.body.username + '\', \'' + req.body.password  +'\')' , function(error,rows, fields) {
        try{
            console.log('User added');
            res.json({msg: "User Added Succesfully"});
        }
        catch(err) {
            console.log('User can not be added');
            res.json({msg: 'User can not be added'});
        }
    });
});

//generating jwt token for login with get request
app.post('/login', function(req,res){
    try{
        connection.query('select * from users where username=\'' + req.body.username +'\'' , function(err,rows, fields) {
            try{
                console.log('Db Connection is Valid');
                user = {
                    username : rows[0].username,
                    password : rows[0].password
                }
                if(req.body.username == rows[0].username && req.body.password == rows[0].password){
                    generateToken(user);
                }
                else{
                    res.json({msg: 'password is not correct'});
                } 
            }
            catch(err) {
                console.log('username is not registered');
                res.json({msg: 'username is not registered'});
            }
        });
    }
    catch(err){
        console.log('Error in Db Connection');
        res.json({msg: 'Error in Db Connection'});
    }
    
    function generateToken(user) {
        jwt.sign({user}, 'secretkey', { expiresIn: '600s' }, (err, token) => {
            res.json({
                token
            });
        });
    }; 
});


//add time log with post request
app.get('/logs', verifyToken, (req, res) => {  
    console.log('request recieved');
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } 
        else {
            connection.query('select * from logs' , function(error,rows, fields) {
                if(rows){
                    try{
                        console.log('Query Submitted');
                        res.send(rows);
                    }
                    catch(err) {
                        console.log('query can not be submitted');
                        res.json({msg: "query can not be submitted"});
                    }
                }
                else{
                    console.log('error in query');
                    res.send(error);
                }
                
            });
        }
    });
});

//add time log with post request
app.post('/logs', verifyToken, (req, res) => {  
    console.log('request recieved');
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } 
        else {
            connection.query('insert into logs(task, project, start_time, end_time, username) VALUES (\'' + req.body.task + '\', \'' + req.body.project +'\', \'' + req.body.start_time + '\', \'' + req.body.end_time + '\', \'' + req.body.username + '\')' , function(error,rows, fields) {
                try {
                    console.log('Query Submitted');
                    res.send("Log details added succesfully");
                }
                catch(err) {
                    console.log('query can not be submitted');
                    res.json({msg: 'query can not be submitted'});
                }
            });
        }
    });
});

app .listen(1337, function(){
    console.log('app server running at port 1337');
})