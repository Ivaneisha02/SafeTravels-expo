import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function story() {
  const { name, image } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.captionContainer}>
        <Text style={styles.caption}>{name}'s Travel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 2,
  },
  image: {
    width,
    height,
    resizeMode: 'contain',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  caption: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});