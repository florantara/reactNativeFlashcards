import React from 'react'
import { Image } from 'react-native'

export default Play = () => {
    return(
        <Image
          style={{width: 20, height: 20}}
          source={require('./assets/play.png')}
        />
    )
}