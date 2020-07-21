import * as React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>HI, WELCOME TO</Text>
      <Image
        style={styles.logo}
          source={{
            uri: 'https://i.imgur.com/uRhjgad.jpg',
          }}
        />
      <View style={styles.container0}>
      <Text style={styles.welcome2}>Here you can search for something to buy or sell something ☺</Text>
      </View>
      <Text style={styles.choose}>Lets start, Are you a:</Text>
      <View style={styles.container2}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sell')}>
      <Image
        style={styles.logo1}
          source={{
            uri: 'https://i.imgur.com/fdw8uul.jpg',
          }}
        />
      </TouchableOpacity>
      <Text style={styles.choose}>  OR  </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse')}>
      <Image
        style={styles.logo1}
          source={{
            uri: 'https://i.imgur.com/yYVWQrQ.jpg',
          }}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  container0: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: "white",
  },
   container1: {
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row' ,
  },
   container2: {
     marginLeft: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row' ,
  },
  logo: {
    width: 300,
    height: 100,
  },
   logo1: {
    width: 80,
    height: 80,
  },
    welcome : {
    marginTop: 50,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  welcome2 : {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  choose : {
    marginTop: 50,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 20
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  
  
});