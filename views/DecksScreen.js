import React, { Component } from 'react'
import {
    AsyncStorage,
    StyleSheet,
} from 'react-native';

import Layout from '../components/Layout'
import Deck from '../components/Deck'

import {
    DATA_STORAGE_KEY,
    setInitialData,
    getDecks
} from '../utils/data'

class DecksScreen extends Component{
    state ={
        decks: []
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
    render(){

        const { decks } = this.state
        //console.log({decks})
        return(
            <Layout>
                { decks && decks.map( deck => (

                    <Deck
                        key={deck.id}
                        color={deck.color}
                        title={deck.title}
                        cards={deck.cards} />)
                )
            }
            </Layout>
        )
    }

}

export default DecksScreen