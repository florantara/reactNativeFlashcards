import React from 'react'
import styled from 'styled-components/native'
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import { pink, gray } from '../utils/colors'

const FieldWrap = styled.View`
    margin-bottom: ${props => props.isLastField ? '0' : '40px'};
    padding-bottom: 5px;
    padding-top: ${props => props.isFirstField ? '40px' : '0'};
    border-color: ${gray};
    border-bottom-width: 1px;
    border-left-width: 0;
    border-top-width: 0;
    border-right-width: 0;
`
const Label = styled.Text`
    color: ${pink};
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
`

const Input = styled.TextInput`
    height: 45px;
    font-size: 15px;
`

const InputIconWrap = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const SquareIcon = styled.TouchableOpacity`
    height: 40px;
    max-width: 40px;
    flex: 30px;
    background-color: white
`

const SquareIconText = styled.Text`
font-size: 20px;
    margin: auto;
`


const Field = ({label, placeholder, isFirstField, isLastField, value, name, onInputChange, isSelect, children, isMultiple, inputs, onDeleteWrongAnswer, onAddWrongAnswer }) => {

    const onValueChange = ( value, id ) => {

        let inputData

        if (  id ) {
            inputData = {
                value,
                name,
                id
            }
        } else {
            inputData = {
                value,
                name
            }
        }
        //console.log(inputData)
        onInputChange(inputData)
    }

    const onDeletePressed = (id) => {
        onDeleteWrongAnswer(id)
    }

    const onAddWrongAnswerPressed = () => {
        onAddWrongAnswer()
    }
    return(

        <FieldWrap isFirstField={isFirstField ? true : null} isLastField={isLastField ? true : null}>
            <Label>{label.toUpperCase()}</Label>
            { isSelect ?
                children
                :
                <Input
                    multiline={true}
                    placeholder={placeholder}
                    onChangeText={(value) => onValueChange(value)}
                    value={value}
                    onSubmitEditing={Keyboard.dismiss}
                  />
            }

            { isMultiple &&

                [ ( inputs &&
                    inputs.map( (item, index) => (
                        <InputIconWrap key={index}>
                              <Input
                                  multiline={true}
                                  onChangeText={(value) => onValueChange(value, item.id)}
                                  value={item.text}
                                  style={{flex: 5}}
                                  onSubmitEditing={Keyboard.dismiss}
                                  autoFocus={item.isFocused}
                                />
                             <SquareIcon onPress={() => onDeletePressed(item.id)}><SquareIconText>-</SquareIconText></SquareIcon>
                          </InputIconWrap>
                    ))
                ),

                    <TouchableOpacity
                        key="add"
                        style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, paddingRight: 5}}
                        onPress={onAddWrongAnswerPressed}
                    >
                        <Text style={{fontWeight: 'bold'}}>ADD</Text>
                    </TouchableOpacity>
                ]
            }

        </FieldWrap>
    )
}

export default Field