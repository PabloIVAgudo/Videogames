import {GET_VIDEOGAMES} from '../actions/constants';

var initialState = {
    videogames: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return {
            ...state,
            videogames: action.payload
        }
        default: return state
    }
}

export default reducer;