import React from 'react'

// React Native
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

// Extras
import styled from 'styled-components/native'
import { blue } from '../utils/colors'
import { Stack, Play} from '../utils/icons'

const Box = styled.View`
    width: 100%;
    background: white;
    border-radius: 5px;
    flex: 1;
    justify-content: center;
    align-items: center;
    max-height: 500px;
    padding-top: 30px;
    padding-bottom: 30px;
`
const Score = styled.Text`
    font-size: 60px;
    margin-top: 40px;
    margin-bottom: 40px;
`
const ScoreScreen = (props) => {
     const {scores, deckTitle, navigation, isSingleDeck, singleDeckTitle} = props

    const accerted = scores.filter( score => score === 1)
    const score = Math.round((accerted.length / scores.length) * 100)

    getEmoticon = () => {
        if ( score < 70 ){
            return (
                <Image
                    style={{width: 80, height: 80}}
                    source={require('../img/confused.png')}
                />
            )
        }
        if ( score >= 70 && score < 100 ){
            return (
                <Image
                    style={{width: 80, height: 80}}
                    source={require('../img/smile.png')}
                />
            )
        }
        if ( score === 100 ){
            return (
                <Image
                    style={{width: 80, height: 80}}
                    source={require('../img/happy.png')}
                />
            )
        }

    }

    onPlayAgain = () => {
        props.resetQuiz()
    }

    let nextRoute = {
        routeName: 'SingleDeck',
        params: { title: singleDeckTitle }
    }

    return(
        <Box>
            <Text style={{marginBottom: 40}}>Your Score</Text>

            {getEmoticon()}

            <Score>{score}%</Score>

            <Text>You got <Text style={{fontWeight: 'bold'}}>{accerted.length}</Text> questions out of <Text style={{fontWeight: 'bold'}}>{scores.length}</Text></Text>

            { isSingleDeck &&
                <TouchableOpacity onPress={() => navigation.navigate(nextRoute)}>
                    <View style={styles.button}>
                        <Stack style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>Back to Deck</Text>
                    </View>
                </TouchableOpacity>
             }
            <TouchableOpacity onPress={onPlayAgain}>
                <View style={styles.button}>
                    <Play style={styles.buttonIcon}/>
                    <Text style={styles.buttonText}>Play Again</Text>
                </View>
            </TouchableOpacity>

        </Box>
    )
}

export default ScoreScreen


const styles = StyleSheet.create({

    button: {
        borderRadius: 5,
        marginBottom: 0,
        marginTop: 20,
        maxHeight: 40,
        paddingRight: 20,
        paddingLeft: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: blue
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 10
    }
})
