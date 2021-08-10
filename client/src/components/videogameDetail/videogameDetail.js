import './videogameDetail.css';
import NavigationBar from '../navigationBar/navigationBar';
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams } from 'react-router-dom';

function VideogameDetail(){
    const [videogameById, setVideogameById] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    async function getVideogameById(e){
        const resultadoBusqueda = await axios.get(`http://localhost:3001/videogame/${e}`);
        setVideogameById(resultadoBusqueda.data);        
    }

    useEffect(() => {
        getVideogameById(id);
        setLoading(false);
    },[])

    return (
        <div>
            <NavigationBar />            
            {loading ? <p>Loading...</p> : videogameById?.genres && <div>
                <img src={videogameById.image} alt="Image does not exist"/>
                <p>Name: {videogameById.name}</p>
                <p>Genres: {videogameById.genres}</p>
                <p>Description: {videogameById.description.split('<br />').join(' ').split('<p>').join('').split('</p>').join('').split('<br/>').join(' ').split('<strong>').join(' ').split('</strong>').join(' ')}</p>
                <p>Release date: {videogameById.releaseDate}</p>
                <p>Rating: {videogameById.rating}</p> 
                <p>Platforms: {videogameById.platforms}</p>               
            </div>}               
        </div>
    )
}

export default VideogameDetail;