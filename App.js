import React, { Component } from 'react';
import {
  DrawerNavigator,
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { View, BackHandler } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import {AppRoutes} from './config/navigation/routesBuilder';
import { KittenApp } from "./components/NavApp"
import LoginUI from "./components/LoginUI";
import ChatUI from "./components/ChatUI"
import rootReducer from './reducers';
import Expo, { AppLoading, Font } from 'expo';
import SocketIOClient from 'socket.io-client';
import {withRkTheme, RkTheme,} from 'react-native-ui-kitten';
import {bootstrap} from './config/bootstrap';
import {data} from './data'
import track from './config/analytics';

bootstrap();
data.populateData();

console.ignoredYellowBox = [
  'Setting a timer'
];

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);

async function getNotificationAsync() {
  const { Notifications, Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status === 'granted') {
    alert('ok');
  } else {
    throw new Error('Location permission not granted');
  }
}


async function alertIfRemoteNotificationsDisabledAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    await getNotificationAsync();
  }
}

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {

    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });

    return (
      <KittenApp navigation={navigation} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {

  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('http://192.168.0.23:3000', { transports: ['websocket'] });

    this.socket.emit('enter room', {"room":20, "message":"Olá Mundo!"});
  }

  state = {
    loaded: false
  };

  componentWillMount() {
    this._loadAssets();
  }

  _loadAssets = async() => {
    await Font.loadAsync({
      'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'fontawesome': require('./assets/fonts/fontawesome.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({loaded: true});
  };

    render() {

        if (!this.state.loaded) {
          return <AppLoading />;
        }

        return (
            <Provider store={store}>
               <KittenApp />
            </Provider>
        );
    }
}

Expo.registerRootComponent(Root);
