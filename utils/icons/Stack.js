import React from 'react'
import { Image } from 'react-native'

export default Stack = ({focused}) => {

    const path = focused ? require('./assets/stack_active.png') : require('./assets/stack.png');

    return(
        <Image
          style={{width: 20, height: 20}}
          source={path}
        />
    )
}