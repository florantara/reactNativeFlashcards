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
                ...state.decks = action.deck,
                ...state.cards = action.deck[0].cards
            }
        default:
            return state
    }
}