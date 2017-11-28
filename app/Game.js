import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Button, Text, Header, Title, Content, Body, Right, Left } from 'native-base';
import BTSerial from 'react-native-android-btserial'

const address = '98:D3:32:70:A5:C1'

export default class Game extends Component<{}> {
  state  = { devices: [], connected: false }
  componentDidMount() {
    BTSerial.enableBT(function(err, enabled) {
      // enabled is true/false
    })
    BTSerial.disconnect()
    this.connect()
    
  }
  connect() {
    let _this = this
    BTSerial.connect(address, function(err, status, deviceName){
      if (status) {
        _this.setState({connected: true})
      }
    })
  }
  write(char) {
    BTSerial.write(char, null, function(err) {
      console.log(err)
    });
  }
  render() {
    let { devices, connected } =this.state
    return (
      <Container>
          <Header style={{backgroundColor:'#2ecc71'}}>
            <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        {connected ? <Text>conectado</Text>: <Text>No conectado</Text>}
        <Button danger onPress={() => this.write('r')}><Text>r</Text></Button> 
        <Button success onPress={() => this.write('g')}><Text>g</Text></Button> 
        <Button info onPress={() => this.write('b')}><Text>b</Text></Button> 
        </Content>
      </Container>
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
