import React from 'react'
import { Image } from 'react-native'

export default BackArrow = () => {
    return(
        <Image
          style={{width: 15, height: 15}}
          source={require('./assets/backArrow_black.png')}
        />
    )
}