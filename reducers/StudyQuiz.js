import {
    START_RANDOM_QUIZ,
    ADD_SCORE,
    CALCULATE_SCORE
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
            console.log("Action @ Reducer: ADD_SCORE", action.score)
            return {
                ...state,
                scores: [
                    ...state.scores,
                    action.score
                ]
            }
        case CALCULATE_SCORE :
            console.log("Action @ Reducer: CALCULATE_SCORE")
            return state
        default:
            return state
    }
}