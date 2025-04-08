import { View, Text, FlatList, StyleSheet } from 'react-native';

const friends = [
  { id: '1', name: 'SafeTravels (App)' },
  { id: '2', name: 'Alice' },
  { id: '3', name: 'Bob' },
];

export default function FriendsList() {
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 18 },
});

