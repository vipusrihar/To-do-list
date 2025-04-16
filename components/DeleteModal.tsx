import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'


interface DeleteModalProps {
    showDelete: boolean | undefined;
    onShowDeleteChange: Dispatch<SetStateAction<boolean>>;
    selectedID: number | null;
    deleteToDo: (id: number) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    showDelete,
    onShowDeleteChange,
    selectedID,
    deleteToDo
}) => {
    return (
        <Modal
            visible={showDelete}
            transparent
            animationType="fade"
            onRequestClose={() => onShowDeleteChange(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Delete this task?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedID !== null) deleteToDo(selectedID);
                                onShowDeleteChange(false);
                            }}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => onShowDeleteChange(false)}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#070707',
        opacity: 0.89,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#1B1A17',
        padding: 20,
        borderRadius: 4,
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: '#FF8303',
        width: 281,
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
})