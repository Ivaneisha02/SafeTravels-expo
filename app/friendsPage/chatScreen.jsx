// chatScreen.jsx (individual chat screen)
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const { id, name, image } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();
  const flatListRef = useRef(null);

  const storageKey = `chat-${id}`;

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    saveMessages();
    updateConversationPreview();
  }, [messages]);


  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else if (name === 'SafeTravels*') {
        // Inject default message manually if not found
        const defaultMessage = [
          {
            text: 'Your itinerary is all set!',
            timestamp: new Date().toISOString(),
            fromMe: false,
          },
        ];
        setMessages(defaultMessage);
        await AsyncStorage.setItem(storageKey, JSON.stringify(defaultMessage));
      } else {
        setMessages([]);
      }
    } catch (e) {
      console.log('Error loading messages:', e);
    }
  };
  

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (err) {
      console.log('Error saving messages:', err);
    }
  };

  const updateConversationPreview = async (lastMessage) => {
    try {
      const list = await AsyncStorage.getItem('conversations');
      let conversations = list ? JSON.parse(list) : [];
  
      conversations = conversations.map((c) =>
        c.id === id
          ? {
              ...c,
              message: lastMessage.text,
              updatedAt: lastMessage.timestamp,
            }
          : c
      );
  
      await AsyncStorage.setItem('conversations', JSON.stringify(conversations));
    } catch (e) {
      console.log('Error updating preview:', e);
    }
  };    
  
  const handleSend = async () => {
    if (!input.trim()) return;
  
    const message = {
      text: input.trim(),
      timestamp: new Date().toISOString(),
      fromMe: true,
    };
  
    const newMessages = [...messages, message];
    setMessages(newMessages);
    setInput('');
    await saveMessages();
  
    // 🔁 Update preview
    const all = await AsyncStorage.getItem('conversations');
    if (all) {
      const parsed = JSON.parse(all).map((c) => {
        if (c.id === id) {
          return {
            ...c,
            messages: [...(c.messages || []), message],
            message: message.text,
            updatedAt: message.timestamp,
          };
        }
        return c;
      });
      await AsyncStorage.setItem('conversations', JSON.stringify(parsed));
    }
  };  
  
  const renderMessage = ({ item, index }) => (
    <View style={[
      styles.message,
      item.fromUser ? styles.userMessage : styles.friendMessage,
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      {item.fromUser && index === messages.length - 2 && (
        <Text style={styles.seen}>Seen</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.avatar} />
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      <FlatList
  data={messages}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={{ padding: 8, alignSelf: item.fromMe ? 'flex-end' : 'flex-start' }}>
      <Text style={{ backgroundColor: item.fromMe ? '#DCF8C6' : '#eee', padding: 10, borderRadius: 10 }}>
        {item.text}
      </Text>
    </View>
  )}
  ref={flatListRef}
  onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
  onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
/>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputArea}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chatContainer: {
    padding: 16,
    flexGrow: 1,
  },
  message: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  friendMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  messageText: {
    fontSize: 15,
  },
  timestamp: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
  },
  seen: {
    fontSize: 10,
    color: '#007AFF',
    textAlign: 'right',
    marginTop: 2,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
});