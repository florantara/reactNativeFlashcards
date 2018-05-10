import React, { Component } from 'react'

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
        scores: [],
        showingFinalScreen: false
    }

    componentWillMount(){

        // If we have a Deck selected
        // this.props.startQuiz() at deck
        // if not, it's Random!
        this.props.randomQuiz()
        //AsyncStorage.clear()
    }

    componentWillReceiveProps(nextProps){

        if (  nextProps.quiz.cards ) {

            // Keep the Scores State updated
            this.setState({
                scores: nextProps.quiz.scores
            })

            // If these area already populated, don't refresh.
            if ( ! this.state.activeCard ){
                this.setState({
                    activeCard: this.getCardData(0, nextProps.quiz.cards),
                })
            }
            if ( this.state.cards.length === 0 ){
                this.setState({
                    cards: nextProps.quiz.cards,
                })
            }
            //console.log(nextProps.quiz.cards)
        }
    }

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
    getOneAnswer = ( right, wrong ) => {
        const answers = [
            right,
            ...wrong
        ]
        return answers[Math.floor(Math.random()*answers.length)]
    }
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
        if ( nextCard ) {
            this.setState({
                activeCard: nextCard
            })
        } else {
            // trigger Calculate Score
            this.setState({
                showingFinalScreen: true
            })
        }
    }

    render(){
        const { activeCard, showingFinalScreen, scores } = this.state
        return(
            <Layout>
                { showingFinalScreen ?
                    <ScoreScreen scores={scores}/>
                    :
                    <Card
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