import axios from 'axios';
import {GET_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_GENRES} from './constants';

export function getVideogames() {
    return function(dispatch) {
        return axios.get("http://localhost:3001/videogames")
        .then((videogames) => {
            dispatch({type: GET_VIDEOGAMES, payload: videogames.data})
        })
    }
}

export function getVideogameByName(name) {
    return function(dispatch) {
        return axios.get("http://localhost:3001/videogames?name=" + name)
        .then((videogame) => {
            dispatch({type: GET_VIDEOGAME_BY_NAME, payload: videogame.data})
        })
    }
}

export function getGenres() {
    return function(dispatch) {
        return axios.get("http://localhost:3001/genres")
        .then((genres) => {
            dispatch({type: GET_GENRES, payload: genres.data})
        })
    }
}