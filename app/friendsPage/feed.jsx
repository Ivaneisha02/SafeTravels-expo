import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const posts = [
  { id: '1', username: 'Alice', url: 'https://i.pinimg.com/736x/08/9d/90/089d906f926e729064c62dee6e376db6.jpg', caption: "Alice's vacation" },
  { id: '2', username: 'Bob', url: 'https://i.pinimg.com/736x/01/1b/16/011b16c3bada1e60a9f07a740d101274.jpg', caption: "Bob's brunch!" },
];

export default function FriendsFeed() {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.username}>{item.username}</Text>
          <Image source={{ uri: item.url }} style={styles.image} />
          <Text>{item.caption}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    padding: 10,
    alignItems: 'left',
    justifyContent: 'left', 
  },
  username: { 
    fontWeight: 'bold', 
    fontSize: 16,
    textAlign: 'left', 
  },
  image: {
    width: '50%', 
    height: 200, 
    borderRadius: 10, 
    marginVertical: 10,
    alignSelf: 'center', 
  },
});
