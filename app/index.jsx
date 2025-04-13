import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const initialConversations = [
  { id: '1', name: 'SafeTravels*', message: 'Your itinerary is all set!', image: 'https://media-hosting.imagekit.io/9a75c5ded355431d/Image%204-8-25%20at%208.46%E2%80%AFPM.jpg?Expires=1838767625&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=vSFZpYX0-mDENXzPqYAs2kunoggaOeMcmhthHej7Ij4rrVZRESTfszV5HEaYcVxj4LuQDEvYGZm3LxA6zBjctyxKqE6c7eyiKZV~iIXtKLvM7UUOSVk6bhflF9DERpxd4zj~9mEakhn2yo5OiMdPtc~falQ4eklCRKxUAGtWFQcdKSNzBJkq7GnFcJPy~3dA4AmFXkgQXEX2naLaNOaChAYwNJQUfn3-RGYCMgqFd-ysB5KLf3yBPEmetqmEToHJGGeZKQsgSLHEmLXvjcYP-hIu-QM-uUu6r7URsXAUgy0f3YZNrQGmgebzowfWiIFHuJNwN6UGOlE8uiFZKfjH6w__' },
  { id: '2', name: 'Alice', message: '', image: 'https://i.pinimg.com/736x/8c/d3/b6/8cd3b64201b71480f2414037ac10649c.jpg' },
  { id: '3', name: 'Sean', message: '', image: 'https://i.pinimg.com/736x/41/3a/03/413a037e1b33eff813767771333e267d.jpg' },
  { id: '4', name: 'Claire', message: '', image: 'https://i.pinimg.com/736x/2a/10/94/2a109449c8c673618e36132b22a8eec1.jpg' },
  { id: '5', name: 'Daniel', message: '', image: 'https://i.pinimg.com/736x/fe/d8/8a/fed88ad509c58663b3c169b3cbec3532.jpg' },
  { id: '6', name: 'Eli', message: '', image: 'https://i.pinimg.com/736x/2d/1c/e3/2d1ce394ebf54da182ed84fc85dcc08f.jpg' },
  { id: '7', name: 'Fiona', message: '', image: 'https://i.pinimg.com/736x/16/5d/0c/165d0c8f832908abeef4e976737932df.jpg' },
  { id: '8', name: 'George', message: '', image: 'https://i.pinimg.com/736x/8c/1b/53/8c1b53d5d27ade849fc6e8b1351eb6fc.jpg' },
  { id: '9', name: 'Hannah', message: '', image: 'https://i.pinimg.com/736x/91/f3/50/91f3506f89a21a94dcf605529d8f6e39.jpg' },
  { id: '10', name: 'Ian', message: '', image: 'https://i.pinimg.com/736x/d4/30/c6/d430c67fd7f345bd2696f9fa0f8f2ea0.jpg' },
  { id: '11', name: 'Jenny', message: '', image: 'https://i.pinimg.com/736x/c9/00/53/c90053951007ec4514edd6c418a1af5f.jpg' },
  { id: '12', name: 'Kevin', message: '', image: 'https://i.pinimg.com/736x/73/76/bd/7376bde89a146f737326c767cbaa4df9.jpg' },
  { id: '13', name: 'Leah', message: '', image: 'https://i.pinimg.com/736x/0f/1e/f4/0f1ef49389e2f245c1d730cb9b566c8a.jpg' },
  { id: '14', name: 'Mason', message: '', image: 'https://i.pinimg.com/736x/ec/88/6f/ec886f72f5127cb3fbb57d13a87caab0.jpg' },
  { id: '15', name: 'Nina', message: '', image: 'https://i.pinimg.com/736x/09/c4/50/09c450e5fed8a2e39d6ca003182874d4.jpg' },
  { id: '16', name: 'Oscar', message: '', image: 'https://i.pinimg.com/474x/1a/09/38/1a09384140a005552417fa0345e96cf5.jpg' },
  { id: '17', name: 'Paula', message: '', image: 'https://i.pinimg.com/736x/06/7f/c1/067fc1037e47615d1909786ca705b4f3.jpg' },
  { id: '18', name: 'Quinn', message: '', image: 'https://i.pinimg.com/736x/a3/af/5a/a3af5a6203253aab07cc426e2b3c11fd.jpg' },
  { id: '19', name: 'Rita', message: '', image: 'https://i.pinimg.com/736x/01/e3/7d/01e37da54b54e87807660f5cc8541c56.jpg' },
  { id: '20', name: 'Sam', message: '', image: 'https://i.pinimg.com/736x/84/c9/92/84c992ff09d9ba062b8cf366066546dc.jpg' },
];

