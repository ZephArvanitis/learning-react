import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera'
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';

import Toolbar from './src/toolbar.component'
import Gallery from './src/gallery.component'

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
  handleCapture = async () => {
      console.log("Trying to capture a photo");
      const photoData =  await this.camera.takePictureAsync();
      this.setState({ captures: [photoData, ...this.state.captures] });
      console.log("Total captures " + this.state.captures.length);
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasCameraPermission = (camera.status === 'granted');
    this.setState({ hasCameraPermission });
  };

  render() {
      const { hasCameraPermission, flashMode, cameraType, captures } = this.state;

      if (this.)
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
              {captures.length > 0 && <Gallery captures={captures}/>}
        </View>
      );
  };
};
