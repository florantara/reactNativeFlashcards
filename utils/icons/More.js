import React from 'react'
import { Image } from 'react-native'

export default More = ({focused}) => {

    const path = focused ? require('./assets/more_active.png') : require('./assets/more.png');

    return(

        <Image
          style={{width: 20, height: 20}}
          source={path}
        />
    )
}