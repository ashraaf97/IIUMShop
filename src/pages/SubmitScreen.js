import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Picker, ScrollView, TouchableOpacity   } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Random from 'expo-random';

import firebase from 'firebase';
import 'firebase/firestore';

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
console.disableYellowBox = true;

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
 
  const ref = firebase
    .storage()
    .ref()
    .child("abc");
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}


export default class SubmitScreen extends Component{
  state = {
    title: "",
    image: "",
    detail: "",
    price: "",
    contact: "",
    id: "",
    userid:"",
    type:"",
    uploading: false,
  }

  handleSubmit = () => {
    var db = firebase.firestore();
    db.collection("products").add({
      title: this.state.title,
      image: this.state.image,
      detail: this.state.detail,
      price: this.state.price,
      contact: this.state.contact,
      id: this.state.id,
      userid: this.state.userid,
      type: this.state.type
  })
  .then(function(docRef) {
    db.collection("products").doc(docRef.id).update({id: docRef.id})
    console.log("Document written with ID: ", docRef.id);
    alert("Your item has been submitted");
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    console.log(user.uid)
    this.setState({ userid: user.uid})
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  render(){
    const { title, image, description, price, contact } = this.state
    return(
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.header}>ITEM SUBMISSION</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Title of your product to sell"
            onChangeText={value => this.setState({ title: value })}
          />
          <Text style={styles.normaltext}>Image URL/Pick Image</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Image URL"
            onChangeText={value => this.setState({ image: value })}
          />
          <View style={styles.container2}>
          <TouchableOpacity style={styles.button} onPress={this.selectImage}>
          <Text style={styles.btntext}>Pick Image</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.normaltext}>Type of Item</Text>
          <Picker
          selectedValue={this.state.type}
          style={{ height: 50, width: 200 }}
          onValueChange={value => this.setState({type: value})}
          >
        <Picker.Item label="Please Select" value="" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Gadget" value="gadget" />
        <Picker.Item label="Books" value="books" />
        <Picker.Item label="Others" value="others" />
      </Picker>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Detail"
            onChangeText={value => this.setState({ detail: value })}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Price"
            onChangeText={value => this.setState({ price: value })}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Contact No:"
            onChangeText={value => this.setState({ contact: value })}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.btntext}>Submit</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  container2: {
    flexDirection:"row" 
  },
  textInput: {
    alignSelf: 'stretch',
    height: 23,
    marginBottom: 20,
    color: 'black',
    borderRadius: 10,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderTopColor: '#f8f8f8',
    borderTopWidth: 1,
    marginLeft:20,
    marginRight:20,
    fontSize: 20,
  },
  header: {
    marginTop:30,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00928e',
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomColor: '#00928e',
    borderBottomWidth: 3,
  },
  normaltext:{
    color: '#00928e',
    fontSize: 20,
    padding: 5,
    marginTop: 5,
    marginBottom:5,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#00928e',
    marginTop: 20,
    marginHorizontal: 50,
  },
  btntext: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
})

