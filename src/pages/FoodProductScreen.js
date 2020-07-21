import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text,FlatList,Image, StyleSheet,SafeAreaView,Dimensions,TouchableHighlight, } from 'react-native';
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

export default class FoodProductScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      DATA: [],
      loading: false,
    }
    const { navigation } = this.props
  }

  updateIndex = (index) => {
    console.log(index)
    if (index==1) {
      this.props.navigation.navigate('GadgetProductScreen')
    } else if (index==2) {
      this.props.navigation.navigate('BooksProductScreen')
    } else if (index==3) {
      this.props.navigation.navigate('OthersProductScreen')
    } else {
      console.log("tiada apa2");
    }
  }
  
  componentDidMount(){
    firebase.firestore().collection('products')
    .where("type", "==", "food")
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
      <View style={styles.container2}>
      <Button
        title="      Food      "
        color="#b90101"
      />
      <Button
        title="      Gadget      "
        color="#038807"
        onPress={() => navigation.navigate('GadgetProductScreen')}
      />
      <Button
        title="      Books      "
        color="#0139b9"
        onPress={() => navigation.navigate('BooksProductScreen')}
      />
      <Button
        title="      Others      "
        color="#841584"
        onPress={() => navigation.navigate('OthersProductScreen')}
      />
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
      flexDirection:"row" 
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 15,
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#444444',
      marginTop: 3,
      marginRight: 5,
      marginLeft: 5,
    },
    detail: {
        fontSize: 20,
        textAlign: 'center',
      },
    price: {
        fontSize: 20,
        textAlign: 'center',
      },
    contact: {
        fontSize: 20,
        textAlign: 'center',
      },
    productpicture: {
        marginLeft: 65,
        width: 200,
        height: 200,
        resizeMode: 'center',
      },
  });