import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'

// React Native
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native';

// Components
import Layout from '../components/Layout'
import Deck from '../components/Deck'
import Field from '../components/Field'

// Store
import { connect } from 'react-redux'
import * as actions from '../actions/'


class DecksScreen extends Component{

    state ={
        creatingDeck: false,
        newDeckTitle: ''
    }

    componentDidMount(){
        this.props.getDecks()
        //AsyncStorage.clear()
    }

    handleCreateDeck = () => {
        this.setState(
            { creatingDeck: !this.state.creatingDeck },
            () => {
                if ( this.state.creatingDeck === false ){
                    if ( this.state.newDeckTitle !== '') {
                        this.onSaveDeck()
                    }
                }
            }
        )
    }

    onSaveDeck = () => {
        const newDeck = {
            title: this.state.newDeckTitle,
            color: `#${(Math.random()*0xFFFFFF<<0).toString(16)}`,
            id: Math.floor(Math.random() *  10000)
        }
        this.props.addDeck(newDeck)
        this.setState({
            newDeckTitle: ""
        })

    }

    onInputChange = ({value, name}) => {
        this.setState({
            [name]: value
        })
    }

    onRequestDeck = (deck) =>{
        //console.log(deck)
        //console.log("navigate: " , this.props.navigation.navigate("DeckScreen"))
        console.log(this.props.navigation.navigate)
        this.props.navigation.navigate("SingleDeck", deck)
    }

    render(){
        const { decks } = this.props
        const { creatingDeck } = this.state
        return(
            <Layout>
                { decks && Object.values(decks).map( deck => (
                    <Deck
                        key={deck.id}
                        color={deck.color}
                        title={deck.title}
                        cards={deck.cards}
                        onPress={() => this.onRequestDeck(deck)}
                    />)
                )
                }

                {creatingDeck &&
                    <Field
                        name='newDeckTitle'
                        placeholder="What's the topic?"
                        value={this.state.newDeckTitle}
                        onInputChange={(inputData) => this.onInputChange(inputData)}
                        isWide
                        isLastField
                        solidColor
                        autoFocus
                    />
                }
                <TouchableOpacity onPress={this.handleCreateDeck}>


                    <Text style={{fontSize: 17}}>
                        {creatingDeck ? 'DONE' : 'Create Deck'}
                    </Text>

                </TouchableOpacity>
            </Layout>
        )
    }

}


const mapStateToProps = state => ({
    decks: state
})
export default connect(mapStateToProps, actions)(withNavigation(DecksScreen))