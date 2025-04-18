import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Todo } from '../type/types';



interface RenderItemProps {
  item: Todo;
  selectedID: number | null;
  handleItemPress: (id: number) => void;
  handleSharePress: (id: number) => void;
  handleInfoPress: (id: number) => void;
  handleEditPress: (id: number) => void;
  handleDelete: (id: number) => void;
  
}

const RenderItem: React.FC<RenderItemProps> = ({
  item,
  selectedID,
  handleItemPress,
  handleEditPress,
  handleInfoPress,
  handleSharePress,
  handleDelete,
 
}) => {
  return (
    <View style={styles.itemContainerBox}>
      <View style={styles.itemContainer}>
        {/* Pressable wraps the todo content */}
        <Pressable onPress={() => handleItemPress(item.id)} style={styles.todoItem}>
          <Text style={[
            styles.todoItem,
            {
              fontSize :22,
              textDecorationLine: item.completed ? 'line-through' : 'none',
              color: item.completed ? 'gray' : '#F0E3CA'
            },
          ]}>
            {item.title}
          </Text>

          <Text style={[
            styles.todoItem,
            {
              textDecorationLine: item.completed ? 'line-through' : 'none',
              color: item.completed ? 'gray' : '#F0E3CA'
            },
          ]}>{item.about}</Text>
        </Pressable>



        {/* Delete button */}
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.closebutton}>
          <Image source={require('../assets/close.png')} style={styles.closeicon} />
        </TouchableOpacity>
      </View>

      {/* Action icons only visible when selected */}
      {selectedID === item.id && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleSharePress(item.id)}>
            <Image source={require('../assets/share.png')} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleInfoPress(item.id)}>
            <Image source={require('../assets/info.png')} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditPress(item.id)}>
            <Image source={require('../assets/edit.png')} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RenderItem;


const styles = StyleSheet.create({
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
    width: '100%',
    padding: 16,
    paddingRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    gap: 5
  }, iconButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A35709',
  },
  closeicon: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#1B1A17',
    borderColor: '#A35709',
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
  closebutton: {
    backgroundColor: '#FF8303',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    
  },
})