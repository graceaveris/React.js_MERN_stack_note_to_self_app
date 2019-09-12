
// MERN APP
// MongoDB, Express, React, Node.js

// MongoDB is the database
// Express is a framework for node.js
// React is.. React! Our front end / client side
// Node.js allows JS to be used server side!

const express = require('express'); 
// requiring Express which will connect our app with MongoDB 

const cors = require("cors");

const mongoose = require('mongoose'); 
// our ORM (Object-Relational Mapping) system
// allows us to access/translate database data as into easy to manage objects
// provides schema and data validation

const bodyParser = require('body-parser'); 
// allows us to access the 'body', properties of requests
// middleware, or bridge between our db and an application

const notes = require ('./routes/api/notes')
// here we are requiring our routes / HTTP requests, which are in diff file
 
const app = express();
// creating our Express app

app.use(bodyParser.json());
// here we are instructing our Express app to use bodyParser middleware

app.use(cors());

const db = require('./config/keys').mongoURI;
// DB config - we initialize our db
// hook up atlas by adding our mongoDB password key/password
// we can see our database in realtime the web app

mongoose.connect(db)
.then(() => console.log('MongoDB Connected :)'))
.catch(err => console.log('Connection to MongoDB failed :('));
// connect to MongoDB - using mongoose
// promise based, so we can add a catch with a message if the connection fails

app.use(notes)
// we instruct the app to use our routes, required up top
// we could have our routes in this file, but separating for tidyness

const port = process.env.PORT || 5000
// the below port is optimal for Heroku deployment
// port will either be through heroku || via 5000 @ browser

app.listen(port, () => console.log(`Server is GO on port ${port}`));
// the console will tell us where it is running (just for fun, not req)

