import React, { Component } from 'react'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import data from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
    data,
    applyMiddleware(thunk)
)

// Navigation
import RootNav from './components/RootNav'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNav/>
            </Provider>
        )
    }
}