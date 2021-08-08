import axios from 'axios';
import {GET_VIDEOGAMES} from './constants';

export function getVideogames() {
    return function(dispatch) {
        return axios.get("http://localhost:3001/videogames")
        .then((e) => {
            dispatch({
                type: GET_VIDEOGAMES,
                payload: e.data
            })
        })
    }
}