const recentTravels = [
  { id: '1', name: 'Zara', image: 'https://i.pinimg.com/736x/9d/ec/4f/9dec4fcf1df59aae302171a4409409e8.jpg' },
  { id: '2', name: 'Maya', image: 'https://i.pinimg.com/736x/5e/2c/e0/5e2ce07b01e6108edd72cbe955445530.jpg' },
  { id: '3', name: 'Leo', image: 'https://i.pinimg.com/736x/32/31/75/3231754b827e66ad6dfaff9077640c87.jpg' },
  { id: '4', name: 'Dani', image: 'https://i.pinimg.com/736x/40/86/d1/4086d1826668bdedb42842eeeb37289d.jpg' },
  { id: '5', name: 'Xander', image: 'https://i.pinimg.com/736x/d6/c6/d4/d6c6d4a62950dfa6cb2c5196efe3035d.jpg' },
  { id: '6', name: 'Lena', image: 'https://i.pinimg.com/736x/3b/63/b1/3b63b1f4d5ee67c32f91e20c74fd49d3.jpg' },
  { id: '7', name: 'Jay', image: 'https://i.pinimg.com/736x/c3/4e/e5/c34ee54dbb6c6ede1d7ccba2290c3c1a.jpg' }, 
  { id: '8', name: 'Tina', image: 'https://i.pinimg.com/736x/f1/34/9e/f1349ed391ec72f68d65793a362b3255.jpg' },
  { id: '9', name: 'Ezra', image: 'https://i.pinimg.com/736x/89/f2/4d/89f24d4cfb52fbe47913fcf4826bbf2c.jpg' },
  { id: '10', name: 'Nova', image: 'https://i.pinimg.com/736x/fc/d9/a3/fcd9a3706f64c9593893f93832a128cb.jpg' },
];

export default function FriendsPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState(initialConversations);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const stored = await AsyncStorage.getItem('conversations');
        if (stored) {
          let parsed = JSON.parse(stored);
          parsed.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
          parsed = parsed.map((c) => {
            const lastMessage = c.messages && c.messages.length > 0 ? c.messages[c.messages.length - 1].text : '';
            return { ...c, message: lastMessage || 'Start a conversation' };
          });
          setConversations(parsed);
        } else {
          const stamped = initialConversations.map((c) => {
            const messages = c.name === 'SafeTravels*'
              ? [{ text: 'Your itinerary is all set!', timestamp: new Date().toISOString() }]
              : [];
            return {
              ...c,
              messages,
              message: messages.length > 0 ? messages[messages.length - 1].text : 'Start a conversation',
              updatedAt: new Date().toISOString(),
            };
          });
          await AsyncStorage.setItem('conversations', JSON.stringify(stamped));
          setConversations(stamped);
        }
      } catch (e) {
        console.log('Error loading conversations:', e);
      }
    };
  
    loadConversations();
  }, []);
  

  const renderRecent = (item) => (
    <TouchableOpacity
  key={item.id}
  style={styles.travelItem}
  onPress={() =>
    router.push({
      pathname: '/friendsPage/story',
      params: { name: item.name, image: item.image },
    })
  }
>
  <Image source={{ uri: item.image }} style={styles.travelImage} />
  <View style={styles.nameWrapper}>
    <Text style={styles.travelName} numberOfLines={2}>
      {item.name}
    </Text>
  </View>
</TouchableOpacity>
  );

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() =>
        router.push({
          pathname: '/friendsPage/chatScreen',
          params: { id: item.id, name: item.name, image: item.image },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.preview} numberOfLines={1}>
          {item.message || 'Start a conversation'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Travels</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recentScroll}
      >
        {recentTravels.map(renderRecent)}
      </ScrollView>

      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recentScroll: {
    paddingTop: 8,
    paddingBottom: 16,
    justifyContent: 'center',  
    alignItems: 'center',
    flexGrow: 1,                
  },
  
  travelItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 70,
    height: 120,
  },
  travelImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
    backgroundColor: '#ddd', 
  },
  travelName: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  nameWrapper: {
    height: 20, 
    justifyContent: 'center',
  },
  listContainer: {
    paddingTop: 8,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
