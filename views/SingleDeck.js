import React, { Component } from 'react'

// React Native
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

// Components
import Layout from '../components/Layout'

// Extras
import styled from 'styled-components/native'
import { Add, Play} from '../utils/icons'

// Store
import { connect } from 'react-redux'
import * as actions from '../actions/Decks'

// Styled Components
const Title = styled.Text`
    font-size: 25px;
    margin-bottom: 20px;
`
const Box = styled.View`
    width: 100%;
    padding: 30px;
    border-radius: 5px;
    margin-top: 40px;
    background: #F9F9F9;
    align-items: center;
    border-top-width: 5px;
    border-color: ${(props) => props.color}
`
const CardsCount = styled.View`
    width: 80px;
    height: 28px;
    padding: 5px;
    align-items: center;
    background-color: ${(props) => props.color};
    border-radius: 5px;
`

class SingleDeck extends Component {

    componentWillMount(){
        this.props.getDecks()
    }


    render(){
        const cardsAmount = this.props.deck[0].cards ? this.props.deck[0].cards.length : 0
        const { title, color } = this.props.navigation.state.params
        return(
            <Layout top>
                <Box color={color}>
                    <Title>{title.trim()}</Title>

                    {cardsAmount === 0 ?
                        <Text>No cards yet. Add the first one!</Text>
                        :
                        <CardsCount color={color}>
                            <Text style={{color: 'white'}}>
                                {cardsAmount} card{cardsAmount > 1 ? 's' : ''}
                            </Text>
                        </CardsCount>
                    }
                </Box>


                {/* Go to the CreateCard screen and pass the title of the deck to prepopulate the Deck Dropdown */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Create', title)}>
                    <View style={styles.button}>
                        <Add style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>
                            Add Card
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* If there aren't cards assigned to this deck, there's no Quiz */}
                {cardsAmount > 0 &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('StudyQuiz', title)}>
                        <View style={[styles.button,{marginTop: 0}]}>
                            <Play style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Start Quiz</Text>
                        </View>
                    </TouchableOpacity>
                }
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    deck: Object.values(state.decks).filter( deck => deck.title === ownProps.navigation.state.params.title)
})


export default connect(mapStateToProps, actions)(SingleDeck)


// Define the Header Title for this stack screen
SingleDeck.navigationOptions = ({navigation}) => {
        return {
            headerTitle: `${navigation.state.params.title.trim()} Deck`
        }
    }


const styles = StyleSheet.create({

    button: {
        backgroundColor: '#FFF',
        marginBottom: 30,
        marginTop: 40,
        borderRadius: 4,
        maxHeight: 50,
        paddingRight: 20,
        paddingLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 10
    }
})
