// import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Button, Text, View, FlatList, ScrollView } from 'react-native';
import  {RNCamera } from 'react-native-camera'
import { Camera } from 'expo-camera'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, navigation } from '@react-navigation/stack'

import * as Permissions from 'expo-permissions'
import Toolbar from './src/toolbar.component'
import CameraView from './camera.tsx'
// import CameraView from './src/camera.page'


const Stack = createStackNavigator();

// async function getLocationAsync() {
//   // permissions returns only for location permissions on iOS and under certain
//   // conditions, see Permissions.LOCATION
//   const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
//   if (status === 'granted') {
//     return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
//   } else {
//     throw new Error('Location permission not granted');
//   }
// }
// 
// class Camera extends Component {
//     state = {
//         hasPermission: null,
//         type: Camera.Constants.Type.back,
//     }
// 
//     async componentDidMount() {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA);
//         this.setState({ hasPermission: status === 'granted'  });
//     }
// 
//     render() {
//         const { hasPermission  } = this.state;
//         if (hasPermission === null) {
//             return <View />;
//         } else if (hasPermission === false) {
//             return <Text>No access to camera</Text>;
//         } else {
//             return (
//                 <View style={styles.container}>
//                     <RNCamera
//                         style={{ flex: 1, alignItems: 'center' }}
//                         type={this.state.cameraType}
//                         ref={ref => {
//                             this.camera = ref
//                         }}
//                     />
//                 </View>
//             )
//         }
//     }
// }

function Hello() {
    const initValue = "Nothing to see here...";
    const [clickCount, setClickCount] = useState(0);

    return (
            <View>
            <Text style={{"textAlign": "center"}}>
            {clickCount == 0 ? initValue : clickCount}
            </Text>
            <Button
              onPress={() => {
                setClickCount(clickCount + 1);
              }}
              title={"Tap me!"}
            />
            </View>
           );
}

function TodoList() {
  function renderTodo(item): JSX.Element {
      var theItem = item.item;
      var keys = Object.keys(theItem);
      if ( !keys.includes("title") || !keys.includes("completed") ) {
          return <Text style={styles.item}>{"Invalid item"}</Text>;
      }
      return <><Text style={styles.item}>{(theItem.completed ? "✓" : "✗") + " " +
          theItem.title}</Text><Button onPress={() => console.log("Yay, clicked!")}
      title="Tappable"/></>;
  }
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setData(json))
      .then((blah) => console.log("useEffect called"))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTodo}
        />
      )}
    </View>
  );
}

function PracticePage() {
  return (
    <>
        <View style={styles.container}>
        <Hello />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ffff" />
        <ActivityIndicator size="large" color="#0ff0ff" />
        <ActivityIndicator size="large" color="#ff00ff" />
        <Hello />
        <TodoList />
        </View>
    </>
  );
}

function Home({ navigation }) {
    return (
        <>
            <Text style={{ textAlign: 'center' }}>Welcome to Safety Cone!</Text>
            <Button onPress={() => navigation.navigate("Account")}
                title="Account"/>
            <Button onPress={() => navigation.navigate("SubmitReport")}
                title="Submit report"/>
            <Button onPress={() => navigation.navigate("About")}
                title="About"/>
        </>
    )
}

function SubmitReport({ navigation }) {
    return (
        <>
            <ScrollView  style={{ marginHorizontal: 10 }}>
            <Text style={styles.biggertext}>Just three steps:</Text>
            <Text style={styles.biggertext}>1) Take a picture of the issue</Text>
            <Text style={styles.biggertext}>2) Tag it with location</Text>
            <Text style={styles.biggertext}>3) Submit!</Text>
            <CameraView />
            <Button onPress={() => navigation.goBack()}
                title="Back to Home"/>
            </ScrollView>
        </>
    )
}

function Account({ navigation }) {
    return (
        <>
            <Button onPress={() => navigation.goBack()}
                title="Back to Home"/>
        </>
    )
}

function About({ navigation }) {
    return (
        <>
            <Text style={{ marginHorizontal: 10 }}>Solve fixable problems
                with Safety Cone.</Text>
            <Text style={{ marginHorizontal: 10 }}>We make it dead easy to
                report problems and make sure they get fixed</Text>
            <Text style={{ marginHorizontal: 10 }}>Just upload a photo,
                tag it with a location, and hit submit – we handle the
                rest.</Text>
            <Button onPress={() => navigation.goBack()}
                title="Back to Home"/>
            <Button onPress={() => navigation.navigate("SubmitReport")}
                title="Or submit a report now!"/>
        </>
    )
}

function PracticeStackNavigator() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen style={styles.margined}
                name="Home" component={Home} />
            <Stack.Screen name="SubmitReport" component={SubmitReport} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen style={styles.margined}
                name="About" component={About} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
  console.log("----------")
  for (var i = 0; i < 10; i++) {
      console.log("-")
  }
  return (
    //<SafeAreaView style={styles.container}>
        <PracticeStackNavigator />
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
      alignItems: 'center',
  },
  margined: {
      marginHorizontal: 10,
  },
  biggertext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
