import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params; // Get the post passed via navigation
  const [comment, setComment] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.uri }} style={styles.postImage} />
      <View style={styles.captionSection}>
        <Text style={styles.captionText}>🌍 Living my best life abroad! #TravelGoals</Text>
      </View>

      <View style={styles.commentSection}>
        <TextInput
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
        />
        <TouchableOpacity style={styles.postButton}>
          <Text style={{ color: 'white' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  captionSection: {
    padding: 16,
  },
  captionText: {
    fontSize: 16,
    color: '#333',
  },
  commentSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  postButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default PostDetailScreen;
