import {
    GET_DECKS,
    ADD_CARD,
    ADD_DECK
} from '../actions'

function decks ( state = {}, action ){
    switch(action.type){
        case GET_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            return state
        case ADD_CARD :
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    cards: [
                        ...state[action.title].cards,
                        action.card
                    ]
                }
            }
        default:
            return state
    }
}

export default decks