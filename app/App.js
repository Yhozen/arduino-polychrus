import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  ImageBackground,
  View, Button, TouchableOpacity
} from 'react-native'
import Game from './Game'
import Welcome from './Welcome'
export default class App extends Component<{}> {
  state  = { inicio: false }

  start() {
    this.setState({inicio:true})
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.inicio ? <Game/> : <Welcome start={this.start.bind(this)} /> }
      </View>
    )
  }
}
