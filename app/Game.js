import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Button, Text, Header, Title, Content, Body, Right, Left, H3 } from 'native-base'
import BTSerial from 'react-native-android-btserial'
import Pregunta from './Pregunta'

const address = '98:D3:32:70:A5:C1'

export default class Game extends Component<{}> {
  state  = { devices: [], connected: false, isModalVisible: false, count: 0 }

  _showModal = () => this.setState({ isModalVisible: true })
  
  _hideModal = () => this.setState({ isModalVisible: false })

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
    this.setState({ count: this.state.count+1})
    if ( this.state.count == 2) {
      this._showModal()
    }
  }
  respuesta(correcta) {
    this._hideModal()
    if (correcta) {
      this.setState({count: 0})
    } else {
      this._showModal()
    }
  }
  render() {
    let { devices, connected } = this.state
    return (
      <Container>
          <Header style={{backgroundColor:'#2ecc71'}}>
            <Left/>
          <Body>
            <Title>Polychrus</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
          <H3 style={styles.ButtonText}>Ayuda al falso camaleon a escapar de sus depredadores</H3>
          <Text style={styles.ButtonText}>camuflalo escogiendo el color indicado</Text>
        <Button block style={styles.ButtonText} danger onPress={this.write.bind(this,'r')}><Text>rojo</Text></Button> 
        <Button block style={styles.ButtonText} success onPress={this.write.bind(this, 'g')}><Text>verde</Text></Button> 
        <Button block style={styles.ButtonText} info onPress={this.write.bind(this, 'b')}><Text>azul</Text></Button> 
        {/* { (this.state.count == 5)? {_showModal()} : <Text>H</Text> } */}
        <Pregunta isModalVisible={this.state.isModalVisible} fn={this.respuesta.bind(this)} />
        {connected ? <Text style={ {color: 'rgba(70,100,255, 0.8)'} }>conectado</Text>: <Text style={ {color: 'rgba(255,0,0, 0.6)'} }>No conectado</Text>}
          </View>
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
    margin: 7,
  },
  ButtonText: {
    marginBottom: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})
