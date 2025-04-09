import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const popularLocations = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1569406829354-eb0cc9e653e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      label: 'Portugal',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1709595601170-5987702951fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      label: 'St. Kitts',
    },
  ];

  const recentlyViewed = [
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1670234069735-a9b32837cee4?w=700',
      label: 'Seychelles',
    },
    {
      id: '4',
      image: 'https://plus.unsplash.com/premium_photo-1670963963921-a2da81ee17c7?w=700',
      label: 'Switzerland',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={32} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search here..."
            style={styles.searchBar}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        <Text style={styles.sectionTitle}>Popular</Text>
        <View style={styles.imageGrid}>
          {popularLocations.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.imageItem}
              onPress={() => handleImageClick(item.image)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.imageLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        <View style={styles.imageGrid}>
          {recentlyViewed.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.imageItem}
              onPress={() => handleImageClick(item.image)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.imageLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigateTo('friendsPage')}><Text style={styles.navItem}>Friends</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('explorePage')}><Text style={styles.navItem}>Explore</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('profilePage')}><Text style={styles.navItem}>Profile</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('interactiveMap')}><Text style={styles.navItem}>Interactive Map</Text></TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageLabel: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Georgia',
    fontWeight: '600',
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navItem: {
    fontSize: 16,
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
