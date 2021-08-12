const { Router } = require('express');
const {Genre , Videogame} = require('../db')
const axios = require('axios');
const router = Router();
require('dotenv').config();
const {YOUR_API_KEY} = process.env;

//Debe devolverme solo imagen, nombre y genero cuando no tiene query, de los primeros 100
router.get('' , async (req,res) => {
    const {name} = req.query;    
    if(!name){
        try{
            const apiVideogameGet1 = axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=1`);
            const apiVideogameGet2 = axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`);
            const apiVideogameGet3 = axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`);
            const apiVideogameGet4 = axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`);
            const apiVideogameGet5 = axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`);
            const dbVideogameGet = Videogame.findAll({include: Genre});
            const bothVideogameGet = await Promise.all([apiVideogameGet1,apiVideogameGet2,apiVideogameGet3,apiVideogameGet4,apiVideogameGet5,dbVideogameGet]);
            //Armo un array de 5 array con los 20 resultados por pagina y con lo que quiero mostrar 
            var apiVideogame=[];
            for(var i=0;i<5;i++){
                apiVideogame.push(bothVideogameGet[i].data.results.map(e =>{
                        return {
                            image: e.background_image,   
                            name: e.name,                                                     
                            genres: e.genres.map(g => {return {name: g.name, id: g.id}}),
                            id: e.id,
                            rating: e.rating
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
                    genres: e.genres.map(g => {return {name: g.name, id: g.id}}),
                    id: e.id,
                    rating: e.rating
                }
            });
            var allVideogame = dbVideogame.concat(apiVideogame)
            return res.json(allVideogame);          
        }catch(e){
            return res.status(404).send({message: "Error"});
        }
    }else{
        try{
            //Hacer el paginado de 15 resultados
            //Traigo y normalizo lo que encuentro en la DB con ese nombre
            var searchVideogameDB = await Videogame.findAll({where: {name: name} , include: Genre});
            searchVideogameDB =  searchVideogameDB.map(e =>{ 
                return {
                    image: e.image,
                    name: e.name,
                    genres: e.genres.map(g => {return {name: g.name, id: g.id}}),
                    id: e.id
                }
            });
            //Busco y normalizo lo que encuentre en la API con ese nombre         
            var searchVideogameAPI = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`);
            searchVideogameAPI =  searchVideogameAPI.data.results.map(e =>{            
                return {
                    image: e.background_image,
                    name: e.name,                                                
                    genres: e.genres.map(g => {return {name: g.name, id: g.id}}),
                    id: e.id
                }
            });
            var searchVideogame = [];
            //Si no existe videogames en DB con ese nombre, no le sumo el array vacío
            if(searchVideogameDB.length===0){
                searchVideogame = searchVideogameAPI.slice(0,15);                
            }
            //Si existe el videogame en DB, le concateno lo dela API
            if(searchVideogameDB.length>0){
                searchVideogame = searchVideogameDB.concat(searchVideogameAPI).slice(0,15);
            }
            //Si no existen juegos con ese nombre, tiro el mensaje de error
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
