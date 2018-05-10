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

const Box = Animated.createAnimatedComponent(styled.View`
    width: 100%;
    background: white;
    border-radius: 5px;
    backface-visibility: hidden;
    flex: 1;
`)
const Title = styled.View`
    height: 100px;
    background-color: #222;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`
const Question = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #F9F9F9
`
const Answer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
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
    }
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
    render(){
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
        return(
            <View style={{flex: 1,width: '100%', maxHeight: '90%'}}>
                <Title>
                    <Text style={{color: 'white', fontSize: 20, marginBottom: 10}}>Javascript</Text>
                    <Text style={{color: 'white'}}>1 of 5</Text>
                </Title>
                <View style={{flex: 1}}>
                    <Box style={frontAnimatedStyle}>

                        <Question>
                            <Text>Is JavaScript case Sensitive?</Text>
                        </Question>

                    </Box>
                    <Box style={[backAnimatedStyle, {position: 'absolute', top: 0, height: '100%'}]}>
                        <Answer>
                            <Text>Nope</Text>
                        </Answer>

                        <ActionsBar>
                            <ActionButton action="incorrect">
                                <ActionButtonText>INCORRECT</ActionButtonText>
                            </ActionButton>
                            <ActionButton action="correct">
                                <ActionButtonText>CORRECT</ActionButtonText>
                            </ActionButton>
                        </ActionsBar>
                    </Box>
                </View>
                    <FlipButton onPress={this.flipCard}>
                        <Text style={{color: 'white'}}>
                            { this.state.viewingSide === 'back'?
                                'Show Question'
                            :
                                'Show answer'
                            }
                        </Text>
                    </FlipButton>
            </View>
        )
    }
}

export default Card