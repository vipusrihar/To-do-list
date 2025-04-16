import { Alert, Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export const shareTask = async (
  platform: string,
  selectedId: number | null,
  todos: any[],
  setShowShare: (val: boolean) => void
) => {
  try {
    const foundTask = todos.find((task: any) => task.id === selectedId);

    if (!foundTask) {
      Alert.alert("Task not found");
      return;
    }

    const text = `Task: ${foundTask.title}\n Description: ${foundTask.about}`;

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
