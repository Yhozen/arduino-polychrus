import React, { Component } from 'react'
import { Platform, StyleSheet, Text, ImageBackground, View, Button, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

const preguntas = [{
        texto: 'Oviparo o viviparo?',
        correcta: 'Oviparo',
        incorrecta: 'Viviparo'
    },{
        texto: 'Que significa polychrus?',
        correcta: 'Muchos colores',
        incorrecta: 'Lindos colores'
    },{
        texto: 'Cuantos huevos pone en promedio?',
        correcta: '9',
        incorrecta: '5'
    },{
        texto: 'Que tan largo puede llegar a medir?',
        correcta: '17 cm',
        incorrecta: '30 cm'
    },{
        texto: 'Principales depredadores?',
        correcta: 'El hombre',
        incorrecta: 'El cocodrilo'
    }
]


export default class Pregunta extends Component<{}> {  
_renderButton = (text, fn, correcta) => (
    <TouchableOpacity onPress={() => fn(correcta)}>
        <View style={{
            backgroundColor: 'lightblue',
            padding: 12,
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <Text>{text}</Text>
        </View>
    </TouchableOpacity>
    )
  render() {
     let { isModalVisible, fn } = this.props
     let i = Math.floor(Math.random() * preguntas.length)
     let orden = Math.random() > 0.5
    return (
        <Modal isVisible={isModalVisible}>
            <View style={{
                backgroundColor: 'white',
                padding: 22,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: 'rgba(0, 0, 0, 0.1)',
            }}>
                <Text>{preguntas[i].texto}</Text>
                {orden ? this._renderButton(preguntas[i].correcta, fn, true) : this._renderButton(preguntas[i].incorrecta, fn, false)}
                {!orden ? this._renderButton(preguntas[i].correcta, fn, true) : this._renderButton(preguntas[i].incorrecta, fn, false)}
            </View>
        </Modal>
    )
  }
}

