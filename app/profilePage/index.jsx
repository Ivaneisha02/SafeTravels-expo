import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const posts = [
  { id: '1', uri: 'https://i.pinimg.com/474x/ea/99/5b/ea995bbea5e7ae1e385ef196a8587277.jpg' },
  { id: '2', uri: 'https://i.pinimg.com/736x/02/ca/b6/02cab6f2c5c4c1cb3c289d7e6d551448.jpg' },
  { id: '3', uri: 'https://i.pinimg.com/736x/5f/f1/eb/5ff1eb843659cba321c5d2d0493d15e6.jpg' },
  { id: '4', uri: 'https://i.pinimg.com/736x/84/ea/cb/84eacb272e6d9c5ff84745ec09ba40ba.jpg' },
  { id: '5', uri: 'https://i.pinimg.com/736x/d8/47/4c/d8474ca5b4b9c68005baea84b1631fc8.jpg' },
  { id: '6', uri: 'https://i.pinimg.com/474x/7d/1c/77/7d1c77dbaf6ac1db4ea723819bb03006.jpg' },
  { id: '7', uri: 'https://i.pinimg.com/474x/33/c7/98/33c7985793ee292b859a711a10e6019e.jpg' },
  { id: '8', uri: 'https://i.pinimg.com/474x/40/b7/4f/40b74f3ebc3e196bdaa4d43bcd76d605.jpg' },
];

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.postImage}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pinimg.com/474x/7e/19/3c/7e193c116229c72d9e01e00ac59734ba.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>@blacktraveler</Text>
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
        <Text style={styles.bioText}>
          ✈️ Traveling the world, one city at a time. Sharing stories, smiles & sunshine 🌍✨
        </Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Grid of Posts */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
      />
    </ScrollView>
  );
};

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
    marginTop: 10,
  },
  postImage: {
    width: 370, // Smaller size
    height: 370,
    margin: 10,
    borderRadius: 10,
  },
});

export default ProfileScreen;
