import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Modal,
    TouchableOpacity,
    Animated,
    Easing,
    ScrollView,
    KeyboardAvoidingView


} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { pink, green, gray, lightgray, lightgreen } from '../utils/colors'
import styled from 'styled-components/native'

import Field from '../components/Field'

const allDecks = [
    {
        title: 'JavaScript',
        key: 1
    },
    {
        title: 'HTML',
        key: 2
    },
    {
        title: 'CSS',
        key: 3
    },
    {
        title: 'ReactJS',
        key: 4
    },
    {
        title: 'WordPress',
        key: 5
    },
    {
        title: 'PHP',
        key: 6
    }
]

const Container = styled.View`
    padding: 0 40px 40px;
`

const Select = styled.Text`
    height: 45px;
    width: 100%;
    font-size: 17px;
    padding-top: 15px
`

const SubmitButton = styled.TouchableOpacity`
    background-color: ${lightgreen};
    align-items: center;
    padding: 30px 0;
    height: 80px;
    width: 100%;
`

const ModalContainer = Animated.createAnimatedComponent(styled.View`
    background-color: white;
    border-radius: 10px;
    width: 100%;
    margin-top: 100px;
    position: absolute;
    top: 0px;
    height: 100%;
    shadow-color: black;
    shadow-opacity: 0.4;
    shadow-radius: 20px;
`)

const ModalListItem = styled.TouchableOpacity`
    border-color: ${lightgray};
    border-bottom-width: 1px;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    margin: 0 30px;
`
const ModalListItemText = styled.Text`
    font-size: 23px;
    flex: 1;
    padding-top: 30px;
    padding-bottom: 30px;
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
        inputWrongAnswers: [
                            "12am",
                            "4 de la tarde",
                            "Tercera"
                        ],
        modalVisible: false,
    }

    animatedValue = new Animated.Value(0)

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        },
            // Callback: Slide the ModalContent after the modalVisible toggle:
            this.onModalToggle()
        )
    }

    onModalToggle(){
        Animated.timing(
            this.animatedValue,
            {
                toValue: this.state.modalVisible ? 0 : 1,
                duration: 150,
                easing: Easing.easeOutQuint,
                useNativeDriver: true
            }
        ).start()
    }

    updateInput = ({value, name, index}) => {

        //console.log("updateInput index: ---------------------------", index)
        // Multiple Inputs:
        if ( index !== undefined){

            let answers = [...this.state.inputWrongAnswers];
            answers[index] = value
            this.setState({
                inputWrongAnswers: answers
            });


        // Single Input:
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    selectDeck(title){
        this.setModalVisible(false)
        this.setState({
            inputDeck: title
        })
    }

    onUpdateWrongAnswers( index, value ){
        let answers = [...this.state.inputWrongAnswers];
        answers[index] = value
        this.setState({
            inputWrongAnswers: answers
        });
    }
    onDeleteWrongAnswer( index ){
        let answers = this.state.inputWrongAnswers;
        answers.splice( index, 1 );
        this.setState({
            answers
        })

    }
    onAddWrongAnswer = () => {
        //console.log("onAddWrongAnswerPressed")
        let answers = this.state.inputWrongAnswers
        let newEmptyInput = ''
        this.setState({
            inputWrongAnswers: [
                ...answers,
                newEmptyInput
            ]
        })
    }

    render(){
        //console.log(this.state.inputWrongAnswers)
        const styles = StyleSheet.create({
            slideUpDown: {
                transform: [
                    {
                        translateY: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [500, 0]
                        })
                    }
                ]
            }
        })

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
                                 {inputDeck ? inputDeck : 'Select a deck'}
                                </Select>
                            </Field>

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
                                onDeleteWrongAnswer={(index) => this.onDeleteWrongAnswer(index)}
                                onAddWrongAnswer={this.onAddWrongAnswer}
                                >

                            </Field>


                            {/* { Select MODAL } */}

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    alert('Android Back.');
                                }}
                                >
                                <View style={{"flex": 1, "backgroundColor": "rgba(0,0,0,0.2)"}}>
                                    <ModalContainer style={styles.slideUpDown}>
                                            <TouchableOpacity
                                                style={{"alignSelf": "flex-end", "marginRight": 20, "paddingTop": 10}}
                                                onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                                <Text style={{"fontSize": 30, "color": gray}}>&times;</Text>
                                            </TouchableOpacity>

                                            <FlatList
                                              data={allDecks}
                                              renderItem={({item}) => (
                                                  <ModalListItem onPress={() => this.selectDeck(item.title)}>
                                                      <ModalListItemText>{item.title}</ModalListItemText>
                                                  </ModalListItem>
                                              )}
                                            />
                                    </ModalContainer>
                                </View>
                            </Modal>

                        </KeyboardAvoidingView>
                    </Container>
                </ScrollView>

                <SubmitButton>
                    <Text style={{color: 'white', fontSize: 20}}>Add Card</Text>
                </SubmitButton>

            </View>
        )

    }
}


export default CreateCard