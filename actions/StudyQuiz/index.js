import * as API from '../../utils/api'

import {
    START_RANDOM_QUIZ,
    ADD_SCORE,
    START_DECK_QUIZ
} from '../types'


// Random Quiz from all Decks
export const startRandomQuiz = (decks) => ({
    type: START_RANDOM_QUIZ,
    decks
})

export const randomQuiz = () => dispatch =>
    API.getDecks().then( data => {
            const decks = JSON.parse(data)
            const initialData = dummyData
            let allDecks
            if ( decks ) {
                allDecks = decks
            }
            else {
                API.setInitialData(initialData)
                allDecks = initialData
            }
            const reducedDecks = Object.values(allDecks).map( deck => ({
                deck: deck.title,
                cards: deck.cards
            }));

            return reducedDecks
        }
    ).then( reducedDecks => dispatch(startRandomQuiz(reducedDecks))  )


// Vote Cards
export const addScore = (score) => ({
    type: ADD_SCORE,
    score
})


// Quiz From Specific Deck
export const startQuizFromDeck = (deck) => ({
    type: START_DECK_QUIZ,
    deck,
})

export const deckQuiz = (deckTitle) => dispatch =>
    API.getDeck(deckTitle).then( deck => {
        const reducedDeck = [{
            deck: deck.title,
            cards: deck.cards
        }]
        return reducedDeck
    }
).then( deck => dispatch(startQuizFromDeck(deck)))
