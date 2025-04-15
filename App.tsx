import React, { useState, useEffect } from 'react';
import {
  Image, StyleSheet, Text, TextInput, View, TouchableOpacity,
  SafeAreaView, FlatList, ListRenderItemInfo, Modal, Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  id: number;
  title: string;
  about: string;
};

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  const addTodo = () => {
    if (title.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      about: about.trim(),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setAbout('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = () => {
    addTodo();
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleItemPress = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  

  const renderItem = ({ item }: ListRenderItemInfo<Todo>) => (
    <Pressable onPress={(e) => {
      e.stopPropagation(); // prevent outside click from hiding
      handleItemPress(item.id);
    }}>
      <View style={styles.itemContainerBox}>
        <View style={styles.itemContainer}>
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoAbout}>{item.about}</Text>
          </View>
  
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.closebutton}>
            <Image source={require('./assets/close.png')} style={styles.closeicon} />
          </TouchableOpacity>
        </View>
  
        {selectedId === item.id && (
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image source={require('./assets/share.png')} style={styles.closeicon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/info.png')} style={styles.closeicon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/edit.png')} style={styles.closeicon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Pressable>
  );
  

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title..."
            placeholderTextColor="#AAA"
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
        contentContainerStyle={{ padding: 10, paddingTop: 20 }}
        renderItem={renderItem}
        style={styles.item}
      />

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Delete this task?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  if (selectedId !== null) deleteTodo(selectedId);
                  setShowModal(false);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  input: {
    color: 'white',
    backgroundColor: '#1F1E1B',
    borderColor: '#FF8303',
    borderWidth: 1.5,
    padding: 5,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 8,
    width: 250,
    fontFamily: 'Roboto',
    marginBottom: 4,
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
    padding: 5,
    paddingTop: 20,
  },
  todoItem: {
    borderRadius: 8,
    flex: 2,
    width: 265,
    paddingVertical: 4,
  },
  todoTitle: {
    fontSize: 22,
    color: '#F0E3CA',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  todoAbout: {
    fontSize: 14,
    color: '#F0E3CA',
    fontFamily: 'Roboto',
  },
  item: {
    width: '100%',
  },
  closebutton: {
    backgroundColor: '#FF8303',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeicon: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#1B1A17',
    borderColor: '#A35709',
  },
  itemContainerBox: {
    flexDirection: 'column',
    width: '100%'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#FF8303',
    borderWidth: 2,
    backgroundColor: '#242320',
    marginBottom: 5,
    borderRadius: 8,
    width :'100%',
    padding: 16,
    paddingRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    gap : 5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7,7,7,0.87)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1B1A17',
    padding: 20,
    borderColor: '#FF8303',
    borderTopWidth: 2,
    alignItems: 'center',
    width: 281,
    height: 143,
    borderRadius: 4,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButton: {
    width: 64,
    height: 24,
    backgroundColor: '#1B1A17',
    borderColor: '#FF8303',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
});
