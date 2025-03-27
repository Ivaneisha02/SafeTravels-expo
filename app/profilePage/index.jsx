import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
    const router = useRouter();
    return (
        <ScrollView>
              <Text>Insert Profile Picture</Text>
        
              <View>
                <Text>First Name</Text>
                <TextInput
                  style={{height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    width: 200,
                    margin: 10,
                  }}
                  placeholder="First Name"
                  
                  />
              </View>
                <View>
                    <Text>Last Name</Text>
                    <TextInput
                    style={{height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: 200,
                        margin: 10,
                    }}
                    placeholder="Last Name"
                    
                    />
                </View>
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
                <Text>Username</Text>
                <TextInput
                  style={{height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    width: 200,
                    margin: 10,
                  }}
                  placeholder="Username"
                  
                  />
              </View>
              <TouchableOpacity
                      style = {styles.button}
                      onPress={() => {
                        router.push("/homePage");
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
});

export default ProfileScreen;