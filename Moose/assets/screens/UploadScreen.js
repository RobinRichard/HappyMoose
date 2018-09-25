import React, { Component } from "react";
import { StyleSheet,Button, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';

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
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    imageSource: source,
                    data: response.data,
                    filetype:response.type,
                    filename:response.fileName,
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
                alert('uploaded successfully')
                 this.setState({
       imageSource:null})
            }).catch((err) => {
                alert(err)
            })

    }

    RemovePhoto(){
        this.setState({
       imageSource:null})
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Image style={{ width: '80%', height: '50%' }} source={this.state.imageSource != null ? this.state.imageSource :
                    require('../Images/default.jpeg')}>
                </Image>
                <View style={{ flexDirection: 'row',padding:10,justifyContent:'space-between' }}>
                    
                    {this.state.imageSource==null?<Button title="Select" onPress={this.selectPhoto.bind(this)}  color="#fe9e1f" />:null}

                    {this.state.imageSource!=null?<Button title="Clear" onPress={this.RemovePhoto.bind(this)}  color="#fe9e1f" />:null}

                    {this.state.imageSource!=null?<Button title="upload" onPress={this.uploadPhoto.bind(this)} color="#fe9e1f" /> :null}
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