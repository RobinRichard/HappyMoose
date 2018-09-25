import React, { Component } from 'react';
import {  AppRegistry,  AsyncStorage,YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import App from './assets/index';

export default class Moose extends Component {
  render() {
    return (
     <App />
    );
  }
}

AppRegistry.registerComponent('Moose', () => Moose);
