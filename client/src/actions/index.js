import axios from 'axios';
import {GET_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_GENRES} from './constants';

export function getVideogames() {
    return async function(dispatch) {
        try{
            var videogames = await axios.get("http://localhost:3001/videogames");
            return dispatch({type: GET_VIDEOGAMES, payload: videogames.data});
        }catch(e){
            return console.log(e);
        }        
    }
}

export function getVideogameByName(name) {
    return async function(dispatch) {
        try{
            var videogame = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({type: GET_VIDEOGAME_BY_NAME, payload: videogame.data});
        }catch(e){
            return console.log(e);
        } 
    }   
}

export function getGenres() {    
    return async function(dispatch) {
        try{
            var genres = await axios.get("http://localhost:3001/genres");
            return dispatch({type: GET_GENRES, payload: genres.data});
        }catch(e){
            return console.log(e);
        }
    }
}