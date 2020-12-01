const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();  
  
  app.get('/usuario' ,function(req,res) {  
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, usuarios)=>{
           if(err){
             return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al moento de consultar',
                err
             });
           }

           res.json({
              ok: true,
              msg: 'Lista de usuarios obtenida con exito',
              conteo: usuarios.length,
              usuarios
           });
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
  
  app.put('/usuario/:id', function(req,res){//se pueden declara variables dentro de la url usadas para modificar
      let id = req.params.id;
      let body = _.pick(req.body, ['nombre','email']);

      Usuario.findByIdAndUpdate(id, body, 
        { new: true, runValidators: true, context: 'query'}, 
        (err,usrDB)=>{
            if(err){
              return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
          }

          res.json({
            ok: true,
            msg: 'Usuario actualizado con exito',
            usuario: usrDB
          });
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