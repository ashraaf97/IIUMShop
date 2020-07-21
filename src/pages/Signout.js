import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text,TextInput, StyleSheet,Image , TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Updates } from 'expo';

import firebase from 'firebase';

export default class DashboardScreen extends Component {
    
    handleSignout = () => {
        // TODO: Firebase stuff...
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
          
        console.log('handleSignout')
        Updates.reload();
      }
    render() {
    const { navigation } = this.props
      return (
        <View style={styles.container}>
          <Image style={styles.tinyLogo} source={{uri:('https://i.imgur.com/uRhjgad.jpg')}}/>
          <Image style={styles.tinyLogo2} source={{uri:('https://i.imgur.com/PED0OpR.gif')}}/>
            <Text style={styles.greeting}>Please press button below to sign out</Text>
          <TouchableOpacity style={styles.button} onPress={this.handleSignout}>
              <Text style={{ color: "#FFF", fontSize: 20 }}>Sign out</Text>
            </TouchableOpacity>
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    },
    tinyLogo: {
      marginTop: 50,
      //marginBottom: 40,
      marginHorizontal: 20,
      height: 120,
      width: 350,
      //resizeMode: "contain",
    },
    tinyLogo2: {
      marginTop: 50,
      //marginBottom: 40,
      marginHorizontal: 20,
      height: 100,
      width: 100,
      //resizeMode: "contain",
    },
    button: {
      marginHorizontal: 30,
      backgroundColor: "darkturquoise",
      borderRadius: 4,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      },
      greeting: {
        //marginTop: 20,
        //marginBottom: 40,
        fontSize: 22,
      fontWeight: 'bold',
      textAlign: "center",
      },
  })