const express = require('express');
const Usuario = require('../models/usuario');
const app = express();  
  
  app.get('/usuario' ,function(req,res) {    
      res.json({
      ok: 200,
      mensaje: 'Usuario consultado con exito'
      });
    });
   
  app.post('/usuario', function(req,res){//req = obtener datos mandados por el cliente, res = mandar una respuesta
    let body = req.body;
    console.log(body)
    let usr = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: body.password
    });

    usr.save((err, usrBD)=> {
      if (err){
          return res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error',
            err
          });
      }

      return res.json({
        ok: true,
        msg: 'Usuario insertado con exito',
        usrBD
      });
    });
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

  module.exports = app;