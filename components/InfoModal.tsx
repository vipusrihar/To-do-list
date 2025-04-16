import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Todo } from '../type/types';


interface InfoModalProps {
    showInfo: boolean | undefined;
    onShowInfoChange: Dispatch<SetStateAction<boolean>>;
    selectedID: number | null;
    todos: Todo[]
}

const InfoModal: React.FC<InfoModalProps> = (
    {
        showInfo,
        onShowInfoChange,
        selectedID,
        todos
    }) => {

    const selectedTodo = todos.find((t) => t.id === selectedID);

    return (

        <Modal
            visible={showInfo}
            transparent
            animationType="fade"
            onRequestClose={() => onShowInfoChange(false)}
        >
            <View style={styles.infoOverlay}>
                <View style={styles.infoContainer}>

                    {selectedTodo && (
                        <>
                            <Text style={styles.infoText}>Task : {selectedTodo.title}</Text>
                            <Text style={styles.infoText}>About : {selectedTodo.about}</Text>
                            <Text style={styles.infoText}>
                                Created at: {new Date(selectedTodo.created || 0).toLocaleString()}
                            </Text>
                        </>
                    )}

                    <TouchableOpacity onPress={() => onShowInfoChange(false)} style={styles.infoButton}>
                        <Text style={styles.infoButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default InfoModal

const styles = StyleSheet.create({


    infoOverlay: {
        flex: 1,
        backgroundColor: '#070707',
        opacity: 0.89,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    infoContainer: {
        backgroundColor: '#1B1A17',
        padding: 20,
        paddingLeft: 40,
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
})