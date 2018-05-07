import React from 'react'
import {
    View,
    Text
} from 'react-native'
import styled from 'styled-components/native'
import { ThemeProvider } from 'styled-components'

const Card = styled.View`
    width: 80%;
    background: ${props => props.theme.color};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40;
    margin-bottom: 20;
    border-radius: 5
`

const Title = styled.Text`
    color: white;
    padding-left: 15;
    font-weight: bold;
    font-size: 15
`
const Counter = styled.View`
    background: white;
    flex-basis: 50;
    align-self: stretch;
`
const Number = styled.Text`
    margin: auto
`
const Deck = ({title, cards, color}) => {
    const deckColor = {
        color
    }
    return(
        <ThemeProvider theme={deckColor}>
            <Card>
                <Title>{title && title.toUpperCase()}</Title>
                <Counter>
                    <Number>
                        {cards.length}
                    </Number>
                </Counter>
            </Card>
        </ThemeProvider>
    )
}

export default Deck