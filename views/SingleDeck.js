import React from 'react'

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

const Title = styled.Text`
    font-size: 25px;
    margin-bottom: 20px;
`
const Box = styled.View`
    width: 100%;
    padding: 30px;
    border-radius: 5px;
    margin-top: 40px;
    background: white;
    align-items: center;
`

const SingleDeck = (props) => {
    return(
        <Layout top>
            <Box>
                <Title>{props.navigation.state.params.title}</Title>
                <Text>
                    {props.navigation.state.params.cards.length === 0 ?
                    'No cards yet. Add the first one!'
                    :
                    `Contains ${props.navigation.state.params.cards.length} card${props.navigation.state.params.cards.length > 1 ? 's' : ''}`
                    }

                </Text>
            </Box>

            <TouchableOpacity onPress={() => props.navigation.navigate('Create', props.navigation.state.params.title)}>
                <View style={styles.button}>
                    <Add style={styles.buttonIcon}/>
                    <Text style={styles.buttonText}>
                        Add Card
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={[styles.button,{marginTop: 0}]}>
                <Play style={styles.buttonIcon}/>
                <Text style={styles.buttonText}>Start Quiz</Text>
            </View>
        </Layout>
    )
}

export default SingleDeck

SingleDeck.navigationOptions = ({navigation}) => {
        return {
            headerTitle: `${navigation.state.params.title} Deck`
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