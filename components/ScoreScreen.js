import React from 'react'

// React Native
import {
    View,
    Text,
    Image
} from 'react-native'

// Extras
import styled from 'styled-components/native'
import { blue } from '../utils/colors'

const Box = styled.View`
    width: 100%;
    background: white;
    border-radius: 5px;
    flex: 1;
    justify-content: center;
    align-items: center;
    maxHeight: 450px;
`
const Score = styled.Text`
    font-size: 60px;
    margin-top: 40px;
    margin-bottom: 40px;
`
const ScoreScreen = ({scores}) => {

    const accerted = scores.filter( score => score === 1)
    const score = (accerted.length / scores.length) * 100

    getEmoticon = () => {
        if ( score < 7 ){
            return (
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../img/confused.png')}
                />
            )
        }
        if ( score >= 7 ){
            return (
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../img/smile.png')}
                />
            )
        }
        if ( score === 10 ){
            return (
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../img/happy.png')}
                />
            )
        }

    }
    return(
        <Box>
            <Text style={{marginBottom: 40}}>Your Score</Text>

            {getEmoticon()}

            <Score>{score}%</Score>

            <Text>You got <Text style={{fontWeight: 'bold'}}>{accerted.length}</Text> questions out of <Text style={{fontWeight: 'bold'}}>{scores.length}</Text></Text>

        </Box>
    )
}

export default ScoreScreen