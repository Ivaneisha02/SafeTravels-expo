import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/homePage');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LinearGradient colors={['#f0faff', '#cceeff', '#a6e4ff']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={ styles.logoContainer }>
            <Image 
            source = {require('../../assets/images/st_globe_logo.png') } 
            style={styles.logo} 
            resizeMode="contain" 
            />
            </View>
          <View style={styles.formSection}>
          <Text style={styles.title}>Welcome to Safe Travels!</Text>

          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            placeholderTextColor="#003366"
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            placeholderTextColor="#003366"
          />



<Button title="Sign In" onPress={handleSignIn} />

<Button title="Create an Account" onPress={() => router.push('/auth/signUp')} />

<TouchableOpacity style={styles.googleButton} >
  <Image
    source={require('../../assets/images/g_logo.png')}
    style={styles.googleLogo}
  />
  <Text style={styles.googleButtonText}>Sign in with Google</Text>
</TouchableOpacity>

<Pressable onPress={() => router.push('/auth/forgot-password')}>
  <Text style={styles.linkText}>Forgot your password?</Text>
</Pressable>

          {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 20,
      paddingTop: 60, // 👈 pushes everything up slightly
      alignItems: 'center',
      flexGrow: 1,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 200,  // 👈 bigger
      height: 200,
    },
    formSection: {
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 26,
      marginBottom: 20,
      textAlign: 'center',
      color: '#003366',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 15,
      borderColor: '#003366',
      borderWidth: 1,
      width: '100%',
    },
    error: {
      marginTop: 10,
      color: 'red',
      textAlign: 'center',
    },
    linkText: {
        color: '#003366',
        textAlign: 'right',
        fontSize: 14,
        marginBottom: 20,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        width: '100%',
      },
      
      googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
        width: '100%', // ✅ full width button
      },
      
      googleLogo: {
        width: 40, // ✅ size that looks balanced with text
        height: 32,
        marginRight: 10, // ✅ spacing between logo and text
      },
      
      googleButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      
  });
