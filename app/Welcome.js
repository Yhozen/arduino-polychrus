import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  ImageBackground,
  View, Button, TouchableOpacity
} from 'react-native'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class Welcome extends Component<{}> {
  render() {
    let { start } = this.props
    const resizeMode = 'view'
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
  <TouchableOpacity
    activeOpacity={0.9}
    delayPressOut={50}
    onPressOut={()=> start()}>
    <Text style={styles.ButtonText}>
      Iniciar
    </Text>
 </TouchableOpacity>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  ButtonText: {
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
  },
  MainText: {
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
