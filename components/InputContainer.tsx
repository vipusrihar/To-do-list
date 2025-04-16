import React, { Dispatch, SetStateAction } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

interface InputContainerProps {
  title: string;
  about: string;
  onTitleChange: Dispatch<SetStateAction<string>>;
  onAboutChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

const InputContainer: React.FC<InputContainerProps> = ({
  title,
  about,
  onTitleChange,
  onAboutChange,
  onSubmit,
}) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title..."
          placeholderTextColor="#AAA"
          style={styles.input}
          value={title}
          onChangeText={onTitleChange}
        />
        <TextInput
          placeholder="About..."
          placeholderTextColor="#F0E3CAA3"
          style={styles.input}
          value={about}
          onChangeText={onAboutChange}
        />
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={!title.trim()}
        style={styles.button}
      >
        <Image source={require('../assets/plus.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default InputContainer;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
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
    width: 265,
    fontFamily: 'Roboto',
    marginBottom: 4,
    height: 32,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderColor: '#FF8303',
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 2,
  },
});
