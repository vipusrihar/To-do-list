import React, { useState, useEffect } from 'react';
import {
  Image, StyleSheet, Text, TextInput, View, TouchableOpacity,
  SafeAreaView, FlatList, ListRenderItemInfo,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for each ToDo item
type Todo = {
  id: number;
  title: string;
  about: string;
};

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem('todos');
      const parsed: Todo[] = data ? JSON.parse(data) : [];
      setTodos(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error('Failed to load todos:', error);
      setTodos([]);
    }
  };

  const addTodo = async () => {
    if (title.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      about: about.trim(),
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTitle('');
    setAbout('');
  };

  const handleSubmit = () => {
    addTodo();
  };

  const renderItem = ({ item }: ListRenderItemInfo<Todo>) => (
    <View style={styles.itemContainer}>
      <View style={styles.todoItem}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoAbout}>{item.about}</Text>
      </View>
      <Image source={require('./assets/close.png')} style={styles.closeicon}/>
    </View>
  );

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title..."
            placeholderTextColor="#AAA" // visible light grey
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
            <TextInput
              placeholder="About..."
              placeholderTextColor="#F0E3CAA3"
              style={styles.input}
              value={about}
              onChangeText={setAbout}
            />
        </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Image source={require('./assets/plus.png')} style={styles.icon} />
          </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, paddingTop : 20}}
        renderItem={renderItem}
        style = {styles.item}
      />
    </SafeAreaView>
  );
};

export default App;



const styles = StyleSheet.create({

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  inputContainer: {
    flex: 1, 
    gap :2
  },
  input: {
    color: 'white',            // input text color
    backgroundColor: '#1F1E1B',// background color
    borderColor: '#FF8303',
    borderWidth: 1.5,
    padding: 5,
    paddingLeft : 10,
    fontSize: 14,
    borderRadius: 8,
    width: 250,  
    fontFamily :'Roboto'
  },
  button: {
    backgroundColor: '#FF8303',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  icon: {
    width: 70,
    height: 70,
  },
  view: {
    backgroundColor: '#1F1E1B',
    height: '100%',
    padding : 5,
    paddingTop : 20
  },
  todoItem: {
    borderRadius: 8,
    flex: 2,
    width : 265 ,
    height : 46, 
    color :'#F0E3CA',
  },
  todoTitle: {
    fontSize: 22,
    color: '#F0E3CA',
    fontWeight: '500',
    // top : 16,
    // left : 16,
    letterSpacing : 0,
    fontFamily :'Roboto',
  },
  todoAbout: {
    fontSize: 14,
    color: '#F0E3CA',
    width : 265 ,
    height : 46,
    fontFamily :'Roboto',
    letterSpacing : 0,
  },
  item : {
    width : '100%'
  },
  closeicon: {
    width: 32,
    height: 32,
    borderWidth :2,
    borderTopRightRadius : 5,
    borderTopLeftRadius :5,
    borderBottomRightRadius : 5,
    borderBottomLeftRadius : 5,
    backgroundColor: '#1B1A17',
    borderColor : '#A35709'

  },
  itemContainer: {
    flex :  2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor : '#FF8303',
    borderWidth : 2,
    backgroundColor:  '#242320',
    marginBottom : 5,
    borderTopRightRadius : 8,
    borderTopLeftRadius :8,
    borderBottomRightRadius : 8,
    borderBottomLeftRadius : 8,
    padding : 16,
    gap : 16
  },
});

