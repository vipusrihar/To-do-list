import React, { useState, useEffect } from 'react';
import {
  Image, StyleSheet, Text, TextInput, View, TouchableOpacity,
  SafeAreaView, FlatList, Modal, Alert, Keyboard, Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from './type/types';
import InputContainer from './components/InputContainer.tsx';
import ShareModal from './components/ShareModal.tsx';
import EditModal from './components/EditModal.tsx';
import InfoModal from './components/InfoModal.tsx';
import RenderItem from './components/renderItem.tsx';
import DeleteModal from './components/DeleteModal.tsx';
import { shareTask } from './utils/shareTask.tsx';


const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [taskId, setTaskId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    loadTodos();
    loadTaskId();
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

  const loadTaskId = async () => {
    const id = await AsyncStorage.getItem('taskId');
    setTaskId(id ? parseInt(id) : 0);
  };

  const addTodo = () => {
    if (title.trim() === '') {
      Alert.alert("Missing Title", "Please enter a task title before adding.");
      return;
    }
    const newTodo: Todo = {
      id: taskId,
      created: Date.now(),
      title: title.trim(),
      about: about.trim(),
    };
    setTodos([...todos, newTodo]);
    setTitle('');
    setAbout('');
  };

  const handleSubmit = () => {
    const newId = taskId + 1;
    setTaskId(newId);
    AsyncStorage.setItem('taskId', newId.toString());
    addTodo();
    Keyboard.dismiss();
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedId(null);
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleItemPress = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleSharePress = (id: number) => {
    setSelectedId(id);
    setShowShare(true);
  };

  const handleInfoPress = (id: number) => {
    setSelectedId(id);
    setShowInfo(true);
  };

  const handleEditPress = (id: number) => {
    const selectedTodo = todos.find(todo => todo.id === id);
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setAbout(selectedTodo.about);
      setSelectedId(id);
      setShowEdit(true);
    }
  };

  const handleEditConfirm = () => {
    if (selectedId !== null) {
      const original = todos.find(todo => todo.id === selectedId);
      if (original && (original.title !== title || original.about !== about)) {
        const updatedTodos = todos.map(todo =>
          todo.id === selectedId ? { ...todo, title, about } : todo
        );
        setTodos(updatedTodos);
      }
      setShowEdit(false);
      setTitle('');
      setAbout('');
      setSelectedId(null);
    }
  };



  const renderItem = ({ item }: { item: Todo }) => (
    <RenderItem
      item={item}
      handleDelete={handleDelete}
      handleItemPress={handleItemPress}
      handleSharePress={handleSharePress}
      handleInfoPress={handleInfoPress}
      handleEditPress={handleEditPress}
      selectedID={selectedId}
    />
  );

  return (
    <SafeAreaView style={styles.view}>

      <InputContainer
        title={title}
        about={about}
        onTitleChange={setTitle}
        onAboutChange={setAbout}
        onSubmit={handleSubmit}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, paddingTop: 20, flexGrow: 1 }}
        renderItem={renderItem}
        style={styles.item}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.noTaskImage}>
            <Image source={require('./assets/noTask.png')} />
          </View>
        }
      />

      <DeleteModal
        showDelete={showDelete}
        onShowDeleteChange={setShowDelete}
        selectedID={selectedId}
        deleteToDo={deleteTodo}
      />

      <ShareModal
        showShare={showShare}
        onShowShareChange={setShowShare}
        shareTask={(platform) => shareTask(platform, selectedId, todos, setShowShare)}
        selectedID={selectedId}
      />

      <InfoModal
        showInfo={showInfo}
        onShowInfoChange={setShowInfo}
        todos={todos}
        selectedID={selectedId}
      />

      <EditModal
        showEdit={showEdit}
        onShowEditChange={setShowEdit}
        title={title}
        about={about}
        onTitleChange={setTitle}
        onAboutChange={setAbout}
        handleEditConfirm={handleEditConfirm}
        onChangeSelectedId={setSelectedId}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#1F1E1B',
    height: '100%',
    padding: 5,
    paddingTop: 20,
  },
  item: {
    width: '100%',
  },
  noTaskImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30
  },

});
