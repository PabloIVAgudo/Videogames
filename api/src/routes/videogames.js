const { Router } = require('express');
const {Genre , Videogame} = require('../db')
const axios = require('axios');
const router = Router();
require('dotenv').config();
const {YOUR_API_KEY} = process.env;

//Debe devolverme solo imagen, nombre y genero cuando no tiene query, de los primeros 100
//Con query debe mostrar los primeros 15 resultados con ese name sino mensaje de error
router.get('' , async (req,res) => {
    const {name} = req.query;    
    if(!name){
        try{
            const apiVideogameGet1 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=1`);
            const apiVideogameGet2 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`);
            const apiVideogameGet3 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`);
            const apiVideogameGet4 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`);
            const apiVideogameGet5 = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`);
            const dbVideogameGet = await Videogame.findAll({include: Genre});
            const bothVideogameGet = await Promise.all([apiVideogameGet1,apiVideogameGet2,apiVideogameGet3,apiVideogameGet4,apiVideogameGet5,dbVideogameGet]);
            //Armo un array de 5 array con los 20 resultados por pagina y con lo que quiero mostrar 
            var apiVideogame=[];
            for(var i=0;i<5;i++){
                apiVideogame.push(bothVideogameGet[i].data.results.map(e =>{
                        return {
                            image: e.background_image,
                            name: e.name,
                            genres: e.genres.map(g => g.name).join(',')
                        };
                    })
                )
            }
            apiVideogame= apiVideogame.reduce((a,b) => a.concat(b)); //Transformo al array de 5 array de 20 objetos c/u en un solo array de 100 objetos
            //Modifico lo que viene por DB para mostrar lo que quiero
            var dbVideogame = bothVideogameGet[5].map(e =>{            
                return {
                    image: e.image,
                    name: e.name,
                    genres: e.genres.map(g => g.name).join(',')
                }
            });
            var allVideogame = dbVideogame.concat(apiVideogame)
            return res.json(allVideogame);          
        }catch(e){
            return res.status(404).send({message: "Error"});
        }
    }else{
        try{
            //Debo revisar si esta parte de 15 resultados tiene que ser hecho en el front
            const searchVideogameDB= await Videogame.findAll({where:{name: name}});
            const searchVideogameAPI = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`);
            var searchVideogame = searchVideogameDB.concat(searchVideogameAPI.data.results);
            if(searchVideogame.length===0){
                return res.status(404).send("No se encuentra ningún videojuego con el nombre buscado.");
            }            
            return res.json(searchVideogame);
        }catch(e){
            return res.send(e);
        }
    }    
});

module.exports = router;
