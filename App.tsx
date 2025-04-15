import React, { useState, useEffect } from 'react';
import {
  Image, StyleSheet, Text, TextInput, View, TouchableOpacity,
  SafeAreaView, FlatList, ListRenderItemInfo, Modal, Pressable,
  Linking, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

type Todo = {
  id: number;
  title: string;
  about: string;
  created : number;
};

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [taskId,setTaskId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showShare, setShowShare] =  useState(false);
  const [showEdit , setShowEdit] = useState(false);
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

  const addTodo = () => {
    if (title.trim() === '') return;

    const newTodo: Todo = {
      id: taskId ,
      created: Date.now(),
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


  
  const loadTaskId = async () => {
    const id = await AsyncStorage.getItem('taskId');
    setTaskId(id ? parseInt(id) : 0);
  };
  
  const handleSubmit = () => {
    const newId = taskId + 1;
    setTaskId(newId);
    AsyncStorage.setItem('taskId', newId.toString());
    addTodo();
  };
  

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleItemPress = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  
  const handleSharePress = (id : number) => {
    setSelectedId(id);
    setShowShare(true)    
  }
  
  const handleInfoPress = (id : number) => {
    setSelectedId(id);
    setShowInfo(true)    
  } 

  const handleEditPress = (id : number) => {
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
  


const shareTask = async (platform: string, selectedId: number | null)  => {
  try {
    const storedTasks = await AsyncStorage.getItem('todos');
    if (!storedTasks) throw new Error("No tasks found");

    const parsedTasks = JSON.parse(storedTasks);
    const foundTask = parsedTasks.find((task: any) => task.id === selectedId);

    if (!foundTask) {
      Alert.alert("Task not found");
      return;
    }

    const text = `📝 Task: ${foundTask.title}\n📌 Description: ${foundTask.about}`;

    switch (platform) {
      case 'clipboard':
        Clipboard.setString(text);
        Alert.alert("Copied to Clipboard!", text);
        break;

      case 'whatsapp':
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(text)}`).catch(() =>
          Alert.alert('WhatsApp not installed')
        );
        break;

      case 'telegram':
        Linking.openURL(`tg://msg?text=${encodeURIComponent(text)}`).catch(() =>
          Alert.alert('Telegram not installed')
        );
        break;

      case 'facebook':
        Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`).catch(() =>
          Alert.alert('Facebook not available')
        );
        break;

      case 'vk':
        Linking.openURL(`https://vk.com/share.php?comment=${encodeURIComponent(text)}`).catch(() =>
          Alert.alert('VK not available')
        );
        break;

      default:
        Alert.alert("Unsupported platform");
    }
    setShowShare(false);

  } catch (error) {
    console.error('Failed to share task:', error);
    Alert.alert("Error", "Something went wrong while sharing the task.");
  }
};


  const renderItem = ({ item }: ListRenderItemInfo<Todo>) => (
    <>
    
      <View style={styles.itemContainerBox}>
        <View style={styles.itemContainer}>
        <Pressable onPress={(e) => {
            e.stopPropagation(); // prevent outside click from hiding
            handleItemPress(item.id);
          }}>
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoAbout}>{item.about}</Text>
          </View>
          </Pressable>
  
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.closebutton}>
            <Image source={require('./assets/close.png')} style={styles.closeicon} />
          </TouchableOpacity>
        </View>
  
        {selectedId === item.id && (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleSharePress(item.id)}>
              <Image source={require('./assets/share.png')} style={styles.iconButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInfoPress(item.id)}>
              <Image source={require('./assets/info.png')} style={styles.iconButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditPress(item.id)}>
              <Image source={require('./assets/edit.png')} style={styles.iconButton} />
            </TouchableOpacity>
          </View>
        )}
      </View>
 
    </>
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

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!title.trim()}
          style={styles.button}
        >
          <Image source={require('./assets/plus.png')} style={styles.icon} />
        </TouchableOpacity>

      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, paddingTop: 20, flexGrow: 1 }}
        renderItem={renderItem}
        style={styles.item}
        ListEmptyComponent={
          <View style={styles.noTaskImage}>
            <Image  source={require('./assets/noTask.png')} />
          </View>
        }
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


      <Modal
          visible={showShare}
          transparent
          animationType="fade"
          onRequestClose={() => setShowShare(false)}
        >
          <View style={styles.shareOverlay}>
            <View style={styles.shareContainer}>
              <View style={styles.shareButtons}>
                <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('clipboard', selectedId)}>
                  <Image style={styles.shareIcon} source={require('./assets/copy.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('vk', selectedId)}>
                  <Image style={styles.shareIcon} source={require('./assets/vk.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('telegram', selectedId)}>
                  <Image style={styles.shareIcon} source={require('./assets/telegram.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('whatsapp', selectedId)}>
                  <Image style={styles.shareIcon} source={require('./assets/whatsapp.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('facebook', selectedId)}>
                  <Image style={styles.shareIconFacebook} source={require('./assets/facebook.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showInfo}
          transparent
          animationType="fade"
          onRequestClose={() => setShowInfo(false)}
        >
          <View style={styles.infoOverlay}>
            <View style={styles.infoContainer}>
              {selectedId !== null && (
                <>
                  <Text style={styles.infoText}>
                    Task : {todos.find((t) => t.id === selectedId)?.title}
                  </Text>
                  <Text style={styles.infoText}>
                    About :{todos.find((t) => t.id === selectedId)?.about}
                  </Text>
                  <Text style={styles.infoText}>
                    Created at:{' '}
                    {new Date(
                      todos.find((t) => t.id === selectedId)?.created || 0
                    ).toLocaleString()}
                  </Text>
                </>
              )}
              <TouchableOpacity onPress={() => setShowInfo(false)} style={styles.infoButton}>
                <Text style={styles.infoButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



      <Modal
        visible={showEdit}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEdit(false)}
      >
        <View style={styles.editOverlay}>
          <View style={styles.editContainer}>
          <View style={styles.editContainer2}>
            <View >
              <TextInput
                placeholder="Mini Input..."
                placeholderTextColor="#AAA"
                style={styles.inputTitle}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                placeholder="Max Input..."
                placeholderTextColor="#AAA"
                style={styles.inputAbout}
                value={about}
                onChangeText={setAbout}
                multiline
              />
            </View>
            <View>
            <View style={styles.editButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                  setShowEdit(false);
                  setTitle('');
                  setAbout('');
                  setSelectedId(null);
                }}>
                  <Text style={styles.editButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleEditConfirm}>
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
              
            </View>
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
    color: '#FFFFFF',
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
    paddingVertical: 0,
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
    backgroundColor: '#070707',
    opacity :0.89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1B1A17',
    padding: 20,
    borderRadius: 4,
    alignItems : 'center',
    borderTopWidth: 2,
    borderColor: '#FF8303',
    width : 281,
    height: 143
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
  noTaskImage : {
    flex:1,
    justifyContent :'space-around',
    alignItems :'center',
    paddingTop : 30
  },
  iconButton : {
    width: 36,
    height :36,
    borderRadius : 6,
    borderWidth :1,
    borderColor: '#A35709',
  },
  editOverlay : {
    flex: 1,
    backgroundColor: '#070707',
    opacity :0.89,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editContainer: {
    backgroundColor: '#1B1A17',
    padding: 18,
    alignItems: 'center',
    width: 360,
    height: 451,
    borderTopLeftRadius :8,
    borderTopRightRadius : 8,
  },
  editContainer2: {
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    width: 324,
    height: 415,
    gap : 8
  },
  inputTitle: {
    color: 'white',
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 8,
    width: 324,
    height :'auto',
    fontFamily: 'Roboto',
    marginBottom: 4,
  },
  inputAbout: {
    color: 'white',
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 14,
    borderRadius: 8,
    width: 324,
    height: 343,
    fontFamily: 'Roboto',
    marginBottom: 4,
    textAlignVertical: 'top', 
  },
  editButtons: {
    flexDirection: 'row',
    gap :5,
    width: '100%',
  },
  editButton: {
    width: 64,
    height: 24,
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
  shareOverlay: {
    flex: 1,
    backgroundColor: '#070707',
    opacity :0.89,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shareContainer: {
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    width: 360,
    height: 76,
    borderTopLeftRadius :8,
    borderTopRightRadius :8,
    paddingTop : 14,
    paddingRight : 20,
    paddingBottom : 14,
    paddingLeft : 20
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shareButton: {
    width: 48,
    height: 48,
    backgroundColor: '#23221F',
    borderRadius: 48,
    justifyContent : 'center',
    alignItems : 'center'
  },
  shareIcon: {
    width : 21,
    height : 'auto',
    padding :0,
    aspectRatio : 0.9
  },
  shareIconFacebook: {
    width : 21,
    height : 21,
    padding :0,
    aspectRatio : 0.5
  },
  infoOverlay: {
    flex: 1,
    backgroundColor: '#070707',
    opacity :0.89,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#1B1A17',
    padding: 20,
    paddingLeft : 40,
    alignItems: 'flex-start',
    width: 280,
    height: 'auto',
    borderRadius: 4,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
  },
  infoButton: {
    width: 64,
    height: 24,
    backgroundColor: '#1B1A17',
    borderColor: '#FF8303',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
});
