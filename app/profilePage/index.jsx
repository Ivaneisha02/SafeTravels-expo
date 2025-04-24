export const meta = {
  title: 'My Profile',
};

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const defaultPosts = [
  { id: '1', uri: 'https://i.pinimg.com/474x/ea/99/5b/ea995bbea5e7ae1e385ef196a8587277.jpg' },
  { id: '2', uri: 'https://i.pinimg.com/736x/02/ca/b6/02cab6f2c5c4c1cb3c289d7e6d551448.jpg' },
  { id: '3', uri: 'https://i.pinimg.com/736x/5f/f1/eb/5ff1eb843659cba321c5d2d0493d15e6.jpg' },
  { id: '4', uri: 'https://i.pinimg.com/736x/84/ea/cb/84eacb272e6d9c5ff84745ec09ba40ba.jpg' },
  { id: '5', uri: 'https://i.pinimg.com/736x/d8/47/4c/d8474ca5b4b9c68005baea84b1631fc8.jpg' },
  { id: '6', uri: 'https://i.pinimg.com/474x/7d/1c/77/7d1c77dbaf6ac1db4ea723819bb03006.jpg' },
  { id: '7', uri: 'https://i.pinimg.com/474x/33/c7/98/33c7985793ee292b859a711a10e6019e.jpg' },
  { id: '8', uri: 'https://i.pinimg.com/474x/40/b7/4f/40b74f3ebc3e196bdaa4d43bcd76d605.jpg' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [savedPosts, setSavedPosts] = useState([]);

  const [profile, setProfile] = useState({
    username: '@blacktraveler',
    bio: '✈️ Traveling the world, one city at a time. Sharing stories, smiles & sunshine 🌍✨',
    profileImage: 'https://i.pinimg.com/474x/7e/19/3c/7e193c116229c72d9e01e00ac59734ba.jpg',
  });

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const storedPosts = await AsyncStorage.getItem('userPosts');
          const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
          setSavedPosts(userPosts);

          const storedProfile = await AsyncStorage.getItem('userProfile');
          if (storedProfile) {
            const data = JSON.parse(storedProfile);
            setProfile({
              username: data.username || '@blacktraveler',
              bio: data.bio || '✈️ Traveling the world, one city at a time. Sharing stories, smiles & sunshine 🌍✨',
              profileImage: data.profileImage || 'https://i.pinimg.com/474x/7e/19/3c/7e193c116229c72d9e01e00ac59734ba.jpg',
            });
          }
        } catch (err) {
          console.log('Error loading data:', err);
        }
      };
      loadData();
    }, [])
  );

  const deletePost = async (postId) => {
    try {
      const stored = await AsyncStorage.getItem('userPosts');
      const posts = stored ? JSON.parse(stored) : [];
      const filtered = posts.filter((p) => p.id !== postId);
      await AsyncStorage.setItem('userPosts', JSON.stringify(filtered));
      setSavedPosts(filtered);
    } catch (err) {
      console.log('Error deleting post:', err);
    }
  };

  const combinedPosts = [
    ...savedPosts.map((p) => ({ ...p, isUser: true })),
    ...defaultPosts.map((p) => ({ ...p, isUser: false })),
  ];

  const renderItem = ({ item }) => (
    <View style={styles.postWrapper}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/profilePage/postDetail',
            params: { uri: item.uri, caption: item.caption || '' },
          })
        }
      >
        <Image source={{ uri: item.uri }} style={styles.postImage} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.trashIcon}
        onPress={item.isUser ? () => deletePost(item.id) : null}
        activeOpacity={item.isUser ? 0.7 : 1}
      >
        <Ionicons name="trash-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.profileSection}>
      <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
      <Text style={styles.username}>{profile.username}</Text>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>350</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>180</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <Text style={styles.bioText}>{profile.bio}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push('/profilePage/editProfile')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={combinedPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={renderHeader}
      />

      {/* Floating "+" button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/profilePage/addPost')}
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
  },
  bioText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  editButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  grid: {
    paddingHorizontal: 4,
    paddingBottom: 100,
  },
  postWrapper: {
    position: 'relative',
    margin: 4,
  },
  postImage: {
    width: (screenWidth - 48) / 4,
    height: (screenWidth - 48) / 4,
    borderRadius: 8,
  },
  trashIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 4,
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
});