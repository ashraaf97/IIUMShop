import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text,FlatList,Image, StyleSheet,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import Constants from 'expo-constants';

import firebase from 'firebase';
import 'firebase/firestore';

function Item({ title, price, detail, image, contact }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Image
        style={styles.productpicture}
        source={{
            uri: image,
          }}
        />
        <Text style={styles.detail}>{detail}</Text>
        <Text style={styles.price}>RM: {price}</Text>
        <Text style={styles.contact}>Contact: {contact}</Text>
      </View>
    );
  }

export default class ProductScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      DATA: [],
      loading: false,
    }
  }

  updateIndex = (index) => {
    console.log(index)
  }
  
  componentDidMount(){
    firebase.firestore().collection('products')
    .onSnapshot(querySnapshot => {
      const DATA = [];

      querySnapshot.forEach(documentSnapshot => {
        DATA.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      //console.log(DATA)
      this.setState({DATA: DATA , loading: false})
    });}
    
    searchFilterFunction = (e) => {  
    let text = e.toLowerCase()
    let products = this.state.DATA
    let filteredName = products.filter(product => product.title == text)
    console.log(filteredName)
    };
    

    render() {
      if (this.state.loading) {
        return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        )
      }
    const { navigation, currentUser } = this.props
      return (
    <SafeAreaView style={styles.container}>
       <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}   
      />
      <View style={styles.container2}>
      <ButtonGroup
        selectedBackgroundColor="pink"
        onPress={this.updateIndex}
        selectedIndex={1}
        buttons={['FOOD', 'GADGET', 'BOOKS', 'OTHERS']}
        containerStyle={{height: 30}} />
      </View>
      <FlatList
        data={this.state.DATA}
        renderItem=
        {({ item }) => <Item 
        title={item.title} 
        price={item.price}
        contact={item.contact}  
        detail={item.detail}
        image={item.image}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      )
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    container2: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      marginBottom: 20
    },
    item: {
      backgroundColor: '#c5bbbb',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    detail: {
        fontSize: 20,
      },
    price: {
        fontSize: 20,
      },
    contact: {
        fontSize: 20,
      },
    productpicture: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
      },
  });