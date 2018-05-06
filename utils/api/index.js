
import { AsyncStorage } from 'react-native'
import { dummyData } from './dummyData'

export const DATA_STORAGE_KEY = 'APP:Data'

// Set Initial Data
export function setInitialData() {
    const initialData = dummyData;
    AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(initialData))
}

export function getDecks() {
    return AsyncStorage.getItem(DATA_STORAGE_KEY);
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DATA_STORAGE_KEY).then(result => {
        const data = JSON.parse(result);
        return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
            [title]: {
                cards: [
                    ...data[title].cards,
                    card
                ]
            }
        }));
    });
}


// Helper Methods:

// getDecks: return all of the decks along with their titles, questions, and answers.

// getDeck: take in a single id argument and return the deck associated with that id.

// saveDeckTitle: take in a single title argument and add it to the decks.

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.