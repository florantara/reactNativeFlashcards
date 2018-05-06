import {
    GET_DECKS,
    ADD_CARD,
    ADD_DECK
} from '../actions'

function decks ( state = {}, action ){
    switch(action.type){
        case GET_DECKS :
            return state
        case ADD_DECK :
            return state
        case ADD_CARD :
            console.log("Reducer ADD_CARD")
            return state
        default:
            return state
    }
}