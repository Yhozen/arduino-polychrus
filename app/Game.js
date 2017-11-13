import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
var BTSerial = require('react-native-android-btserial');

export default class Game extends Component<{}> {
  state  = { devices: [] }
  componentDidMount() {
    BTSerial.enableBT(function(err, enabled) {
      // enabled is true/false
    });
  }
  search() {
    const self = this
    BTSerial.listDevices(function(err, BTdevices) {
      if (BTdevices) {
        let devices = Object.values(JSON.parse(BTdevices))
        console.log(devices)
        self.setState({devices})
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.9}
            delayPressOut={50}
            onPressOut={this.search.bind(this)}>
            <Text style={styles.ButtonText}>
              Iniciar
            </Text>
        </TouchableOpacity>
      <Text style={styles.welcome}>Bienvenute!</Text>
      {this.state.devices ? this.state.devices.map( (device,i) => {
      return (
        <Text key={i}>{device.name}</Text>
      )
    }) : <Text>hola</Text> }
      </View>
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
  }
})
