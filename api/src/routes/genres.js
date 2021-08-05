const { Router } = require('express');
const {Genre} = require('../db');
const router = Router();
const axios = require('axios');
require('dotenv').config();
const {YOUR_API_KEY} = process.env;

//Debe traerme todos los generos de videojuegos para ser usados desde aquí
router.get('' , async (req,res) => {
    try{
        //Con esto me aseguro de verificar la existencia de una DB de genres con el valor del id de un genre
        //Busco que el id exista en los que tengo en DB (arreglar esto cuando tenga regrese la API)
        var promesaPrueba= await Genre.findByPk(5158);         
        //Este primer if es para el caso que no exista ese id, crea la DB
        if(!promesaPrueba){ 
            const apiGenre= await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
            var arrayGenre=[];
            arrayGenre.push(apiGenre.data.results.map(e =>{
                return {
                    id: e.id,
                    name: e.name
                };
            })
        )
        arrayGenre=arrayGenre.reduce((a,b) => a.concat(b));
        await Genre.bulkCreate(arrayGenre);
        return res.json(arrayGenre);        
        }        
        return res.send("No entre al if");
        
    }catch(e){
        return res.status(404).send(e);
    }    
});

module.exports = router;