import * as React from 'react';
import { Component } from 'react';
import Route from './src/route'

import firebase from 'firebase';
import { firebaseConfig } from './config';

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
}

function App() {
  return (
    <Route/>
  );
}




export default App;