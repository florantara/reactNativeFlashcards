import React, { Component } from 'react'

// React Native
import {
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native'

// Extras
import styled from 'styled-components/native'
import { blue } from '../utils/colors'

// Styled Components
const Box = Animated.createAnimatedComponent(styled.View`
    width: 100%;
    background: white;
    border-radius: 5px;
    backface-visibility: hidden;
    flex: 1;
`)
const Title = Animated.createAnimatedComponent(styled.View`
    height: 90px;
    background-color: #222;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`)
const ActionsBar = styled.View`
    width: 100%;
    height: 45px;
    flex-direction: row;
`
const ActionButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.action === 'incorrect' ? '#EC4A4A' : '#25B962'};
    border-bottom-left-radius: ${(props) => props.action === 'incorrect' ? '5px' : '0px'};
    border-bottom-right-radius: ${(props) => props.action === 'correct' ? '5px' : '0px'}
`
const ActionButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 11px;
`
const FlipButton = styled.TouchableOpacity`
    height: 45px;
    background: #222;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
`

class Card extends Component{

    state = {
        viewingSide: 'front'
    }

    componentWillMount(){
        this.animatedValue = new Animated.Value(0)
        this.animatedFadeValue = new Animated.Value(0)
        this.value = 0;
        this.animatedValue.addListener( ({value}) => {
            this.value = value
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.colorInterpolate = this.animatedFadeValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgb(0,0,0)', 'rgb(112, 196, 214)']
        })

    }

    componentWillReceiveProps = (nextProps, prevState) =>{
        if ( this.props.cardNumber ){
            this.flipCard()
            this.animateColor()
        }
    }

    //
    // Animations
    //

    // Flip Card
    flipCard = () =>{
        if ( this.value > 90 ){
            this.setState({
                viewingSide: 'front'
            })
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 5,
                tension: 12
            }).start()
        } else {
            this.setState({
                viewingSide: 'back'
            })
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 5,
                tension: 12
            }).start()
        }
    }
    // Transition Color to Highlight Title
    animateColor() {
        Animated.sequence([
            Animated.timing(this.animatedFadeValue, {
                toValue: 150,
                duration: 350,
                delay: 100
            }),
            Animated.timing(this.animatedFadeValue, {
                toValue: 0,
                duration: 350
            })
        ]).start()
    }

    sendVote = (vote) => {
        this.props.onSubmitVote(vote)
    }
    render(){

        const { question, displayAnswer, cardNumber } = this.props
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        const colorHighlight = {
            backgroundColor: this.colorInterpolate
        }
        return(
            <View style={{flex: 1,width: '100%', maxHeight: 400}}>
                <Title style={colorHighlight}>
                    <Text style={{color: 'white', fontSize: 23}}>{cardNumber} of 5</Text>
                </Title>
                <View style={{flex: 1}}>
                    <Box style={frontAnimatedStyle}>

                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 25, textAlign: 'center', lineHeight: 40, paddingLeft: 20, paddingRight: 20}}>{question}</Text>
                        </View>

                    </Box>
                    <Box style={[backAnimatedStyle, {position: 'absolute', top: 0, height: '100%'}]}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 25, textAlign: 'center', lineHeight: 40, paddingLeft: 20, paddingRight: 20}}>{displayAnswer}</Text>
                        </View>

                        <ActionsBar>
                            <ActionButton action="incorrect" onPress={() => this.sendVote('incorrect')}>
                                <ActionButtonText>INCORRECT</ActionButtonText>
                            </ActionButton>
                            <ActionButton action="correct" onPress={() => this.sendVote('correct')}>
                                <ActionButtonText>CORRECT</ActionButtonText>
                            </ActionButton>
                        </ActionsBar>
                    </Box>
                </View>
                    <FlipButton onPress={this.flipCard}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
                            { this.state.viewingSide === 'back'?
                                '<- QUESTION'
                            :
                                'ANSWER ->'
                            }
                        </Text>
                    </FlipButton>
            </View>
        )
    }
}

export default Card