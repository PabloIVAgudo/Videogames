const { Router } = require('express');
const {Genre} = require('../db');
const router = Router();
const axios = require('axios');
require('dotenv').config();
const {YOUR_API_KEY} = process.env;

//Debe traerme todos los generos de videojuegos para ser usados desde aquí
router.get('' , async (req,res) => {
    try{
        const apiGenre= await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
        var arrayGenre=[];
        arrayGenre.push(apiGenre.data.results.map(e =>{
            return {
                name: e.name
                };
            })
        )
        arrayGenre=arrayGenre.reduce((a,b) => a.concat(b));
        await Genre.bulkCreate(arrayGenre);
        return res.json(arrayGenre);
    }catch(e){
        return res.status(404).send(e);
    }    
});

module.exports = router;