const express = require('express');
const Usuario = require('../../models/user.model');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email}, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento del logueo',
                err
            })
        }

        if (!usrDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Mail incorrecto o inexistente intentelo de nuevo'
            });
        }

        if (body.password != usrDB.password) {
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta, intentelo de nuevo'
            })
        }

        res.json({
            ok: true,
            msg: `Bienvenido ${usrDB.name}`,
            usrDB
        })
    });
});

module.exports = app;