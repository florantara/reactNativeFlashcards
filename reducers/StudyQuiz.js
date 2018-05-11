import {
    START_RANDOM_QUIZ,
    ADD_SCORE,
    START_DECK_QUIZ
} from '../actions/types'

import { getRandom } from '../utils/tools'

const quiz = {
    cards: {},
    decks: {},
    scores: []
}

// There are 2 Options for Quizes: Random and Deck Specific
// The Random one, grabs all the cards, and specifies 5 (if there are more than 5 in the app)
// The Deck one, sets up a singleDeck value that will be used in the DecksScreen
export function StudyQuiz( state = quiz, action ){
    switch(action.type){
        case START_RANDOM_QUIZ :
            const cards = action.decks.reduce( (onlyCards, deck) => {
                onlyCards = [
                    ...onlyCards,
                    ...deck.cards
                ]
                return onlyCards
            },[] )
            const cardsAmount = cards.length < 5 ? cards.length : 5;
            const selectedCards =  getRandom( cards, cardsAmount)
            return {
                ...state,
                ...state.cards = selectedCards,
                ...state.decks = action.decks,
                ...state.scores = []

            }
        case ADD_SCORE :
            return {
                ...state,
                scores: [
                    ...state.scores,
                    action.score
                ]
            }
        case START_DECK_QUIZ :
            return {
                ...state,
                ...state.cards = action.deck[0].cards,
                ...state.scores = []

            }
        default:
            return state
    }
}