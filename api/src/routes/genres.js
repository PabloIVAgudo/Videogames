const { Router } = require('express');
const {Genre} = require('../db');
const router = Router();

//Debe traerme todos los generos de videojuegos para ser usados desde aquí
router.get('' , async (req,res) => {
    try{
        const videogame= await Videogame.findAll();
        return res.json(videogame);
    }catch(e){
        return res.status(404).send(e);
    }    
});

//Esto lo puedo usar para probar pero si sale a ala primera lo elimino nomas
router.post('' , (req,res) => {
    res.send('Estoy en el post de genre');
});

module.exports = router;