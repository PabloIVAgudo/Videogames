import s from './videogameDetail.module.css';
import NavigationBar from '../navigationBar/navigationBar';
import Loader from "react-loader-spinner";
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
    },[id])

    return (
        <div className={s.totalScreen}>
            <NavigationBar />            
            {loading ? <div className={s.loader}><Loader type="Circles" color="#fafafa" height={100} width={100}/></div> : 
                videogameById?.genres && <div className={s.container}><div className={s.tarjetaEntera}>
                <img className={s.imagen} src={videogameById.image} alt="Image does not exist"/>
                <p>Name: <span>{videogameById.name}</span></p>
                <p>Genres: <span>{videogameById.genres}</span></p>
                <p>Description: <span>{videogameById.description.replace(/(<([^>]+)>)/ig, '')}</span></p>
                <p>Release date: <span>{videogameById.releaseDate}</span></p>
                <p>Rating: <span>{videogameById.rating} / 5 </span></p> 
                <p>Platforms: <span>{videogameById.platforms}</span></p>               
            </div></div>}               
        </div>       
    )
}

export default VideogameDetail;