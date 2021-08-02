const { Router } = require('express');
const {Genre , Videogame} = require('../db')
const router = Router();

//Debe devolverme solo imagen, nombre y genero cuando no tiene query, de los primeros 100
//Con query debe mostrar los primeros 15 resultados con ese name sino mensaje de error
router.get('' , async (req,res) => {
    const {name} = req.query;
    if(!name){
        try{
            const videogame= await Videogame.findAll({include: Genre});
            return res.json(videogame);
        }catch(e){
            return res.status(404).send(e);
        }
    }else{
        try{
        }catch(e){}
    }    
});


//Estas lineas tengo que eliminarlas una vez que funcione tod porque esto solo es prueba y va en videogame sin s
router.post('' , async (req,res) => {
    const {name, description, releaseDate, rating, plattforms} = req.body;
    try{
        const createdVideogame = await Videogame.create({name, description, releaseDate, rating, plattforms});
        return res.json(createdVideogame);
    }catch(e){
        return res.status(404).send(e);
    }    
});

module.exports = router;
