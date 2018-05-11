
import { AsyncStorage } from 'react-native'

export const DATA_STORAGE_KEY = 'mobileFlashCards:Data'

// Set Initial Data
export const setInitialData = (data) => AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))

// Get Decks
export const getDecks = () => AsyncStorage.getItem(DATA_STORAGE_KEY);

// Get Specific Deck
export const getDeck = (title) => {
    return AsyncStorage.getItem(DATA_STORAGE_KEY).then(result => {
        const data = JSON.parse(result)
        return data[title]
    });
}


// Add Card
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

// Add Deck
export function addDeck(newDeck){
    const { title, id, color } = newDeck
    return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            id: id,
            color: color,
            cards: []
        }
    }))
}