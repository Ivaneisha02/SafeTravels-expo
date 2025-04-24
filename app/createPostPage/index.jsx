import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function CreatePost() {
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [usernameText, setUsernameText] = useState("");
    const [tagText, setTagText] = useState("");
    const [tags, setTags] = useState([]);
    const router = useRouter();

    const postsCollRef = collection(db, "posts");

    const createPost = async () => {
        await addDoc(postsCollRef, {
            image,
            caption,
            username: usernameText, // replace with dynamic username if needed
            tag: tags
        });
        router.push("/homePage");
    };

    const handleAddTag = () => {
        const newTag = tagText.trim().toLowerCase();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
        }
        setTagText('');
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create A Post</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={usernameText}
                    onChangeText={setUsernameText}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Image URL:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter image URL"
                    value={image}
                    onChangeText={setImage}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Caption:</Text>
                <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Write your caption..."
                    value={caption}
                    onChangeText={setCaption}
                    maxLength={300}
                    multiline
                />
            </View>

            {/* Tags input */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Tags:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Add a tag and press enter"
                    value={tagText}
                    onChangeText={setTagText}
                    onSubmitEditing={handleAddTag}
                    returnKeyType="done"
                />

                <View style={styles.tagContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                                <Text style={styles.removeTag}>✖</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text style={styles.buttonText}>Submit Post</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: '#e0f7fa',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    tagText: {
        color: '#007bff',
        marginRight: 6,
    },
    removeTag: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default CreatePost;