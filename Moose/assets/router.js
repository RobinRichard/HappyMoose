import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from 'native-base';

import Upload from "./screens/UploadScreen";
import Gallery from './screens/GalleryScreen'


export const bottomNav = createBottomTabNavigator({
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      tabBarLabel: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" style={{ color: tintColor,fontSize:22 }} name="photo" />
      )
    }
  },
  Upload: {
    screen: Upload,
    navigationOptions: {
      tabBarLabel: 'Upload',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" style={{ color: tintColor,fontSize:24 }} name="cloud-upload" />
      )
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: '#fe9e1f',
      inactiveTintColor: '#666666',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      style: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        paddingTop: 5,
        height:50,
        borderBottomColor: '#dddddd',
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5
      }
    }
  });




export const createRootNavigator = () => {
  return createSwitchNavigator(
    {
      DefaultRoute: {
        screen: bottomNav
      }
    },
    {
      initialRouteName: "DefaultRoute"
    }
  );
};