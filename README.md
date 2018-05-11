## Mobile Flash Cards
This is the third project for the Udacity [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).


[Open Demo](https://res.cloudinary.com/techflor/video/upload/v1526076172/App_Preview.mp4)

*Tested on iPhoneX*

### Installation
Run:
- `npm install`
- `npm start`

In a different Terminal:
- `react-native run-ios `

### Features

#### Storage:
- Uses AsyncStorage to persist data.
- Uses Redux to manage application state.

#### Views:
1) Decks List (Initial Screen)
- Displays a List of all the Decks showing how many cards each have.
- Displays a button to create a new deck, and that happens in the same screen. New decks receive a random color assigned.

2) Single Deck
- A Specific screen for each Deck, showing the title, using the deck color, showing the amount of cards and 2 actions:
- Button to Create a new card on this deck.
- If there are cards already assigned, there's a button to run a Study Quiz.

3) Create Card
- Form with different fields to create a new card.
- The Deck dropdown is populated with the Deck Title, additionally, if this screen is accessed from the "Extras" screen, this field will be empty and a modal will show up enabling the Deck selection.
- There are fields to add the Right question, and a "repeatable" field to add 1 or more Wrong questions. These will be used to create the quiz card.
- Fields validate.
- After the card was added, it navigates to the previous screen. If it was the Deck's screen, the Card Amount value gets updated.

4) Study Quiz
- There are 2 types of quiz: When it's triggered from a specific Deck, it uses *all* cards from that deck. When it comes from the "Extras" screen, it will mix all cards from all decks, and show 5 random ones.
- The activity consists in 1 card at a time, with a question, and a suggested answer, and the user has to pick if it's "Correct" or "Incorrect".
- Only the Question is shown at first, and there's a button to flip the card and show the suggested answer and the voting buttons.
- After all the cards have been voted, the score is calculated and the Score Screen shows up.

5) Score Screen:
- Final screen in the Study Quiz, it has 3 emoticons to show depending on the percentage.
- If it's a Specific Deck quiz, it will show a button to Go Back to the deck.
- In both Study Quiz types, it shows a button to Play Again, restarting the quiz in the given context.

#### Notifications
A Local Notification is setup to remind the user to Study every day at 8pm.

### CRNA
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).


