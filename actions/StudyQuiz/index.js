import * as API from '../../utils/api'

import {
    START_RANDOM_QUIZ,
    ADD_SCORE,
    CALCULATE_SCORE
} from '../types'

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

export const addScore = (score) => ({
    type: ADD_SCORE,
    score
})

export const calculateScore = () => ({
    type: CALCULATE_SCORE
})
