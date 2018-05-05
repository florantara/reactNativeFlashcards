import React from 'react'
import {
    View,
    Text
} from 'react-native'

const Deck = ({title, question}) => {
    return(
        <View>
            <Text> {title} </Text>
            <Text> {question} </Text>
        </View>
    )
}

export default Decks