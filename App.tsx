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
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoAbout}>{item.about}</Text>
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
        contentContainerStyle={{ padding: 20 }}
        renderItem={renderItem}
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
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    width: 250,  
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
  },
  todoItem: {
    backgroundColor: '#2B2A27',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  todoAbout: {
    fontSize: 14,
    color: '#ccc',
  },
});