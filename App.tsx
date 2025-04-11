import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <View  style={styles.heading}>
      <Text  style={styles.heading}>Vipusa Sriharan</Text>
    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  heading : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    color : 'green'
  }
});

