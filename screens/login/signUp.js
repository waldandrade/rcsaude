import React from 'react';
import {
  ScrollView,
  View,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { userOut, cadastro, setNome, setEmail, setPassword, setConfirmPassword } from '../../actions';
import Input from '../../components/Input';
import { Constants } from 'expo';

export class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.marginTop = new Animated.Value(20);
    this.keyboardWillShowSub = null;
    this.keyboardWillHideSub = null;
  }

  keyboardDidShow = (event) => {
    Animated.timing(this.marginTop, {
      duration: event.duration,
      toValue: 0
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.marginTop, {
      duration: 20,
      toValue: 20
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

  onPressSignUp() {
    Keyboard.dismiss();
    setTimeout(() => this.props.screenProps.dispatch(cadastro()), 1000);
  }

  onPressSignIn() {
    this.props.screenProps.dispatch(userOut());
  }

  render() {
    return (
      <View style={styles.root}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior="padding"
        >
          <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
              <RkText rkType='h1'>Cadastro</RkText>
            </View>
            <Input
              placeholder='Digite seu nome...'
              label='Nome'
              labelColor={"#f1f1f1"}
              color={"#00e3aa"}
              placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
              returnKeyType={'next'}
              ref={component => this._nome = component}
              noclear
              onSubmitEditing={setNome}
              onBlur={setNome}
              blurOnSubmit
            />
            <Input
              placeholder='Digite seu email...'
              label='Email'
              labelColor={"#f1f1f1"}
              color={"#00e3aa"}
              placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              ref={component => this._email = component}
              noclear
              onSubmitEditing={setEmail}
              onBlur={setEmail}
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
              noclear
              onSubmitEditing={setPassword}
              onBlur={setPassword}
              blurOnSubmit
              ref={component => this._password = component}
            />
            <GradientButton style={styles.save} rkType='large' text='SALVAR' onPress={() => {
              this.onPressSignUp()
            }}/>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Já tem uma conta? </RkText>
              <RkButton rkType='clear'  onPress={() => this.onPressSignIn()}>
                <RkText rkType='header6'>Entre agora</RkText>
              </RkButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base,
    paddingTop: Constants.statusBarHeight
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    height: 10,
    backgroundColor: 'powderblue',
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));
