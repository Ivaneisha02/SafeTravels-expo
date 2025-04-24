import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const posts = [
    {
      id: '1',
      username: 'Collete678',
      image: require('../../assets/images/imaan_PR.jpg'),
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      username: 'Holly123',
      image: require('../../assets/images/ivy_cancun.jpg'),
      timestamp: '4 hours ago',
    },
  ];

const ExploreScreen = () => {
    const router = useRouter();
    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
          <Image 
          source={item.image } 
          style={styles.postImage} />
          <Text>{item.username}</Text>
          <Text>{item.timestamp}</Text>
        </View>
      );
    return (
        <View>

            <View style={styles.container}>
                      
                <View style={styles.component1}> 
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => {
                        router.push("/explorePage");
                    }}>
                <Text>Explore</Text>
                
                </TouchableOpacity>
                </View>
                <View style={styles.component2}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => {
                        router.push("/interactiveMap");
                    }}>
                <Text>Map</Text>
                
                </TouchableOpacity>
                    
                </View>
                <View style={styles.component3}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => {
                        router.push("/explorePage");
                    }}>
                <Text>Posts</Text>
                
                </TouchableOpacity>
                    
                </View>
                      
             </View>
             <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
             

        </View>
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
    component3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5 
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
    postContainer: {
        marginBottom: 20,
        alignItems: 'center',
      },
    postImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
      },
    postText: {
        marginTop: 5,
        fontSize: 16,
      },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
});
export default ExploreScreen;