import React from 'react'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'

// Views:
import HomeScreen from '../views/HomeScreen'
import DecksScreen from '../views/DecksScreen'
import CreateCard from '../views/CreateCard'

//Icons
import { Home, Stack } from '../utils/icons'

const TabBar = TabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Decks: {
            screen: DecksScreen
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
        lazy: false,
        //initialRouteName: 'Decks'
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
        }

    },
    {
        //headerMode: 'none',
        //mode: 'modal',
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

