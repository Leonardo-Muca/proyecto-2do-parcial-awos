require('./config/config');
const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();  

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/' ,function(req,res) {    
  res.send('<h1>Bienvenido amigo</h1>');
});

app.get('/usuario' ,function(req,res) {    
    res.json({
    ok: 200,
    mensaje: 'Usuario consultado con exito'
    });
  });
 
app.post('/usuario', function(req,res){//req = ontener datos mandados por el cliente, res = mandar una respuesta
  let nombre = req.body.nombre;
  let body = req.body;

  if(nombre === undefined){ //verifica si han ingresado el campo nombre
      res.status(400).json({
        ok : 400,
        mensaje : 'Favor de enviar el valor de nombre'
      });
      
  }else{

      res.json({
      ok: 200,
      mensaje: 'Usuario insertado con exito',
      nombre: nombre,
      body: body
       });
  }
});

app.put('/usuario/:id/:nombre', function(req,res){//se pueden declara variables dentro de la url usadas para modificar
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
        ok:200,
        mensaje:'Usuario actualizado con exito',
        id: id,
        nombre: nombre
    });
});

app.delete('/usuario/:id',function(req,res){//se pueden declara variables dentro de la url usadas para eliminar
  let id = req.params.id;
  res.json({
    ok:200,
    mensaje:'Usuario actualizado con exito',
    id: id
  });
});

app.listen(process.env.PORT,() => {//se selecciona el puerto en el que va a trabajar el servidor, preferible el puerto 3000
    console.log('El servidor esta en linea por el puerto',process.env.PORT);
});