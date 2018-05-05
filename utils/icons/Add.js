import React from 'react'
import { Image } from 'react-native'

export default Add = () => {
    return(
        <Image
          style={{width: 20, height: 20}}
          source={require('./assets/add.png')}
        />
    )
}