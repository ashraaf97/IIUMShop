import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text,TextInput, StyleSheet, Image , TouchableOpacity,ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase';

export default class SignupScreen extends Component {
    state = { email: '', password: '', errorMessage: null }
    
    handleSignup = () => {
      // TODO: Firebase stuff...
    const { email, password,errorMessage } = this.state;
    console.log(email)
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      alert("Account created")
      console.log('handleSignup')
    }
    render() {
    const { navigation } = this.props
      return (
        <ScrollView>
        <View style={styles.container}>
          <Image style={styles.tinyLogo} source={{uri:('https://i.imgur.com/uRhjgad.jpg')}}/>
          <Text style={styles.greeting}>{"Hello! \n Sign up to start"}</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}

            <View style={styles.form}>
              <View style={styles.form}>
                <Text style={styles.inputTitle}>Email Address</Text> 
                <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}>
                </TextInput>
              </View>

              <View style={styles.form}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  secureTextEntry
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholder="Password"
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}>
                </TextInput>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{ color: "#414959", fontSize: 13 }}>
                Have an account?{" "}
              <Text style={{ fontWeight: "500", color: "darkturquoise" }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
      )
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    textInput: {
      borderBottomColor: "#8A8F9E",
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      color: "#161F3D",
    },
    tinyLogo: {
      marginTop: 50,
      //marginBottom: 40,
      marginHorizontal: 20,
      height: 120,
      width: 350,
      //resizeMode: "contain",
    },
    greeting: {
      //marginTop: 20,
      //marginBottom: 40,
      fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    },
    form: {
    marginBottom: 40,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center"
    },
    inputTitle: {
    color: "#8A8F9E",
    fontSize: 14,
    textTransform: "uppercase",
    },
    button: {
    marginHorizontal: 30,
    backgroundColor: "darkturquoise",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    }
  })