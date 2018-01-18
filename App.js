import { Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ListView } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import LoginPage from "./components/symbols/LoginPage";
import { Input } from './components/Input';
import { Button } from './components/Button';

import * as firebase from 'firebase';

//http://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html

class Login extends Component {
  render() {
    return (
        <LoginPage />
    );
  }
}


export default class App extends React.Component {

  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyA2BI3dac6zOR6aMmeJcVncAGMgrSbbaDo",
      authDomain: "rccard-5d4ee.firebaseapp.com",
      databaseURL: "https://rccard-5d4ee.firebaseio.com",
      projectId: "rccard-5d4ee",
      storageBucket: "rccard-5d4ee.appspot.com",
      messagingSenderId: "36838720809"
    };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <View style={styles.root}>
        <Input
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => console.log('Pressed')}>Log In</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    // flexDirection: "column",
    // alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
