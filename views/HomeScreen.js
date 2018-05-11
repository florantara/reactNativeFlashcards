import React from 'react'

// React Native
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

// Extras
import { Add, Play, Stack } from '../utils/icons'

// Components
import Layout from '../components/Layout'


const HomeScreen = (props) => {
    return(
        <Layout>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
                    <View style={styles.button}>
                        <Add style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>
                            New Card
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('StudyQuiz')}>
                    <View style={[styles.button, {marginBottom: 0}]}>
                        <Play style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>Random Quiz</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#FFF',
        marginBottom: 30,
        borderRadius: 4,
        height: 60,
        paddingRight: 20,
        paddingLeft: 20,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 15
    },
    buttonGroup: {
        width: '100%',
        minHeight: 170,
        justifyContent: 'center',
        alignItems: 'center'
    }
})