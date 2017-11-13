import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Button, Text } from 'native-base';
var BTSerial = require('react-native-android-btserial');

export default class Game extends Component<{}> {
  state  = { devices: [], connected: false }
  componentDidMount() {
    BTSerial.enableBT(function(err, enabled) {
      // enabled is true/false
    });
  }
  search() {
    const _this = this
    BTSerial.listDevices(function(err, BTdevices) {
      if (BTdevices) {
        let devices = Object.values(JSON.parse(BTdevices))
        console.log(devices)
        _this.setState({devices})
      }
    })
  }
  connect(address) {
    BTSerial.connect(address, function(err, status, deviceName){
      if (status) {
        this.setState({connected: true})
      }
    })
  }
  render() {
    let { devices } =this.state
    return (
      <View style={styles.container}>
        <Container>
          <Button onPress={this.search.bind(this)} large rounded info>
          <Text>
            Iniciar
          </Text>
       </Button>
       </Container>
      <Text style={styles.welcome}>Bienvenute!</Text>
      {devices.map( (device,i) => {
        return (
          <Button key={i} onPress={() => this.connect.bind(this,devices[i].address)}>
            <Text>
            {device.name}
            </Text>
          </Button>
        )
      })}
    
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})
