import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const HomeScreen = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([
      {id: '1', image: 'https://via.placeholder.com/300', text: 'Post One' },
      {id: '2', image: 'https://via.placeholder.com/300', text: 'Post Two' },
      {id: '3', image: 'https://via.placeholder.com/300', text: 'Post Three' },
      {id: '4', image: 'https://via.placeholder.com/300', text: 'Post Four' },
    ]);
    const [columns, setColumns] = useState(2);

    return (
      <View style={styles.container}>
        <FlatList 
        data={posts}
        keyExtractor={(item) => item.id}
        // numColumns={2}
        numColumns={columns}
        columnWrapperStyle={{ justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <View style={styles.postItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.postText}> {item.text}</Text>
          </View>
        )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: '#fff',
    },
    postItem: {
      flex: 1,
      marginBottom: 20,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    postText: {
      marginTop: 6,
      fontSize: 14,
      fontWeight: '500',
      textAlign: "center",
    },
  });
  
      
//         <ScrollView>
//             <Text>Popular</Text>
//             <View style={styles.container}>
                      
                
//                       <View style={styles.component1}> 
//                         <Text>Location 1</Text>
//                         <Image
//                           style={{width: 50, height: 50}}
//                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
//                       </View>
//                         <View style={styles.component2}>
//                             <Text>Location 2</Text>
//                             <Image
//                           style={{width: 50, height: 50}}
//                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                            
//                         </View>
                      
//              </View>
//              <View style={styles.container}>
                      
                
//                       <View style={styles.component1}> 
//                         <Text>Location 3</Text>
//                         <Image
//                           style={{width: 50, height: 50}}
//                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
//                       </View>
//                         <View style={styles.component2}>
//                             <Text>Location 4</Text>
//                             <Image
//                           style={{width: 50, height: 50}}
//                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                            
//                         </View>
                      
//              </View>
//              <Text>Recently Viewed</Text>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({  
//     container: {
//         flexDirection: 'row',
//         height: 100,
//         backgroundColor: 'white',
//     },
//     component1: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin:5 
//     },
//     component2: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin:5 
//     },
// });
export default HomeScreen;