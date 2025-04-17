import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        const data = JSON.parse(stored);
        setUsername(data.username || '');
        setBio(data.bio || '');
        setProfileImage(data.profileImage || '');
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      const data = {
        username,
        bio,
        profileImage,
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(data));
      Alert.alert('Success', 'Profile updated!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Could not save profile');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="@yourhandle"
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline
        numberOfLines={3}
        placeholder="Your travel story..."
      />

      <Text style={styles.label}>Profile Image URL</Text>
      <TextInput
        value={profileImage}
        onChangeText={setProfileImage}
        style={styles.input}
        placeholder="https://example.com/photo.jpg"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#007AFF', // Blue like in Add Post
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30, // Oval shape
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
