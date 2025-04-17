import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, TextInput, View, TouchableOpacity,
  SafeAreaView, FlatList, Modal, Alert, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from './type/types';
import { useTodoStore } from './store/useToDoStore';

import InputContainer from './features/InputContainer';
import ShareModal from './features/ShareModal';
import EditModal from './features/EditModal';
import InfoModal from './features/InfoModal';
import RenderItem from './features/renderItem';
import DeleteModal from './features/DeleteModal';
import { shareTask } from './utils/shareTask';

const App: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const taskId = useTodoStore((state) => state.taskId);
  const setTaskId = useTodoStore((state) => state.setTaskId);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodoToStore = useTodoStore((state) => state.addTodo);
  const deleteTodoFromStore = useTodoStore((state) => state.deleteTodo);
  const toggleComplete = useTodoStore((state) => state.toggleComplete)

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadTodos();
      await loadTaskId();
      setLoading(false);
    };
    init();
  }, []);

  const loadTodos = async () => {
    const saved = await AsyncStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  };

  const loadTaskId = async () => {
    const id = await AsyncStorage.getItem('taskId');
    if (id) setTaskId(parseInt(id));
  };

  const addTodo = () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a task title before adding.");
      return;
    }

    const newTodo: Todo = {
      id: taskId,
      created: Date.now(),
      title: title.trim(),
      about: about.trim(),
      completed : false,
    };

    addTodoToStore(newTodo);
    setTitle('');
    setAbout('');
  };

  const handleSubmit = () => {
    const newId = taskId + 1;
    setTaskId(newId);
    addTodo();
    Keyboard.dismiss();
  };

  const deleteTodo = (id: number) => {
    deleteTodoFromStore(id);
    setSelectedId(null);
  };

  const handleEditConfirm = () => {
    if (selectedId !== null) {
      const original = todos.find(todo => todo.id === selectedId);
      if (original && (original.title !== title || original.about !== about)) {
        const updated = todos.map(todo =>
          todo.id === selectedId ? { ...todo, title, about } : todo
        );
        setTodos(updated);
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
      handleDelete={() => {
        setSelectedId(item.id);
        setShowDelete(true);
      }}
      handleItemPress={() => { setSelectedId((prevId) => (prevId === item.id ? null : item.id)); }}
      handleSharePress={() => {
        setSelectedId(item.id);
        setShowShare(true);
      }}
      handleInfoPress={() => {
        setSelectedId(item.id);
        setShowInfo(true);
      }}
      handleEditPress={() => {
        setTitle(item.title);
        setAbout(item.about);
        setSelectedId(item.id);
        setShowEdit(true);
      }}
      selectedID={selectedId}
    />
  );

  const TodoList = () => (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10, paddingTop: 20 }}
      style={styles.item}
      ListEmptyComponent={
        <View style={styles.noTaskImage}>
          <Image source={require('./assets/noTask.png')} />
        </View>
      }
      keyboardShouldPersistTaps="handled"
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

      {loading ? (
        <View style={styles.noTaskImage}>
          <Text style={{ color: 'white' }}>Loading tasks...</Text>
        </View>
      ) : (
        <TodoList />
      )}

      <DeleteModal
        showDelete={showDelete}
        onShowDeleteChange={setShowDelete}
        selectedID={selectedId}
        deleteToDo={deleteTodo}
      />

      <ShareModal
        showShare={showShare}
        onShowShareChange={setShowShare}
        shareTask={(platform) => { shareTask(platform, selectedId, todos, setShowShare); setSelectedId(null) }}
        selectedID={selectedId}
      />

      <InfoModal
        showInfo={showInfo}
        onShowInfoChange={setShowInfo}
        todos={todos}
        selectedID={selectedId}
        handleCompletePress={() => {if (selectedId !== null) {
          toggleComplete(selectedId)};
        }} 
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
    paddingTop: 30,
  },
});
