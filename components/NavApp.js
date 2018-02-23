import React from 'react';
import {
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { PerfilCards } from '../screens/perfil';
import { checkUserExists } from '../actions';
import { SplashScreen } from '../screens/other';
import { LoginV1, SignUp } from '../screens/login';
import { Articles1 } from '../screens/articles/articles1';
import { Dashboard } from '../screens/dashboard/dashboard';


// const VisibleCards = connect()(({dispatch}) => {
//  return (<Articles1 dispatch={dispatch} />);
//})

const RCSaude = StackNavigator({
    Cards: {
      screen: Articles1
    },
    Perfil: {
      screen: PerfilCards
    },
    Dashboard: {
      screen: Dashboard
    }
  },
  {
    navigationOptions: {
      headerTitleStyle: {
        color: "#000000"
      }
    }
  }
);

// src/App.js
const LoginOrChat = connect(
    (state) => ({
        authorized: state.user.authorized,
        new_user: state.user.new_user
    })
)(({ authorized, new_user, dispatch }) => {
    if (authorized) {
        return (
          <RCSaude screenProps={{dispatch}}/>
        );
    } else if (new_user) {
      return (<SignUp screenProps={{dispatch}}/>);
    } else {
        dispatch(checkUserExists());
        return (<LoginV1 screenProps={{dispatch}}/>);
    }
});

// let SideMenu = withRkTheme(Screens.SideMenu);
export const KittenApp = StackNavigator({
  First: {
    screen: SplashScreen,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Home: {
    screen: LoginOrChat,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  }
});
