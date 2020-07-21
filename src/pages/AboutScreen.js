import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

export default class AboutScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
          email: "",
          uid: "",
        }
      }

    componentDidMount(){
    const user = firebase.auth().currentUser;
    user.providerData.forEach((userInfo) => {
    console.log('User info for provider: ', userInfo);
    this.setState({ email: userInfo.email })
    console.log(user.uid)
    this.setState({ uid: user.uid})
    });
    }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.myinfo}>ABOUT ME</Text>
      
      <View style={styles.container1}>
      <Text style={styles.style1}>User (UniqueID): {this.state.uid}</Text>
     
     </View>
     <View style={styles.container2}>
      <Text style={styles.style1}>EMAIL ADDRESS : {this.state.email}</Text>
      
     </View>
     </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  container1: {
    marginTop: 70,
    flex : 1,
    paddingVertical: 50,
    borderWidth: 3,
    borderColor: "#00928e",
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
  },
  container2: {
    marginTop: 20,
    flex : 1,
    paddingVertical: 50,
    borderWidth: 3,
    borderColor: "#00928e",
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
    
  },
  myinfo : {
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#00928e",
    borderRadius: 6,
    backgroundColor: "white",
    color: "#00928e",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  style1: {
    marginLeft: 30,
    color: '#00928e',
    fontWeight: 'bold',
    fontSize: 20,
  },
});