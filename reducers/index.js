import { combineReducers } from 'redux'

import { Decks } from './Decks';
import { StudyQuiz } from './StudyQuiz';

export default combineReducers({
    decks: Decks,
    quiz: StudyQuiz
})


