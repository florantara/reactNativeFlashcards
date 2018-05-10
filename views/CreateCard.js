import React, { Component } from 'react'

//React Native
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native'

// Extras
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'
import { pink, green, gray, lightgray, lightgreen } from '../utils/colors'

// Components
import Field from '../components/Field'
import ModalSelectDecks from '../components/ModalSelectDecks'

// Store
import { connect } from 'react-redux'
import * as actions from '../actions/Decks'


// Styled Comopnents
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


class CreateCard extends Component {
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
        inputQuestion: '',
        inputCorrectAnswer: '',
        inputWrongAnswers: [],
        modalVisible: false,
        addingToExistingDeck: false
    }

    componentWillMount(){
        this.props.getDecks()
    }

    componentWillReceiveProps(nextProps){
        // If coming from the SingleDeck screen, the title will be passed down:

        if (nextProps.navigation.state.params){
            this.setState({
                inputDeck: nextProps.navigation.state.params,
                addingToExistingDeck: true
            })
        }
    }

    setModalVisible(visible) {
        // If coming from a Single Deck screen, you can't change the Deck.
        if ( ! this.state.addingToExistingDeck ) {
            this.setState({
                modalVisible: visible
            })
        }
    }

    onInputChange = ({value, name, id}) => {
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
            inputDeck: title
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

    onHandleSubmit = () => {
        const { inputDeck, inputQuestion, inputCorrectAnswer, inputWrongAnswers } = this.state

        if ( inputDeck === '' || inputQuestion === '' || inputCorrectAnswer === '' || inputWrongAnswers.length === 0) {
            Alert.alert(
                'Please complete all the fields'
            )
        } else {
            this.onSubmitCard()
        }
    }

    onSubmitCard = () => {
        const { inputDeck, inputQuestion, inputCorrectAnswer, inputWrongAnswers } = this.state
        const { addCard } = this.props

        const newCard = {
            question: inputQuestion,
            answers: {
                right: inputCorrectAnswer,
                wrong: inputWrongAnswers.map( answer => answer.text )
            }

        }

        addCard(inputDeck, newCard)
        Alert.alert(
            'Your card was added',
            '',
            [
                {text: 'OK', onPress: () => this.props.navigation.goBack()},
            ],
        )

    }

    render(){
        const { inputDeck } = this.state
        const { decks } = this.props
        //console.log(this.props.decks)
        return(
            <View style={{flex: 1}}>


                <ScrollView>
                    <Container>
                        <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled keyboardVerticalOffset={30}>

                            <Field
                                isSelect
                                isFirstField
                                label={this.state.addingToExistingDeck ? 'Adding to Deck' : 'Deck'}
                            >
                                <Select onPress={() => { this.setModalVisible(true) }}>
                                 {inputDeck ? inputDeck : 'Select a deck '}
                                </Select>
                            </Field>

                            {/* { Select MODAL } */}

                            <ModalSelectDecks
                                data={decks}
                                isModalVisible={this.state.modalVisible}
                                onSelectDeck={(title, id) => this.selectDeck(title, id)}
                                onSetModalVisible={(toggle) => this.setModalVisible(toggle)}
                            />

                            <Field
                                name='inputQuestion'
                                label="Question"
                                placeholder="What is JavaScript?"
                                value={this.state.inputQuestion}
                                onInputChange={(inputData) => this.onInputChange(inputData)}
                            >
                            </Field>

                            <Field
                                name='inputCorrectAnswer'
                                label="Correct Answer"
                                placeholder="A computer programming language"
                                value={this.state.inputCorrectAnswer}
                                onInputChange={(inputData) => this.onInputChange(inputData)}
                            >
                            </Field>

                            <Field
                                name="inputWrongAnswers"
                                isLastField
                                label="Wrong Answers"
                                isMultiple
                                inputs={this.state.inputWrongAnswers ? this.state.inputWrongAnswers : null}
                                onInputChange={(inputData) => this.onInputChange(inputData)}
                                onDeleteWrongAnswer={(id) => this.onDeleteWrongAnswer(id)}
                                onAddWrongAnswer={this.onAddWrongAnswer}
                                >

                            </Field>

                        </KeyboardAvoidingView>
                    </Container>
                </ScrollView>

                <SubmitButton onPress={this.onHandleSubmit}>
                    <Text style={{color: 'white', fontSize: 20}}>Add Card</Text>
                </SubmitButton>

            </View>
        )

    }
}

const mapStateToProps = state => ({
    decks: state
})

export default connect(mapStateToProps, actions)(CreateCard)
