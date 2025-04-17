import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

interface EditModalProps {
  showEdit: boolean;
  onShowEditChange: Dispatch<SetStateAction<boolean>>;
  title: string;
  about: string;
  onTitleChange: Dispatch<SetStateAction<string>>;
  onAboutChange: Dispatch<SetStateAction<string>>;
  handleEditConfirm: () => void;
  onChangeSelectedId: Dispatch<SetStateAction<number | null>>;
}

const EditModal: React.FC<EditModalProps> = ({
  showEdit,
  onShowEditChange,
  title,
  about,
  onTitleChange,
  onAboutChange,
  handleEditConfirm,
  onChangeSelectedId,
}) => {
  return (
    <Modal
      visible={showEdit}
      transparent
      animationType="fade"
      onRequestClose={() => onShowEditChange(false)}
    >
      <View style={styles.editOverlay}>
        <View style={styles.editContainer}>
          <View style={styles.editContainer2}>
            <View>
              <TextInput
                placeholder="Mini Input..."
                placeholderTextColor="#AAA"
                style={styles.inputTitle}
                value={title}
                onChangeText={onTitleChange}
              />
              <TextInput
                placeholder="Max Input..."
                placeholderTextColor="#AAA"
                style={styles.inputAbout}
                value={about}
                onChangeText={onAboutChange}
                multiline
              />
            </View>

            <View>
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    onShowEditChange(false);
                    onTitleChange('');
                    onAboutChange('');
                    onChangeSelectedId(0);
                  }}
                >
                  <Text style={styles.editButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditConfirm}
                >
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
};


export default EditModal

const styles = StyleSheet.create({
  editOverlay: {
    flex: 1,
    backgroundColor: '#070707',
    opacity: 0.89,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editContainer: {
    backgroundColor: '#1B1A17',
    padding: 18,
    alignItems: 'center',
    width: 360,
    height: 451,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  editContainer2: {
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    width: 324,
    height: 415,
    gap: 8
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
    height: 'auto',
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
    gap: 5,
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
})