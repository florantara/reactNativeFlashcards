import React, { Component } from 'react'

// React Native
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

// Components
import Layout from '../components/Layout'
import Deck from '../components/Deck'
import Field from '../components/Field'

// Store
import { connect } from 'react-redux'
import * as actions from '../actions/Decks'


class DecksScreen extends Component{

    state ={
        creatingDeck: false,
        newDeckTitle: ''
    }

    componentWillMount(){
        this.props.getDecks()
    }

    // When the "Create Deck" button is clicked, enable Deck creation:
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

    // If there's a Deck to save, prepare object to send to api, and trigger it:
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

    // When the input value changes:
    onInputChange = ({value, name}) => {
        this.setState({
            [name]: value
        })
    }

    // Handle navigation to a particular deck (onPress)
    onRequestDeck = (deck) =>{
        const newRouteParams = {
            routeName: 'SingleDeck',
            params: {
                title: deck.title,
                isSingleDeck: true,
                color: deck.color
            }
        }
        this.props.navigation.navigate(newRouteParams)
    }

    render(){
        const { decks } = this.props
        const { creatingDeck } = this.state
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="height" enabled keyboardVerticalOffset={0}>
            <ScrollView contentContainerStyle={{justifyContent: 'center', height: '100%', width: '100%'}}>
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
                                isSingleLine
                            />
                        }
                        <TouchableOpacity onPress={this.handleCreateDeck}>


                            <Text style={{fontSize: 17}}>
                                {creatingDeck ? 'DONE' : 'Create Deck'}
                            </Text>

                        </TouchableOpacity>
                    </Layout>
            </ScrollView>
        </KeyboardAvoidingView>
        )
    }

}


const mapStateToProps = state => ({
    decks: state.decks
})

export default connect(mapStateToProps, actions)(DecksScreen)