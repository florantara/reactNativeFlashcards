import React from 'react'
import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'

// Views:
import HomeScreen from '../views/HomeScreen'
import DecksScreen from '../views/DecksScreen'
import SingleDeck from '../views/SingleDeck'
import CreateCard from '../views/CreateCard'

//Icons
import { Home, Stack } from '../utils/icons'


export const DecksStack = StackNavigator(
    {
        Decks: {
            screen: DecksScreen,
            navigationOptions: {
                header: null
            }
        },
        SingleDeck: {
            screen: SingleDeck
        },
    },
    {
        navigationOptions: {
        gesturesEnabled: false,
    },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 200,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            }
        }),
    }
)

// TabBar
// Not all screens have it, so it gets added into a StackNavigator
const TabBar = TabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Decks: {
            screen: DecksStack
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = <Home focused={focused ? true : null}/>;
                } else if (routeName === 'Decks') {
                    iconName = <Stack focused={focused ? true : null}/>;
                }
                return iconName;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        lazy: true,
    }
)

export default RootNav = StackNavigator(
    {
        Home: {
            screen: TabBar,
            navigationOptions: {
                header: null
            }
        },
        Create: {
            screen: CreateCard,
        },

    },
    {
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 200,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            }
        }),
    }
)

