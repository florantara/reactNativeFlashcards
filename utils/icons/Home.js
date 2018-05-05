import React from 'react'
import { Image } from 'react-native'

export default Home = ({focused}) => {

    const path = focused ? require('./assets/home_active.png') : require('./assets/home.png');

    return(

        <Image
          style={{width: 20, height: 20}}
          source={path}
        />
    )
}