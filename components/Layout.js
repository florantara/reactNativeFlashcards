import React from 'react'
import {
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';

const Layout = ({children}) =>{
    return(
        <ImageBackground
            source={{uri: 'https://res.cloudinary.com/techflor/image/upload/v1522123593/deskBg.jpg'}}
            style={{ flex: 1,
                width: null,
                height: null,
            }}
        >
            <View style={styles.container}>

                {children}

            </View>
        </ImageBackground>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
