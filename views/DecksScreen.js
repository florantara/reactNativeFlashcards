import React, { Component } from 'react'

// React Native
import {
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

// Components
import Layout from '../components/Layout'
import Deck from '../components/Deck'

// Store
import { connect } from 'react-redux'
import * as actions from '../actions/'


class DecksScreen extends Component{

    componentDidMount(){
        this.props.getDecks()
        //AsyncStorage.clear()
    }

    render(){
        const { decks } = this.props
        console.log("this.props.decks, ",decks)
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
            </Layout>
        )
    }

}


const mapStateToProps = state => ({
    decks: state
})

export default connect(mapStateToProps, actions)(DecksScreen)