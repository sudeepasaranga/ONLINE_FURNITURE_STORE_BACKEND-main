//Assign dependencies to variables

var express = require('express');
var app = express();
var cors = require('cors'); 
const mongoose = require('mongoose');


const _PORT = process.env.PORT || 8081;

app.options('*', cors());
app.use(cors({
  origin: '*',
  credentials: true,
  exposedHeaders: ["X-Total-Count"],
  allowedHeaders: ["X-Total-Count"],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


mongoose.connect('mongodb+srv://projectsby365:projectsby365@itp.nzyfxz5.mongodb.net/furnitureDB?retryWrites=true&w=majority', {
  // mongoose.connect('mongodb://localhost:27017/furnitureStore', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true, 
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB CONNECTED');
});


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/endpoints')(app)

var server = app.listen(_PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(" Furniture Store app listening at http://"+host+":"+port)
})


module.exports = app;
