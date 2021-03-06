import {GET_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_GENRES} from '../actions/constants';

var initialState = {
    videogames: [],
    genres: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return {
            ...state,
            videogames: action.payload
        }
        case GET_VIDEOGAME_BY_NAME:
            return {
            ...state,
            videogames: action.payload
        }
        case GET_GENRES:
            return {
            ...state,
            genres: action.payload
        }
        default: return state;
    }
}

export default reducer;