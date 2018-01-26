import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TextInput } from 'react-native';

class Input extends Component {
    state = {
        text: null
    }

    onChangeText = text => this.setState({text: text});

    onSubmitEditing = () => {
        this.props.dispatch(
            this.props.onSubmitEditing(this.state.text)
        );

        if (!this.props.noclear) {
            this.setState({
                text: null
            });
        }
    }

    onFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(this.refs.input);
        }
    }

    onBlur = () => {
        if (this.props.submitOnBlur) {
            this.onSubmitEditing();
        }
    }

    onLayout = (event) => {
        if (this.props.onLayout) {
            this.props.onLayout(event);
        }
    }

    render() {
        return (
            <View style={styles.container}>
              <Text style={[styles.label, {color: this.props.labelColor}]}>{ this.props.label }</Text>
              <TextInput
                autoCorrect={false}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                style={[styles.input, {color:this.props.color}]}
                secureTextEntry={this.props.secureTextEntry}
                value={this.state.text}
                keyboardType={this.props.keyboardType}
                autoCapitalize={'none'}
                returnKeyType={this.props.returnKeyType}
                blurOnSubmit={this.props.blurOnSubmit}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEditing}
                onLayout={this.onLayout}
                ref="input"
              />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    // borderColor: '#eee',
    // borderBottomWidth: 2,
  },
  label: {
    padding: 5,
    paddingBottom: 0,
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 10,
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
    width: '100%',
    borderBottomWidth: 0
  }
});


export default connect()(Input);
