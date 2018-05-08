import React from 'react'
import {
    View,
    Text
} from 'react-native'
import styled from 'styled-components/native'
import { ThemeProvider } from 'styled-components'

const Card = styled.View`
    width: 100%;
    background: ${props => props.theme.color};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 5px
`

const Title = styled.Text`
    color: white;
    padding-left: 15px;
    font-weight: bold;
    font-size: 15px
`
const Counter = styled.View`
    background: white;
    flex-basis: 50px;
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
                <Title>{title.toUpperCase().trim()}</Title>
                <Counter>
                    <Number>
                        {cards ? cards.length : '-'}
                    </Number>
                </Counter>
            </Card>
        </ThemeProvider>
    )
}

export default Deck