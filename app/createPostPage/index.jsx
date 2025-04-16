import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { db } from '../firebaseConfig';

function CreatePost() {
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const router = useRouter();

    const postsCollRef = collection(db, "posts");
    const createPost = async () => {
        await addDoc(postsCollRef, {image, caption});//author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
        router.push("/homePage");
    };
    return(
        <div className="createPostPage">
            <div className="cpContainter">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label> Image:</label>
                    <input type="file" accept="image/*"
                    onChange={(event) => {setImage(event.target.value);}}/>
                </div>
                <div className="inputGp">
                    <label> Caption:</label>
                    <textarea maxLength={300} placeholder="Write your caption..."
                    onChange={(event) => {setCaption(event.target.value);}}/>
                    </div>
                    <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
    
};

const styles = StyleSheet.create({  
    container: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'white',
    },
    component1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5 
    },
    component2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5 
    },
});
export default CreatePost;