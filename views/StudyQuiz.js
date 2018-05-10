import React, { Component } from 'react'

// React Native
import {
    View,
    Text
} from 'react-native'

//Components
import Card from '../components/Card'
import Layout from '../components/Layout'

// Extras
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { blue } from '../utils/colors'


class StudyQuiz extends Component{
    static navigationOptions ={
        title: "Study Quiz",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: blue,
            paddingBottom: 20,
            paddingTop: getStatusBarHeight() + 20,
            height: 80
        }
    }

    render(){
        return(
            <Layout>
                <Card/>
            </Layout>
        )
    }
}

export default StudyQuiz