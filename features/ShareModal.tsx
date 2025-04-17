import { View, Text ,Modal, TouchableOpacity , Image, StyleSheet} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { Dispatch, SetStateAction } from 'react'


interface ShareModalProps {
    showShare : boolean | undefined;
    onShowShareChange : Dispatch<SetStateAction<boolean>>;
    shareTask: (platform: string, id: number | null) => void;
    selectedID: number | null;
}
  


const ShareModal : React.FC<ShareModalProps> = ({
    showShare,
    onShowShareChange,
    shareTask,
    selectedID ,
  }) => {
  return (
      <Modal
        visible={showShare}
        transparent
        animationType="fade"
        onRequestClose={() =>onShowShareChange(false)}
      >
        <View style={styles.shareOverlay}>
          <View style={styles.shareContainer}>
            <View style={styles.shareButtons}>
              <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('clipboard', selectedID)}>
                <Image style={styles.shareIcon} source={require('../assets/copy.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('vk', selectedID)}>
                <Image style={styles.shareIcon} source={require('../assets/vk.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('telegram', selectedID)}>
                <Image style={styles.shareIcon} source={require('../assets/telegram.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('whatsapp', selectedID)}>
                <Image style={styles.shareIcon} source={require('../assets/whatsapp.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton} onPress={() => shareTask('facebook', selectedID)}>
                <Image style={styles.shareIconFacebook} source={require('../assets/facebook.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default ShareModal


const styles = StyleSheet.create({
    shareOverlay: {
        flex: 1,
        backgroundColor: '#070707',
        opacity: 0.89,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      shareContainer: {
        backgroundColor: '#1B1A17',
        alignItems: 'center',
        width: 360,
        height: 76,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingTop: 14,
        paddingRight: 20,
        paddingBottom: 14,
        paddingLeft: 20
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
        justifyContent: 'center',
        alignItems: 'center'
      },
      shareIcon: {
        width: 21,
        height: 'auto',
        padding: 0,
        aspectRatio: 0.9
      },
      shareIconFacebook: {
        width: 21,
        height: 21,
        padding: 0,
        aspectRatio: 0.5
      },
})