import { Text, View, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
const LoginScreen = () =>{
  const router = useRouter();

  return (
    <ScrollView>
      <Text>Welcome back! Please enter your details.</Text>

      <View>
        <Text>Email</Text>
        <TextInput
          style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: 200,
            margin: 10,
          }}
          placeholder="Email"
          
          />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: 200,
            margin: 10,
          }}
          placeholder="Password"
          
          />
      </View>
      <Text>Forgot your password?</Text>
      <Text>Don't have an account? Sign up here!</Text>
  
      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/profilePage");
        }}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#",
    padding: 10,
  },
});

export default LoginScreen;
