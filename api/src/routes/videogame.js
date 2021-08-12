const { Router } = require('express');
const {Genre, Videogame} = require('../db');
const router = Router();
const axios = require('axios');
require('dotenv').config();
const {YOUR_API_KEY} = process.env;

//Debe mostrar nombre, imagen, descripcion,fecha de lanzamiento,rating,plataformas, generos
router.get('/:id' , async (req,res) => {
    const {id} = req.params;
    if(!id){
        return res.status(404).send("Error from id undefined");
    }
    var detailsVideogame;
    try{
        if(id.length < 10){
            detailsVideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
            nuevaListaDetalle = {
                name: detailsVideogame.data.name,
                description: detailsVideogame.data.description,
                releaseDate: detailsVideogame.data.released,
                rating: detailsVideogame.data.rating,
                platforms: !detailsVideogame.data.platforms.length ? "Not defined" : detailsVideogame.data.platforms.map(e => e.platform.name).join(','),
                image: detailsVideogame.data.background_image,
                genres: !detailsVideogame.data.genres.length ? "Not defined" : detailsVideogame.data.genres.map(g => g.name).join(',')
            };                        
        }else{
            detailsVideogame = await Videogame.findByPk(id,{include: Genre});
            nuevaListaDetalle = {
                name: detailsVideogame.name,
                description: detailsVideogame.description,
                releaseDate: detailsVideogame.releaseDate,
                rating: detailsVideogame.rating,
                platforms: detailsVideogame.platforms,
                image: detailsVideogame.image,
                genres: detailsVideogame.genres.map(g => g.name).join(',')
            };
        }
        return res.status(200).send(nuevaListaDetalle);
    }catch(e){
        return res.status(404).send(e);
    }
});

//Debe ingresar nombre,descripcion,fecha de lanzamiento,rating.
//Se debe poder seleccionar/agregar varios generos,plataformas
router.post('' , async (req,res) => {
    var {name, description, releaseDate, rating, platforms, genres} = req.body;
    var image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gnome-joystick.svg/1024px-Gnome-joystick.svg.png";
    platforms = platforms.join(',');
    // Con solo enviarles el genres con los id de los genres que quiero agregar, sería todo.
    try{
        var createdVideogame = await Videogame.create({name, description, releaseDate, rating, platforms, image}); 
        //Transformo genres que son strings de name en numeros de id
        var genresPromise = genres.map(e => {
            var gen = Genre.findOne({where:{name: e}});
            return gen;
        })
        var genresResults = await Promise.all(genresPromise);
        var genresId = genresResults.map(e => e.id);
        //Una vez con array de id, creo la relación entre ambas tablas
        var resultVideogame= await createdVideogame.addGenres(genresId);
        return res.json(resultVideogame);
    }catch(e){
        return res.status(404).send(e);
    }    
});

module.exports = router;
