import React from 'react'
import { StackNavigator } from 'react-navigation'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { Add, Play, Stack } from '../utils/icons'
import Layout from '../components/Layout'


const HomeScreen = (props) => {
    return(
        <Layout>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
                    <View style={styles.button}>
                        <Add style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>
                            Create
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.button}>
                    <Play style={styles.buttonIcon}/>
                    <Text style={styles.buttonText}>Study</Text>
                </View>
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