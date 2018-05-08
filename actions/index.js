import * as API from '../utils/api'
import dummyData  from '../utils/api/dummyData'

export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'


// Get Decks
export const getDecksAction = decks => ({
    type: GET_DECKS,
    decks
})

export const getDecks = () => dispatch =>
    API.getDecks().then( data => {
            const decks = JSON.parse(data)
            const initialData = dummyData
            if ( decks ) {
                dispatch(getDecksAction(decks))
            } else {
                API.setInitialData(initialData).then( data =>
                    dispatch(getDecksAction(initialData))
                )
            }
        }
    )


// Add Card
export const addCardAction = (title, card) => ({
        type: ADD_CARD,
        title,
        card
})

export const addCard = (title, card) => dispatch =>
    API.addCardToDeck(title, card).then( data => {
            dispatch(addCardAction(title, card))
        }
    )


// Add Deck
export function addDeckAction(title, color, id){
    return{
        type: ADD_DECK,
        title,
        color,
        id
    }
}

export const addDeck= (newDeck) => dispatch => {
    const { title, id, color } = newDeck
    API.addDeck(newDeck).then( data => {
            dispatch(addDeckAction(title, color, id))
        }
    )
}
