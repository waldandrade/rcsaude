import { connect } from 'react-redux';
import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components/gradientButton';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { setEmail, setPassword, login, signup } from '../../actions';
import Input from '../../components/Input';
import { Constants } from 'expo';


const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing
});

export class LoginV1 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.margin = new Animated.Value(20);
    this.keyboardWillShowSub = null;
    this.keyboardWillHideSub = null;
  }

  keyboardDidShow = (event) => {
    Animated.timing(this.margin, {
      duration: event.duration,
      toValue: -40
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.margin, {
      duration: 20,
      toValue: 20,
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
    Keyboard.dismiss();
    setTimeout(() => this.props.screenProps.dispatch(login()), 1000);
  }

  onPressSignUp() {
    this.props.screenProps.dispatch(signup());
  }

  _renderImage(image) {

    let contentHeight = scaleModerate(375, 1);
    let height = new Animated.Value(Dimensions.get('window').height - contentHeight - 20);
    let width = new Animated.Value(Dimensions.get('window').width);

    if (RkTheme.current.name === 'light')
      image = (<Animated.Image  style={[styles.image, {height, width, marginBottom: this.margin, marginTop: this.margin}]} source={require('../../assets/images/backgroundLoginV1.png')}/>);
    else
      image = (<Animated.Image  style={[styles.image, {height, width, marginBottom: this.margin, marginTop: this.margin}]} source={require('../../assets/images/backgroundLoginV1DarkTheme.png')}/>);
    return image;
  }

  renderCurrentState() {

    if (this.props.authorizing) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    let image = this._renderImage();

    return (
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
      >
        {image}
        <View style={styles.container}>
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
          <GradientButton onPress={() => this.onPressSignIn()} rkType='large' style={styles.save} text='LOGIN'/>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Não tem uma conta?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.onPressSignUp()}> Cadastre-se agora </RkText>
              </RkButton>
            </View>
          </View>
        </View>
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
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));
