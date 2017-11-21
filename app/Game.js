import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Button, Text } from 'native-base';
var BTSerial = require('react-native-android-btserial');

export default class Game extends Component<{}> {
  state  = { devices: [], connected: false }
  componentDidMount() {
    BTSerial.enableBT(function(err, enabled) {
      // enabled is true/false
    })
    BTSerial.disconnect()
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
    let _this = this
    BTSerial.connect(address, function(err, status, deviceName){
      if (status) {
        _this.setState({connected: true})
      }
    })
  }
  prenderLed() {
    BTSerial.write('a', null, function(err) {
      console.log(err)
    });
  }
  render() {
    let { devices, connected } =this.state
    return (
      <View style={styles.container}>
        <Container>
          <Button onPress={this.search.bind(this)} large rounded info>
          <Text>
            Iniciar
          </Text>
       </Button>
       </Container>
      {devices.map( (device,i) => {
        return (
          <Button key={i} onPress={this.connect.bind(this,device.address)}>
            <Text>
            {device.name}
            </Text>
          </Button>
        )
      })}
      {connected ? <Button onPress={() => this.prenderLed()}><Text>No conectado</Text></Button> : <Text>No conectado</Text>}
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
