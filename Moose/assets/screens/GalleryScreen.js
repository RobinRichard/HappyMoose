import React, { Component } from "react";
import { Platform, FlatList, ActivityIndicator, Modal, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, StatusBar, Animated, Dimensions, SafeAreaView } from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            ModalVisibleStatus: false,
            TempImageURL: '',
        }
    }
    componentWillMount() {
        this.FetchDate()

    }

    FetchDate() {
        return fetch('http://10.0.2.2:8000/photoList')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    photoData: responseJson['photos'],
                }, function () {
                    this.setState({
                        isLoading: false,
                    });
                });
            })
            .catch((error) => {
                alert(error)
            });
    }
    ShowModalFunction(visible, imageURL) {

        this.setState({
            ModalVisibleStatus: visible,
            TempImageURL: imageURL
        });
    }
    refresh() {
        this.setState({
            isLoading: true,
        });
        this.FetchDate()
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <Header style={{ backgroundColor: '#fe9e1f' }}>
                    <Left>
                        <Button transparent>
                            <Image source={require('../Images/logo.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Happy Moose</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <TouchableOpacity onPress={this.refresh.bind(this)}>
                                <Icon type="FontAwesome" style={{ fontSize: 24 }} name="refresh" />
                            </TouchableOpacity>
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    data={this.state.photoData}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
                            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, 'http://10.0.2.2:8000' + item.Actual_name)} >
                                <Image style={styles.imageThumbnail} source={{ uri: 'http://10.0.2.2:8000' + item.Actual_name }} />
                            </TouchableOpacity>
                        </View>
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
                {
                    this.state.ModalVisibleStatus
                        ?
                        (
                            <Modal
                                transparent={false}
                                animationType={"fade"}
                                visible={this.state.ModalVisibleStatus}
                                onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
                                <View style={styles.modalView}>
                                    <Image style={styles.mainImage} source={{ uri: this.state.TempImageURL }} />
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.TouchableOpacity_Style}
                                        onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
                                        <Icon type="FontAwesome" style={{ fontSize: 24 }} name="times" />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        )
                        :
                        null
                }
            </View>
        );
    }
}
export default Gallery;

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },

    imageThumbnail: {

        justifyContent: 'center',
        alignItems: 'center',
        height: 150

    },

    mainImage: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain'

    },

    modalView: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'

    },

    TouchableOpacity_Style: {

        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute'

    }


});