import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class Button extends Component {
  render(){
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.button, this.props.bgColor]}>
        <Text style={styles.text}>{ this.props.children }</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 20,
    width: '100%',
    backgroundColor: '#00aeef',
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  }
});


export default connect()(Button);
