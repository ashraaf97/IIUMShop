import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text,TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../src/pages/LoadingScreen';
import LoginScreen from '../src/pages/LoginScreen';
import SignupScreen from '../src/pages/SignupScreen';
import SelfproductScreen from './pages/SelfproductScreen';
import SubmitScreen from './pages/SubmitScreen';
import Signout from '../src/pages/Signout';
import HomeScreen from '../src/pages/Homescreen';
import AboutScreen from '../src/pages/AboutScreen';
import FoodProductScreen from '../src/pages/FoodProductScreen';
import GadgetProductScreen from '../src/pages/GadgetProductScreen';
import BooksProductScreen from '../src/pages/BooksProductScreen';
import OthersProductScreen from '../src/pages/OthersProductScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Selling(){
  return(
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Tab.Screen name="SubmitScreen" component={SubmitScreen} 
    options={{tabBarLabel: 'Submit',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="arrow-up" color={color} size={size} />
    ),
    }}
    />
    <Tab.Screen name="SelfproductScreen" component={SelfproductScreen} 
    options={{tabBarLabel: 'Delete',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="file" color={color} size={size} />
    ),
    }}
    />
    <Tab.Screen name="AboutScreen" component={AboutScreen}
    options={{tabBarLabel: 'About',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="account" color={color} size={size} />
    ),
    }}
    />
    <Tab.Screen name="Signout" component={Signout} 
    options={{tabBarLabel: 'Signout',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="account-remove" color={color} size={size} />
    ),
    }}
    />
    </Tab.Navigator>
  );
}

function Buying(){
  return(
    <Stack.Navigator initialRouteName="FoodProductScreen" screenOptions={{headerShown: false}}>
    <Stack.Screen  name="FoodProductScreen" component={FoodProductScreen} />
    <Stack.Screen  name="GadgetProductScreen" component={GadgetProductScreen} />
    <Stack.Screen  name="BooksProductScreen" component={BooksProductScreen} />
    <Stack.Screen  name="OthersProductScreen" component={OthersProductScreen} />
    </Stack.Navigator>
  );
}

function Loading(){
  return (
    <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{headerShown: false}}>
    <Stack.Screen  name="LoadingScreen" component={LoadingScreen} />
    <Stack.Screen  name="LoginScreen" component={LoginScreen} />
    <Stack.Screen  name="SignupScreen" component={SignupScreen} />
    <Stack.Screen  name="Selling" component={Selling} />
    </Stack.Navigator>
  );
}

export default function Route() {
    return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Tab.Screen name="Sell" component={Loading}
    options={{tabBarLabel: 'Sell',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="cash" color={color} size={size} />
    ),
    }}
    />
    <Tab.Screen name="Home" component={HomeScreen} 
    options={{tabBarLabel: 'Home',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="home" color={color} size={size} />
    ),
    }}/>
    <Tab.Screen name="Browse" component={Buying} 
    options={{tabBarLabel: 'Browse',
    tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="cart" color={color} size={size} />
    ),
    }}
    />
    </Tab.Navigator>
    </NavigationContainer>
    );
  }