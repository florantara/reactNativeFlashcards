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
                //console.log("Using Data from AsyncStorage")
                //console.log(decks)
                dispatch(getDecksAction(decks))
            } else {
                //console.log("Starting with Initial Data")
                //console.log(decks)
                //console.log('but...............')
                //console.log(initialData)

                API.setInitialData(initialData).then( data =>
                    dispatch(getDecksAction(initialData))
                )
            }
        }
    )



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


export function addDeck(deck){
    return{
        type: ADD_DECK,
        deck
    }
}