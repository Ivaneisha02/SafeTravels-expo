import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const HomeScreen = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([
      {id: '1', image: 'https://via.placeholder.com/300', text: 'Post One' },
      {id: '2', image: 'https://via.placeholder.com/300', text: 'Post Two' },
      {id: '3', image: 'https://via.placeholder.com/300', text: 'Post Three' },
      {id: '4', image: 'https://via.placeholder.com/300', text: 'Post Four' },
    ]);
    const [columns, setColumns] = useState(2);

    return (
      <View style={styles.container}>
        <FlatList 
        data={posts}
        keyExtractor={(item) => item.id}
        // numColumns={2}
        numColumns={columns}
        columnWrapperStyle={{ justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <View style={styles.postItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.postText}> {item.text}</Text>
          </View>
        )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: '#fff',
    },
    postItem: {
      flex: 1,
      marginBottom: 20,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    postText: {
      marginTop: 6,
      fontSize: 14,
      fontWeight: '500',
      textAlign: "center",
    },
  });

export default HomeScreen;