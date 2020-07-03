import  React from 'react';
import { View, StatusBar, Platform } from 'react-native';

// Add  spacing for iOS and pass the rest of the props on to StatusBar.
// From https://stackoverflow.com/questions/42599850/

export default function (props) {
    const height = (Platform.OS === 'ios') ? 20 : 0;
    const { backgroundColor } = props;

    return (
      <View style={{ height, backgroundColor }}>
        <StatusBar { ...props } />
      </View>
    );
}
