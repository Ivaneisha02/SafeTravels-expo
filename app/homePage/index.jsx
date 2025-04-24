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
  TextInput, // Added this
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const HomeScreen = () => {
  const [postLists, setPostList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // for search results
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const postsCollectionRef = collection(db, 'posts');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(posts);
      setFilteredPosts(posts); // initialize filtered
    };
    getPosts();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const lowerText = text.toLowerCase();
  
    const filtered = postLists.filter((post) => {
      const captionMatch = post.caption?.toLowerCase().includes(lowerText);
      const tagMatch = post.tag?.some((tag) => tag.toLowerCase().includes(lowerText));
      return captionMatch || tagMatch;
    });
  
    setFilteredPosts(filtered);
  };
  

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
        {/* 🔍 Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search captions..."
          value={searchText}
          onChangeText={handleSearch}
        />

        {filteredPosts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <TouchableOpacity onPress={() => handleImageClick(post.image)}>
              <Image source={{ uri: post.image }} style={styles.postImage} />
            </TouchableOpacity>
            <Text style={styles.caption}>{post.caption}</Text>
            <Text style={styles.username}>@{post.username}</Text>
            {post.tag && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
            {post.tag.map((tag, idx) => (
              <Text
                key={idx}
                style={{
                  backgroundColor: '#e0f7fa',
                  color: '#007bff',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: 6,
                  marginBottom: 6,
                  borderRadius: 12,
                  fontSize: 12,
                }}
              >
                #{tag}
              </Text>
            ))}
          </View>
        )}
          </View>
        ))}
           

      </ScrollView>

      {/* ⬇ Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigateTo('friendsPage')}><Text style={styles.navItem}>Friends</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('profilePage')}><Text style={styles.navItem}>Profile</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('interactiveMap')}><Text style={styles.navItem}>Map</Text></TouchableOpacity>
      </View>

      {/* 🔍 Image Modal */}
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
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
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