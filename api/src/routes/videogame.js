const { Router } = require('express');
const {Genre, Videogame} = require('../db');
const router = Router();

//Debe mostrar imagen nombre, generos,descripcion,fecha de lanzamiento,rating,plataformas
router.get('/:idVideogame' , (req,res) => {
    res.send('Estoy en el get de videogame');
});

//Debe ingresar nombre,descripcion,fecha de lanzamiento,rating.
//Se debe poder seleccionar/agregar varios generos,plataformas
router.post('/' , async (req,res) => {
    const {name, description, releaseDate, rating, plattforms, genres} = req.body;
    try{
        var createdVideogame = await Videogame.create({name, description, releaseDate, rating, plattforms});
        var createdGenre = await Genre.create({name: genres});
        var resultVideogame= await createdVideogame.addGenre(createdGenre);
        return res.json(resultVideogame);
    }catch(e){
        return res.status(404).send(e);
    }    
});

module.exports = router;
