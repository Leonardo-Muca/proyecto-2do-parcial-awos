const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const EventModel = require('../../models/event.model');
var mongoose = require('mongoose');
const app = express();

app.get('/', async(req, res) => {
  try {
    if (req.query.idEvent) req.queryMatch._id = req.query.idEvent;
    if (req.query.termino) req.queryMatch.$or = Helper(["name"], req.query.termino);

    const evento = await EventModel.aggregate([
        {
            $match: { ...req.queryMatch }
        }
    ])

    if (evento.length <= 0) {
        res.status(404).send({
            estatus: '404',
            err: true,
            msg: 'No se encontraron eventos en la base de datos.',
            cont: {
                evento
            }
        });
    } else {
        res.status(200).send({
            estatus: '200',
            err: false,
            msg: 'Informacion obtenida correctamente.',
            cont: {
                evento
            }
        });
    }
} catch (err) {
    res.status(500).send({
        estatus: '500',
        err: true,
        msg: 'Error al obtener los eventos.',
        cont: {
            err: Object.keys(err).length === 0 ? err.message : err
        }
    });
}
});

app.post('/', async (req, res) => {//req = obtener datos mandados por el cliente, res = mandar una respuesta
  try {
    const ev = new EventModel(req.body);

    let err = ev.validateSync();

    if (err) {
        return res.status(400).json({
            ok: false,
            err: true,
            resp: 400,
            msg: 'Error: Error al Insertar el evento.',
            cont: {
                err
            }
        });
    }

    const eventoEncontrado = await EventModel.findById({ _id: ev._id });
    if (eventoEncontrado){
        const eventoUpdated =  await EventModel.findByIdAndUpdate(ev._id, req.body, { new: true });
        return res.status(200).send({
            estatus: '200',
            err: false,
            msg: 'The evento already exists in the data base but it was updated.',
            cont:{
                eventoUpdated
            } 
        });
    }

    const evento = await ev.save();
    if (evento.length <= 0) {
        res.status(400).send({
            estatus: '400',
            err: true,
            msg: 'No se pudo registrar el evento en la base de datos.',
            cont: {
                evento
            }
        });
    } else {
        res.status(200).send({
            estatus: '200',
            err: false,
            msg: 'Informacion insertada correctamente.',
            cont: {
                evento
            }
        });
    }
    console.log(evento);
} catch (err) {
    res.status(500).send({
        estatus: '500',
        err: true,
        msg: 'Error al registrar al evento.',
        cont: {
            err: Object.keys(err).length === 0 ? err.message : err
        }
    });
}
});

// http://localhost:3000/api/place/?idPlaces=603939becf1db633f87595b2
app.put('/', async (req, res) => {
  try {

      const idEvent = new mongoose.mongo.ObjectId(req.body._id);
      console.log(req.body._id)

      if (idEvent == '') {
          return res.status(400).send({
              estatus: '400',
              err: true,
              msg: 'Error: No se envio un id valido.',
              cont: 0
          });
      }

      req.body._id = idEvent;

      const eventFind = await EventModel.findById(idEvent);

      if (!eventFind)
          return res.status(404).send({
              estatus: '404',
              err: true,
              msg: 'Error: No se encontro el evento en la base de datos.',
              cont: eventFind
          });

      const newEvent = new EventModel(req.body);

      let err = newEvent.validateSync();

      if (err) {
          return res.status(400).json({
              ok: false,
              resp: 400,
              msg: 'Error: Error al Insertar el evento.',
              cont: {
                  err
              }
          });
      }

      const eventUpdate = await EventModel.findByIdAndUpdate(idEvent, { $set: newEvent }, { new: true });

      if (!eventUpdate) {
          return res.status(400).json({
              ok: false,
              resp: 400,
              msg: 'Error: Al intentar actualizar el evento.',
              cont: 0
          });
      } else {
          return res.status(200).json({
              ok: true,
              resp: 200,
              msg: 'Success: Se actualizo el evento correctamente.',
              cont: {
                eventUpdate
              }
          });
      }

  } catch (err) {
      res.status(500).send({
          estatus: '500',
          err: true,
          msg: 'Error: Error al actualizar el evento.',
          cont: {
              err: Object.keys(err).length === 0 ? err.message : err
          }
      });
  }
});

app.delete('/', async (req, res) => {//se pueden declara variables dentro de la url usadas para eliminar
  try {

    const idEvent = new mongoose.mongo.ObjectId(req.body._id);
    console.log(req.body._id);
    blnActivo = req.body.blnActivo;

    if (req.query.idEvent == '') {
        return res.status(400).send({
            estatus: '400',
            err: true,
            msg: 'Error: No se envio un id valido.',
            cont: 0
        });
    }

    const eventFind = await EventModel.findById(idEvent);

    if (!eventFind)
        return res.status(404).send({
            estatus: '404',
            err: true,
            msg: 'Error: No se encontro el evento en la base de datos.',
            cont: eventFind
        });

    const newEvent = new EventModel(req.body);

    let err = newEvent.validateSync();

    if (err) {
        return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error: Error al Insertar el evento.',
            cont: {
                err
            }
        });
    }

    const eventUpdate = await EventModel.findByIdAndUpdate(idEvent, { $set: {active} }, { new: true });

    if (!eventUpdate) {
        return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error: Al intentar actualizar el evento.',
            cont: 0
        });
    } else {
      return res.status(200).json({
        ok: true,
        resp: 200,
        msg: `Success: Se a ${blnActivo === 'true' ? 'activado' : 'desactivado'} el evento correctamente.`,
        cont: {
            eventUpdate
        }
    });
    }

} catch (err) {
    res.status(500).send({
        estatus: '500',
        err: true,
        msg: 'Error: Error al actualizar el evento.',
        cont: {
            err: Object.keys(err).length === 0 ? err.message : err
        }
    });
}
});

module.exports = app;