import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text,TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase';

export default class LoadingScreen extends Component { 

    componentDidMount(){
      this.checkIfLoggedIn();
    }
  
    checkIfLoggedIn = () => {
  
      firebase.auth().onAuthStateChanged(user =>
      {
        if(user)
        {
          this.props.navigation.navigate('Selling');
        }
        else{
          this.props.navigation.navigate('LoginScreen');
        }
      })
    }
    
  
    render()
    {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  }