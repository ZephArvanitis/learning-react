import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera'
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';

import Toolbar from './src/toolbar.component'
import Gallery from './src/gallery.component'

export default class CameraView extends React.Component {
  camera = null;
  state = {
      hasCameraPermission: null,
      captures:  [],
      flashMode: Camera.Constants.FlashMode.off,
      capturing: null,
      cameraType: Camera.Constants.Type.back,
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

//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   setType(
//                     type === Camera.Constants.Type.back
//                       ? Camera.Constants.Type.front
//                       : Camera.Constants.Type.back
//                   );
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//               </TouchableOpacity>

// export default function CameraApp() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
// 
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);
// 
//   if (hasPermission === null) {
//       console.log("No permission set yet...");
//       return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//       <View style={{ flex: 1 }}>
//       <Camera style={{ width: Dimensions.get('window').width,
//                        aspectRatio: 1}} type={type}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//           }}>
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }
