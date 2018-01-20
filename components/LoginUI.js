import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ListView, Image, KeyboardAvoidingView, Animated, Keyboard } from 'react-native';
import { setUserName, setUserAvatar } from '../actions';
import Input from '../components/Input';
import Button from '../components/Button';
import LoginButton from '../containers/LoginButton';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing
});

class LoginUI extends React.Component {

  constructor(props) {
    super(props);
    this.marginBottom = new Animated.Value(40);
    this.keyboardWillShowSub = null;
    this.keyboardWillHideSub = null;
  }

  keyboardDidShow = (event) => {
    Animated.timing(this.marginBottom, {
      duration: event.duration,
      toValue: 10
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.marginBottom, {
      duration: 20,
      toValue: 40,
    }).start();
  };

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  onPressSignIn() {
    this.setState({
      authenticating: true
    })
  }

  renderCurrentState() {
    if (this.props.authorizing) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <KeyboardAvoidingView
        style={styles.form}
        behavior="padding"
      >
        <Animated.Image  style={[styles.image1, { marginBottom: this.marginBottom }]} source={require("../assets/marca_icon.png")}/>
        <Input
          placeholder='Digite seu email...'
          label='Email'
          labelColor={"#f1f1f1"}
          color={"#00e3aa"}
          placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          ref="email"
          onSubmitEditing={setUserName}
          blurOnSubmit
        />
        <Input
          placeholder='Digite sua senha...'
          label='Senha'
          secureTextEntry
          labelColor={"#f1f1f1"}
          color={"#00e3aa"}
          placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
          returnKeyType={'done'}
          onSubmitEditing={setUserName}
          blurOnSubmit
          // onSubmitEditing={() => this.onPressSignIn()}
          ref="password"
        />
        <Input
          placeholder='Digite a URL do avatar...'
          label='Avatar URL'
          labelColor={"#f1f1f1"}
          color={"#00e3aa"}
          placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          ref="avatar"
          onSubmitEditing={setUserName}
          blurOnSubmit
        />
        <Button onPress={() => this.onPressSignIn()} bgColor={{backgroundColor:"#00e3aa"}}>Log In</Button>
      </KeyboardAvoidingView>
    )
  }

  render() {
    return (
      <View style={styles.root}>
        {this.renderCurrentState()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(0,45,75,1)",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: 'space-around',
  },
  form: {
    flex: 1
  },
  image1: {
    maxWidth: 180,
    alignSelf: "center",
    marginBottom: 40,
    height: 34
  }
});


export default connect(mapStateToProps)(LoginUI);
