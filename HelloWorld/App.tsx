// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Button, Text, View, FlatList } from 'react-native';

import StatusBar from './StatusBar';

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
      return <Text style={styles.item}>{(theItem.completed ? "✓" : "✗") + " " +
          theItem.title}</Text>;
  }
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setData(json))
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
          //renderItem={({ item }) => (<Text>{item.title}</Text>)}
        />
      )}
    </View>
  );
}

export default function App() {
  console.log("----------")
  for (var i = 0; i < 10; i++) {
      console.log("-")
  }
  return (
    <>
    <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <View style={styles.container}>
        <Hello />
        <Hello />
        <TodoList />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
