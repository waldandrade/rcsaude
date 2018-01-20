import { Platform, StatusBar, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import { StackNavigator, TabNavigator } from 'react-navigation';

class EditInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <Button
        title="Save"
        onPress={params.handleSave ? params.handleSave : () => null}
      />
    );
    if (params.isSaving) {
      headerRight = <ActivityIndicator />;
    }
    return { headerRight };
  };

  state = {
    nickname: 'Lucy jacuzzi'
  }

  _handleSave = () => {
    // Update state, show ActivityIndicator
    this.props.navigation.setParams({ isSaving: true });

    // Fictional function to save information in a store somewhere
    saveInfo().then(() => {
      this.props.navigation.setParams({ isSaving: false});
    })
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSave: this._handleSave });
  }

  render() {
    return (
      <TextInput
        onChangeText={(nickname) => this.setState({ nickname })}
        placeholder={'Nickname'}
        value={this.state.nickname}
      />
    );
  }
}

class RecentChatsScreen extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        isLoading: true
      }
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.dataSource){
      return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View>
                <Button
                  onPress={() => navigate('Chat', { pk: rowData.pk })}
                  title={`Chat ${rowData.pk}`}
                />
              </View>
            }
          />
      );
    }else{
      return (
          <Text>Aguardando requisição!</Text>
      )
    }
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append("token", "FGB10KTVVC2F6AHQX0LRME0028IFIEFYL9GGQ9MURA0TC");
    return fetch('http://172.30.3.4:8080/chat/api/chat/select_all/', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'multipart/form-data',
         },
         body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

class HomeScreen extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        isLoading: true
      }
  }

  static navigationOptions = {
    title: 'Prontuários',
  };
  render() {

  }


}

class ChatScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const isInfo = state.params.mode === 'info';
    const { user } = state.params;
    return {
      title: isInfo ? `${navigation.state.params.pk}'s Contact Info` : `Chat with ${navigation.state.params.pk}`,
      headerRight: (
        <Button
          title={isInfo ? 'Done' : `${navigation.state.params.pk}'s info`}
          onPress={() =>
              setParams({ mode: isInfo ? 'none' : 'info' })
          }
        />
      ),
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.pk}</Text>
      </View>
    );
  }
}


export const SimpleApp = StackNavigator({
    Home: {
      screen: MainScreenNavigator
    },
    Chat: { screen: ChatScreen }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
