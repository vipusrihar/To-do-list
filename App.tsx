import React, { useState } from 'react';
import {  Image,  StyleSheet,  Text,  TextInput,  View,
  KeyboardAvoidingView,  Platform,  TouchableOpacity, SafeAreaView} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('About:', about);
  };

  return (
    <SafeAreaView style={styles.view}>
      <View
        style={styles.center}
      >
        <TextInput
          placeholder="Title.........."
          placeholderTextColor="#AAA"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Image
          source={require('./assets/plus.png')} 
          style={styles.icon}
          />

        </TouchableOpacity>

        <TextInput
          placeholder="About.........."
          placeholderTextColor="#AAA"
          style={styles.input}
          value={about}
          onChangeText={setAbout}
        />

        
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#1F1E1B',
    height : '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    gap: 5,
  },
  input: {
    margin :5,
    borderColor: '#FF8303',
    borderWidth: 1.5,
    width: 250,
    padding: 10,
    color: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  icon: {
    width: 60,
    height: 60,
  },
  button: {
    backgroundColor: '#FF8303',    
    borderRadius: 8,
  },
  buttonText: {
    color: '#1F1E1B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


// import React from 'react';
// import { View, Text } from 'react-native';
// import { StyleSheet } from 'react-native';
// import { TextInput } from 'react-native';
// import { useState } from 'react';
// import layout from './app/_layout';

// const App = () => {
//   const [name, setName] = useState('');

//   return (
//     <>

//     {/* <View style={styles.heading}>
//       <Text style={styles.heading}>Vipusa Sriharan</Text>

//       <Text style={styles.label}>Task </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Type"
//         value={name}
//         onChangeText={text => setName(text)}
//       />

//     </View> */}
//     </>
//   );
// };

// export default App;


// const styles = StyleSheet.create({
//   heading: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'green'
//   },
//   label : {

//   }, 
//   input : {
//     borderWidth : 3,
//     borderColor : 'black',
//     padding : 5,
//     width : 300

//   }
// });

