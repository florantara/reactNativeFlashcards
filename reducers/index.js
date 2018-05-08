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
            console.log("ADD_DECK", action.title, action.color, action.id)
            return {
                ...state,
                [action.title]: {
                    color: action.color,
                    id: action.id,
                    title: action.title,
                    cards: []
                }
            }
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