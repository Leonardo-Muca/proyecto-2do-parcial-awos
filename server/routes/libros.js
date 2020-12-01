const express = require('express');
const _ = require('underscore');
const Libro = require('../models/libros');
const app = express();

app.get('/libro', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Libro.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de Libros obtenida con exito',
                conteo: libros.length,
                libros
            });
        });
});

app.post('/libro', function (req, res) {//req = obtener datos mandados por el cliente, res = mandar una respuesta
    let body = req.body;
    console.log(body)
    let lib = new Libro({
        titulo: body.titulo,
        autor: body.autor,
        editorial: body.editorial
    });

    lib.save((err, libBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        return res.json({
            ok: true,
            msg: 'Libro insertado con exito',
            libBD
        });
    });
});

app.put('/libro/:id', function (req, res) {//se pueden declara variables dentro de la url usadas para modificar
    let id = req.params.id;
    let body = _.pick(req.body, ['titulo', 'autor', 'editorial']);

    Libro.findByIdAndUpdate(id, body,
        { new: true, runValidators: true, context: 'query' },
        (err, libDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Libro actualizado con exito',
                usuario: libDB
            });
        });
});

app.delete('/libro/:id', function (req, res) {//se pueden declara variables dentro de la url usadas para eliminar
    let id = req.params.id;
    res.json({
        ok: 200,
        mensaje: 'Libro actualizado con exito',
        id: id
    });
});

module.exports = app;