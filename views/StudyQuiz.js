import React, { Component } from 'react'
import {  NavigationActions } from 'react-navigation';

// React Native
import {
    View,
    Text,
    AsyncStorage
} from 'react-native'

//Components
import Card from '../components/Card'
import Layout from '../components/Layout'
import ScoreScreen from '../components/ScoreScreen'

// Store
import { connect } from 'react-redux'
import * as actions from '../actions/StudyQuiz'

// Extras
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { blue } from '../utils/colors'


class StudyQuiz extends Component{

    static navigationOptions ={
        title: "Study Quiz",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: blue,
            paddingBottom: 20,
            paddingTop: getStatusBarHeight() + 20,
            height: 80
        }
    }

    state = {
        cards: [],
        activeCard: undefined,
        maxCards: 5,
        scores: [],
        showingFinalScreen: false,
        fromSingleDeck: false,
        singleDeckTitle: '',
        singleDeckColor: ''
    }

    componentWillMount(){
        // If it's coming From a Deck, start quiz from Deck
        if ( this.props.navigation.state.params.isSingleDeck ){

            // Dispatch Action
            this.props.deckQuiz(this.props.navigation.state.params.title)

            // Setup State with Deck info to be used in the ScoreScreen component
            this.setState({
                fromSingleDeck: true,
                singleDeckTitle: this.props.navigation.state.params.title,
                singleDeckColor: this.props.navigation.state.params.color
        //
            })
        } else {

            // Dispatch the Random Quiz
            this.props.randomQuiz()
        }
    }

    componentWillReceiveProps(nextProps){

        if (  nextProps.quiz.cards ) {

            // Keep the Scores State updated
            this.setState({
                scores: nextProps.quiz.scores
            })

            // If there is an Active card already, don't refresh these.
            if ( ! this.state.activeCard ){
                this.setState({
                    maxCards: nextProps.quiz.cards.length,
                    activeCard: this.getCardData(0, nextProps.quiz.cards),
                })
            }

            // If no cards yet in the component, setup cards
            if ( this.state.cards.length === 0 ){
                this.setState({
                    cards: nextProps.quiz.cards,
                })
            }
        }

    }

    // Select the card corresponding to the index and return an object to be used in the state.activeCard
    getCardData = (index, cards) => {
        if ( cards[index] && (index !== cards.length) ){
            return {
                cardNumber: index + 1,
                question: cards[index].question,
                displayAnswer: this.getOneAnswer(cards[index].answers.right, cards[index].answers.wrong),
                rightAnswer: cards[index].answers.right
            }
        }
        return false
    }

    // Mix all answers, right and wrong, and get just 1 to show
    getOneAnswer = ( right, wrong ) => {
        const answers = [
            right,
            ...wrong
        ]
        return answers[Math.floor(Math.random()*answers.length)]
    }

    // Add Vote to Scores list and move on
    voteCard = (vote) => {
        const { displayAnswer, rightAnswer } = this.state.activeCard
        let score
        if ( vote === 'correct'){
            score = displayAnswer === rightAnswer ? 1 : 0
        } else {
            score = displayAnswer === rightAnswer ? 0 : 1
        }
        this.props.addScore(score)
        this.nextCard()
    }

    nextCard(){
        const nextCard = this.getCardData( this.state.activeCard.cardNumber , this.state.cards);

        // If there is a next card...
        if ( nextCard ) {
            this.setState({
                activeCard: nextCard
            })


        // Otherwise, show the score
        } else {
            this.setState({
                showingFinalScreen: true
            })
        }
    }


    // Action Triggered when Play Again button is clicked on the ScoreScreen
    // As stacknavigators stack, the < Back arrow originally leads to th previous deck
    // This cleans up the Stack and the "previous" screen is the Decks sccreen
    // Note: This is V1 of ReactNavigator
    resetQuiz = () =>{

        let newQuizRoute

        if ( this.props.navigation.state.params ){
            newQuizRoute = {
                routeName: 'StudyQuiz',
                params: this.props.navigation.state.params
            }
        } else {
            newQuizRoute = {
                routeName: 'StudyQuiz'
            }
        }

        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Decks' }),
              NavigationActions.navigate(newQuizRoute),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        // Get these values from this.state
        const { activeCard, showingFinalScreen, scores, maxCards, fromSingleDeck , singleDeckTitle, singleDeckColor} = this.state
        return(
            <Layout blank>
                { showingFinalScreen ?
                    <ScoreScreen
                        scores={scores}
                        resetQuiz={this.resetQuiz}
                        navigation={this.props.navigation}
                        isSingleDeck={fromSingleDeck}
                        singleDeckTitle={singleDeckTitle}
                        singleDeckColor={singleDeckColor}
                    />
                    :
                    <Card
                        maxCards={maxCards}
                        cardNumber={activeCard && activeCard.cardNumber}
                        question={activeCard && activeCard.question}
                        displayAnswer={activeCard &&  activeCard.displayAnswer}
                        onSubmitVote={(vote) => this.voteCard(vote)}
                    />
                }
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, actions)(StudyQuiz)