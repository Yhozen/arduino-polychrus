import React, { Component } from 'react'
import { Platform, StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native'

import { Button, Text } from 'native-base'

export default class Welcome extends Component<{}> {
  render() {
    let { start } = this.props
    return (
      <ImageBackground
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={require('./images/bg.jpg')}
      >
        <Text style={styles.MainText}>
          Polychrus Marmoratus
        </Text>
        <View style={{margin:7}}>
          <Button onPress={()=>start()} block rounded info>
              <Text>
                Iniciar
              </Text>
          </Button>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }, instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }, ButtonText: {
    backgroundColor: 'aqua',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowRadius: 1,
    textShadowOffset: {width: 0, height: 1},
    fontSize: 14,
    color: 'white',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 3,
    padding: 7
  }, MainText: {
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {width: 0, height: 1},
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    padding: 40,
  }
})
