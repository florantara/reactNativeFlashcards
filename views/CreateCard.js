import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height'
import { pink, green, gray, lightgray, lightgreen } from '../utils/colors'
import styled from 'styled-components/native'

import Field from '../components/Field'
import ModalSelectDecks from '../components/ModalSelectDecks'

import {
    DATA_STORAGE_KEY,
    addCardToDeck
} from '../utils/api'

const Container = styled.View`
    padding: 0 40px 40px;
`

const Select = styled.Text`
    height: 45px;
    width: 100%;
    font-size: 15px;
    padding-top: 15px
`

const SubmitButton = styled.TouchableOpacity`
    background-color: ${lightgreen};
    align-items: center;
    padding: 30px 0;
    height: 80px;
    width: 100%;
`


export default class CreateCard extends Component {
    static navigationOptions ={
        title: "New Card",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: pink,
            paddingBottom: 20,
            paddingTop: getStatusBarHeight() + 20,
            height: 80
        }
    }
    state = {
        inputDeck: '',
        deckID: null,
        inputQuestion: '',
        inputCorrectAnswer: '',
        inputWrongAnswers: [],
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    updateInput = ({value, name, id}) => {

        // When Multiple Inputs:
        if ( id !== undefined){
            this.setState({
                inputWrongAnswers: this.state.inputWrongAnswers.map( (answer, index) => answer.id === id ?
                    {
                        ...answer,
                        text: value
                    }
                    :
                    answer
                )
            })
        // When Single Input:
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    selectDeck(title, id){
        this.setModalVisible(false)
        this.setState({
            inputDeck: title,
            deckID: id
        })
    }

    onDeleteWrongAnswer( id ){
        this.setState({
            inputWrongAnswers: this.state.inputWrongAnswers.filter( (answer, index) => answer.id !== id)
        })

    }
    onAddWrongAnswer = () => {
        const newEmptyInput = {
            id: Math.floor(Math.random() *  90000),
            text: '',
            isFocused: true
        }
        this.setState({
            inputWrongAnswers: [
                ...this.state.inputWrongAnswers,
                newEmptyInput
            ]
        })
    }

    onSubmitCard = async () => {
        const { inputDeck, inputQuestion, inputCorrectAnswer, inputWrongAnswers } = this.state

        const newCard = {
            question: inputQuestion,
            answers: {
                right: inputCorrectAnswer,
                wrong: inputWrongAnswers.map( answer => answer.text )
            }

        }
        // console.log( "deckID: ", deckID)
        // console.log( "inputCorrectAnswer: ", inputCorrectAnswer)
        // console.log( "inputWrongAnswers: ", inputWrongAnswers.map( answer => answer.text ))
        //console.log( "Card Updates: ", newCard)
        addCardToDeck(inputDeck, newCard)
    }

    render(){

        const { inputDeck } = this.state
        return(
            <View style={{flex: 1}}>


                <ScrollView>
                    <Container>
                        <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled keyboardVerticalOffset={30}>

                            <Field
                                isSelect
                                isFirstField
                                label="Deck"
                            >
                                <Select onPress={() => { this.setModalVisible(true) }}>
                                 {inputDeck ? inputDeck : 'Select a deck '}
                                </Select>
                            </Field>

                            {/* { Select MODAL } */}

                            <ModalSelectDecks
                                isModalVisible={this.state.modalVisible}
                                onSelectDeck={(title, id) => this.selectDeck(title, id)}
                                onSetModalVisible={(toggle) => this.setModalVisible(toggle)}
                            />

                            <Field
                                name='inputQuestion'
                                label="Question"
                                placeholder="What is JavaScript?"
                                value={this.state.inputQuestion}
                                onInputChange={(inputData) => this.updateInput(inputData)}
                            >
                            </Field>

                            <Field
                                name='inputCorrectAnswer'
                                label="Correct Answer"
                                placeholder="A computer programming language"
                                value={this.state.inputCorrectAnswer}
                                onInputChange={(inputData) => this.updateInput(inputData)}
                            >
                            </Field>

                            <Field
                                name="inputWrongAnswers"
                                isLastField
                                label="Wrong Answers"
                                isMultiple
                                inputs={this.state.inputWrongAnswers ? this.state.inputWrongAnswers : null}
                                onInputChange={(inputData) => this.updateInput(inputData)}
                                onDeleteWrongAnswer={(id) => this.onDeleteWrongAnswer(id)}
                                onAddWrongAnswer={this.onAddWrongAnswer}
                                >

                            </Field>

                        </KeyboardAvoidingView>
                    </Container>
                </ScrollView>

                <SubmitButton onPress={this.onSubmitCard}>
                    <Text style={{color: 'white', fontSize: 20}}>Add Card</Text>
                </SubmitButton>

            </View>
        )

    }
}
