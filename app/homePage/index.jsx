import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
    const router = useRouter();
    return (
        <ScrollView>
            <Text>Popular</Text>
            <View style={styles.container}>
                      
                
                      <View style={styles.component1}> 
                        <Text>Location 1</Text>
                        <Image
                          style={{width: 50, height: 50}}
                          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                      </View>
                        <View style={styles.component2}>
                            <Text>Location 2</Text>
                            <Image
                          style={{width: 50, height: 50}}
                          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                            
                        </View>
                      
             </View>
             <View style={styles.container}>
                      
                
                      <View style={styles.component1}> 
                        <Text>Location 3</Text>
                        <Image
                          style={{width: 50, height: 50}}
                          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                      </View>
                        <View style={styles.component2}>
                            <Text>Location 4</Text>
                            <Image
                          style={{width: 50, height: 50}}
                          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                            
                        </View>
                      
             </View>
             <Text>Recently Viewed</Text>
        </ScrollView>
    );
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
export default HomeScreen;