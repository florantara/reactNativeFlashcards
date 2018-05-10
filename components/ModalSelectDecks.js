import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native'

// Extras
import styled from 'styled-components/native'
import { lightgray, gray } from '../utils/colors'

// Styled Components
const ModalContainer = Animated.createAnimatedComponent(styled.View`
    background-color: white;
    border-radius: 10px;
    width: 100%;
    margin-top: 100px;
    position: absolute;
    top: 0px;
    height: 100%;
    shadow-color: black;
    shadow-opacity: 0.4;
    shadow-radius: 20px;
`)

const ModalListItem = styled.TouchableOpacity`
    border-color: ${lightgray};
    border-bottom-width: 1px;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    margin: 0 30px;
`
const ModalListItemText = styled.Text`
    font-size: 23px;
    flex: 1;
    padding-top: 30px;
    padding-bottom: 30px;
    color: black;
`

class ModalSelectDecks extends Component{

    state = {
        modalVisible: this.props.isModalVisible
    }

    selectDeck(title, id){
        this.props.onSelectDeck(title, id)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ modalVisible: nextProps.isModalVisible });
    }

    onSetModalVisible(toggle){
        this.props.onSetModalVisible(toggle)
    }

    animatedValue = new Animated.Value(0)

    onModalToggle(){
        Animated.timing(
            this.animatedValue,
            {
                toValue: this.state.modalVisible ? 1: 0,
                duration: 150,
                easing: Easing.easeOutQuint,
                useNativeDriver: true
            }
        ).start()
    }

    render(){
        const items = Object.values(this.props.data.decks)


        if ( this.state.modalVisible ){
            this.onModalToggle()
        }

        const styles = StyleSheet.create({
            slideUpDown: {
                transform: [
                    {
                        translateY: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [500, 0]
                        })
                    }
                ]
            }
        })

        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Android Back.');
                }}
                >
                <View style={{"flex": 1, "backgroundColor": "rgba(0,0,0,0.2)"}}>

                    <ModalContainer style={styles.slideUpDown}>

                            <TouchableOpacity
                                style={{"alignSelf": "flex-end", "marginRight": 20, "paddingTop": 10}}
                                onPress={() => { this.onSetModalVisible(!this.state.modalVisible) }}>
                                <Text style={{"fontSize": 30, "color": gray}}>&times;</Text>
                            </TouchableOpacity>

                            {items &&

                                <FlatList
                                    data={items}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({item}) => (
                                        <ModalListItem onPress={() => this.selectDeck(item.title, item.id)}>
                                            <ModalListItemText>{item.title}</ModalListItemText>
                                        </ModalListItem>
                                    )}
                                />
                            }

                    </ModalContainer>

                </View>
            </Modal>
        )
    }
}

export default ModalSelectDecks