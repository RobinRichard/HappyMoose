import React, { Component } from "react";
import { StyleSheet, View, Image, ToastAndroid, SafeAreaView } from 'react-native';

import { Button, Text } from 'native-base';

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'rn-fetch-blob';

const options = {
    title: 'Select Photo',
    takePhotoButtonTitle: "Take a photo",
    chooseFromLibraryButtonTitle: "Choose from gallery ",
    quality: 1
};

class Upload extends Component {
    constructor() {
        super()
        this.state = {
            imageSource: null,
            data: null
        }
    }

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                ToastAndroid.showWithGravity(
                    'ImagePicker Error : ' + response.error,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    imageSource: source,
                    data: response.data,
                    filetype: response.type,
                    filename: response.fileName,
                });
            }
        });

    }

    uploadPhoto() {

        RNFetchBlob.fetch('POST', 'http://10.0.2.2:8000/apiuploads', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'image', filename: this.state.filename, type: this.state.filetype, data: this.state.data }

            ]).then((resp) => {
                ToastAndroid.showWithGravity(
                    'uploaded successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
                this.setState({
                    imageSource: null
                })
            }).catch((err) => {
                ToastAndroid.showWithGravity(
                    'Server error : ' + err,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            })

    }

    RemovePhoto() {
        this.setState({
            imageSource: null
        })
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Image style={{ width: '80%', height: '50%' }} source={this.state.imageSource != null ? this.state.imageSource :
                    require('../Images/default.jpeg')}>
                </Image>
                <View style={{ flexDirection: 'row', padding: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    {this.state.imageSource == null ? <Button onPress={this.selectPhoto.bind(this)} style={{ margin: 5 }} warning><Text>Select</Text></Button> : null}

                    {this.state.imageSource != null ? <Button onPress={this.RemovePhoto.bind(this)} style={{ margin: 5 }} danger><Text>Clear</Text></Button> : null}

                    {this.state.imageSource != null ? <Button onPress={this.uploadPhoto.bind(this)} style={{ margin: 5 }} info><Text>Upload</Text></Button> : null}
                </View>
            </SafeAreaView>
        );
    }
}
export default Upload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});