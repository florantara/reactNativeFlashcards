
import { AsyncStorage } from 'react-native'

export const DATA_STORAGE_KEY = 'Cards'

// Set Initial Data
export function setInitialData() {

    const initialData = [
        {
            id: 1,
            title: 'React',
            color: '#FF33A7',
            cards: [
                {
                    question: 'What is React?',
                    answers: {
                        'right': [
                            'A library for managing user interfaces'
                        ],
                        'wrong': [
                            'A JavaScript framework',
                            'A UI JavaScript Kit'
                        ]
                    }
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answers: {
                        'right': [
                            'The componentDidMount lifecycle event.'
                        ],
                        'wrong': [
                            'In the render lifecycle event.',
                            'In a stateless component.'
                        ]
                    }
                }
            ]
        },
        {
            id: 2,
            title: 'JavaScript',
            color: '#FE4781',
            cards: [
                {
                    question: 'What is a closure?',
                    answers: {
                        'right': [
                            'The combination of a function and the lexical environment within which that function was declared.'
                        ],
                        'wrong': [
                            'A function that calls itself until it doesn\'t anymore',
                            'The global scope of a function.'
                        ]
                    }
                }
            ]
        }
    ]


    AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(initialData))

}

export function getDecks() {
    return AsyncStorage.getItem(DATA_STORAGE_KEY);
}

// export function getDeck(id) {
//     return AsyncStorage.getItem(DATA_STORAGE_KEY).then(decks => {
//         return JSON.parse(decks)[id];
//     });
// }
//
// export function saveDeckTitle(title) {
//     return AsyncStorage.mergeItem(
//         DATA_STORAGE_KEY,
//         JSON.stringify({
//             [title]: {
//                 title,
//                 questions: []
//             }
//         })
//     );
// }
//
// export function addCardToDeck(title, card) {
//     getDeck(title).then(deck => {
//         deck.questions.push(card);
//         return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({ [title]: deck }));
//     });
// }


// Helper Methods:

// getDecks: return all of the decks along with their titles, questions, and answers.

// getDeck: take in a single id argument and return the deck associated with that id.

// saveDeckTitle: take in a single title argument and add it to the decks.

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.