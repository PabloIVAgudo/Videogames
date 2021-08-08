import {GET_VIDEOGAMES, GET_VIDEOGAME_BY_NAME} from '../actions/constants';

var initialState = {
    videogames: [],
    videogameByName: []
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
            videogameByName: action.payload
        }
        default: return state;
    }
}

export default reducer;