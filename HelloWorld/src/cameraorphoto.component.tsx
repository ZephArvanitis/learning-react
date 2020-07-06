import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera'
import { Button, Dimensions, Image, TouchableOpacity, Text, View } from 'react-native';

import Toolbar from './toolbar.component'
import styles from './styles'

export default class CameraOrPhotoView extends React.Component {
  camera = null;
  state = {
      hasCameraPermission: null,
      captures:  [],
      flashMode: Camera.Constants.FlashMode.off,
      cameraType: Camera.Constants.Type.back,
      cameraMode: true,
  };

  setFlashMode = (flashMode) => {
      this.setState({ flashMode });
      console.log("Setting flash mode " + flashMode);
  };
  flipCamera = () => {
      this.setState((state) => {
          return {cameraType:
              state.cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
          }
      });
  }
  retakePhoto = () => {
      this.setState(() => {
          return {cameraMode: true}
      });
  }
  handleCapture = async () => {
      console.log("Trying to capture a photo");
      const photoData =  await this.camera.takePictureAsync();
      this.setState({ captures: [photoData, ...this.state.captures], cameraMode: false });
      console.log("Total captures " + this.state.captures.length);
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasCameraPermission = (camera.status === 'granted');
    this.setState({ hasCameraPermission });
  };

  render() {
      const { hasCameraPermission, flashMode, cameraType, captures, cameraMode } = this.state;

      // Camera mode
      if (cameraMode || captures.length == 0) {
          if (hasCameraPermission === null) {
              return <View />;
          } else if (hasCameraPermission === false) {
              return <Text>Access to camera denied.</Text>;
          }

          return (
              <View style={{ flex: 1 }}>
              <Camera
                  style={{ width: Dimensions.get('window').width,
                      aspectRatio: 1}}
                  type={this.state.cameraType}
                  flashMode={this.state.flashMode}
                  ref={camera => this.camera = camera}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                </View>
              </Camera>
              <Toolbar
                  flashMode={this.flashMode}
                  cameraType={this.cameraType}
                  setFlashMode={this.setFlashMode}
                  onCapture={this.handleCapture}
                  flipCamera={this.flipCamera}
              />
            </View>
          );
      }
      // Picture mode
      var uri = captures[0].uri;
      return (
          <View key={uri} style={{ flex: 1 }}>
                <Button title={"retake photo"} onPress={this.retakePhoto} />
                <Image
                    style={{ width: Dimensions.get('window').width,
                        aspectRatio: 1}}
                    source={{ uri  }} />
            </View>
          // <View style={{ flex: 1 }}>
          // <Image
          //     source={{ latest_photo }} />
          // </View>
      );
  };
};
