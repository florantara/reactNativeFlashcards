import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import Layout from '../components/Layout'
import Deck from '../components/Deck'

import {
    DATA_STORAGE_KEY,
    setInitialData,
    getDecks
} from '../utils/api'

class DecksScreen extends Component{
    state = {
        decks: {}
    }

    getData = async () => {
        const decks = await getDecks();

        // If there are Decks saved on AsyncStorage, bring them in.
        if ( decks ) {
            this.setState(() => ({
                decks: JSON.parse(decks)
            }));

        // Otherwise, set some dummy data.
        } else {
            setInitialData()
        }
    }

    componentDidMount(){
        this.getData()
    }

    updateDecks = () => {
        this.getData()
    }
    render(){
        const { decks } = this.state
        return(
            <Layout>
                { decks && Object.values(decks).map( deck => (
                    <Deck
                        key={deck.id}
                        color={deck.color}
                        title={deck.title}
                        cards={deck.cards} />)
                )
                }
                <TouchableOpacity onPress={this.updateDecks}><Text>Update Decks</Text></TouchableOpacity>
            </Layout>
        )
    }

}

export default DecksScreen