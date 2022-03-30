require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
  res.send(require('./index/index.html'));
});

app.use('/api',require('./routes/index'));


mongoose.connect('mongodb+srv://admin:Leoespro217@cluster0.2hoke.mongodb.net/cafeteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, res) => {//3606 en SQL
  if (err) throw err;
  console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {//se selecciona el puerto en el que va a trabajar el servidor, preferible el puerto 3000
  console.log('El servidor esta en linea por el puerto', process.env.PORT);
});