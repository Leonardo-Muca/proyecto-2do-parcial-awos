require('./config/config');
const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();  

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/' ,function(req,res) {    
  res.send('<h1>Bienvenido amigo (localhost)</h1>');
});

app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafeteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err,res) => {//3606 en SQL
    if(err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT,() => {//se selecciona el puerto en el que va a trabajar el servidor, preferible el puerto 3000
    console.log('El servidor esta en linea por el puerto',process.env.PORT);
});