const express = require('express');
const router = express.Router();
const {usuariosModel} = require('../models/usuariosModel')

//Main route
router.get('/', (req, res) => {
    res.send('Deu certo ')
})

//Login route
router.get('/login', (req, res) => {
    res.send('Está no login')
})
router.post('/login', (req, res) => {
    const {nome, email, senha, perfil_id} = req.body;
})

//Return json
//app.use(express.json())

module.exports = router