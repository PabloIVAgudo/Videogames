const { Router } = require('express');
const {Genre, Videogame} = require('../db');
const router = Router();
const axios = require('axios');
require('dotenv').config();
const {YOUR_API_KEY} = process.env;

//Debe mostrar nombre, imagen, descripcion,fecha de lanzamiento,rating,plataformas, generos
router.get('/:id' , async (req,res) => {
    const {id} = req.params;
    try{
        const detailsVideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
        nuevaListaDetalle = {
            name: detailsVideogame.data.name,
            description: detailsVideogame.data.description,
            releaseDate: detailsVideogame.data.released,
            rating: detailsVideogame.data.rating,
            platforms: detailsVideogame.data.platforms.map(e => e.platform.name).join(','),
            image: detailsVideogame.data.background_image,
            genres: detailsVideogame.data.genres.map(e => e.name).join(',')
        }
        return res.json(nuevaListaDetalle);
    }catch(e){
        return res.status(404).send(e);
    }
});

//Debe ingresar nombre,descripcion,fecha de lanzamiento,rating.
//Se debe poder seleccionar/agregar varios generos,plataformas
//en este caso debo agregar platforms (posible array) como string (Lo convierto en 1 string en el front antes de pasarlo o acá)
//para el caso de Genre debo revisar que me tiene que venir un array de objetos: genres=[{name: genero},{name: genero}]
//si genres me viene como array de strings, lo transformo en lo que necesito (Esto es lo que aplico al final)
router.post('' , async (req,res) => {
    var {name, description, releaseDate, rating, platforms, image, genres} = req.body;
    platforms = platforms.join(',');
    genres=genres.map(e =>{return {name: e}});
    try{
        var createdVideogame = await Videogame.create({name, description, releaseDate, rating, platforms,image});
        var createdGenre = await Genre.bulkCreate(genres);
        var resultVideogame= await createdVideogame.addGenres(createdGenre);
        return res.json(resultVideogame);
    }catch(e){
        return res.status(404).send(e);
    }    
});

module.exports = router;
