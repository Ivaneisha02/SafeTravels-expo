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
      
      <View style={styles.container}>
           <View style={styles.component1}>
            <Text>Remember Me</Text>
          </View>
          <View style={styles.component2}> 
            <Text>Forgot your password?</Text>
          </View>
               
                      
      </View>
      
  
      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/profilePage");
        }}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/profilePage");
        }}>
        <Text>Sign In With Google</Text>
      </TouchableOpacity>

      <Text>Don't have an account? Sign up for free!</Text>

      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/homePage");
        }}>
        <Text>Goes to home page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/profilePage");
        }}>
        <Text>Goes to profile page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/friendsPage");
        }}>
        <Text>Goes to friends page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/explorePage");
        }}>
        <Text>Goes to explore page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          router.push("/interactiveMap");
        }}>
        <Text>Goes to map page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10, 
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

export default LoginScreen;
