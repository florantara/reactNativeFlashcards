import React, { Component } from 'react'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

// Navigation
import RootNav from './components/RootNav'

export default class App extends Component {
    render() {
        return <RootNav/>
    }
}