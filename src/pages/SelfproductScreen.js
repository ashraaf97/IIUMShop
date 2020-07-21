import * as React from 'react';
import { Component } from 'react';
import { ActivityIndicator, Button, View, Text,FlatList,Image, StyleSheet,SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

import firebase from 'firebase';
import 'firebase/firestore';

const deletePost = (id) => {
  var db = firebase.firestore();
  const deleteItemId = id;
  db.collection("products").doc(deleteItemId).delete().then(function() {
       alert("The selected item is deleted")
   }).catch(function(error) {
       alert("Error removing document: ", error);
   });
}

export default class SelfproductScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      DATA: [],
      loading: false,
    }
  }

  componentDidMount(){
    const user = firebase.auth().currentUser;
    console.log(user.uid)
    firebase.firestore().collection('products')
    .where("userid", "==", user.uid)
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

    Item({ title, price, detail, image, contact, id }) {
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
          <Button
          title="Delete Item"
          color="#e53a3a"
          onPress={() => {deletePost(id)}}
          />
        </View>
      );
    }
    render() {if (this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }
      return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.normaltext}>You can delete your items here</Text>
      <FlatList
        data={this.state.DATA}
        renderItem=
        {({ item }) => <this.Item 
        title={item.title} 
        price={item.price}
        contact={item.contact}  
        detail={item.detail}
        id={item.id}
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
    normaltext: {
      fontSize: 20,
      color: '#00928e',
      marginLeft: 60    }
  });