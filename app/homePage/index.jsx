import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const HomeScreen = () => {
  const [postLists, setPostList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const postsCollectionRef = collection(db, 'posts');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {postLists.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <TouchableOpacity onPress={() => handleImageClick(post.image)}>
              <Image source={{ uri: post.image }} style={styles.postImage} />
            </TouchableOpacity>
            <Text style={styles.caption}>{post.caption}</Text>
            <Text style={styles.username}>@username</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigateTo('friendsPage')}><Text style={styles.navItem}>Friends</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('explorePage')}><Text style={styles.navItem}>Explore</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('createPostPage')}><Text style={styles.navItem}>Create</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('profilePage')}><Text style={styles.navItem}>Profile</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('interactiveMap')}><Text style={styles.navItem}>Map</Text></TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            )}
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#e1e4e8',
  },
  caption: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  username: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    fontSize: 14,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '90%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
});

export default HomeScreen;