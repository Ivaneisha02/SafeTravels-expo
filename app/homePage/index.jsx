import { View, Text, StyleSheet, FlatList, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
// import { useRouter } from 'expo-router';
import {useState} from 'react';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
    // const router = useRouter();
    // return (
    const [numColumns, setNumColumns] = useState(2);
    const [posts, setPosts] = useState([
        { id: 1, image:  {uri: 'https://images.unsplash.com/photo-1670234069735-a9b32837cee4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2V5Y2hlbGxlc3xlbnwwfHwwfHx8MA%3D%3D'}, text: 'Content of Post 1' },
        { id: 2, image: {uri: 'https://plus.unsplash.com/premium_photo-1670963963921-a2da81ee17c7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dpdHplcmxhbmQlMjB3aW50ZXJ8ZW58MHx8MHx8fDA%3D'}, text: 'Content of Post 2' },
        { id: 3, image: {uri: 'https://images.unsplash.com/photo-1709595601170-5987702951fd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3QlMjBraXR0c3xlbnwwfHwwfHx8MA%3D%3D'}, text: 'Content of Post 3' },
        { id: 4, image: {uri: 'https://images.unsplash.com/photo-1569406829354-eb0cc9e653e8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}, text: 'Content of Post 4' },
      ]);
    
    const toggleColumns = () => {
      setNumColumns(prev => (prev === 2 ? 1 : 2));
    };

      return(
        <View style={styles.container}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.postImage}>
                <Text>{item.postText}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={item.image}
                />
              </View>
            )}
          />


        </View>
      )
        // <ScrollView>
        //     <Text>Popular</Text>
        //     <View style={styles.container}>
                      
                
        //               <View style={styles.component1}> 
        //                 <Text>Location 1</Text>
        //                 <Image
        //                   style={{width: 50, height: 50}}
        //                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
        //               </View>
        //                 <View style={styles.component2}>
        //                     <Text>Location 2</Text>
        //                     <Image
        //                   style={{width: 50, height: 50}}
        //                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                            
        //                 </View>
                      
        //      </View>
        //      <View style={styles.container}>
                      
                
        //               <View style={styles.component1}> 
        //                 <Text>Location 3</Text>
        //                 <Image
        //                   style={{width: 50, height: 50}}
        //                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
        //               </View>
        //                 <View style={styles.component2}>
        //                     <Text>Location 4</Text>
        //                     <Image
        //                   style={{width: 50, height: 50}}
        //                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                            
        //                 </View>
                      
        //      </View>
        //      <Text>Recently Viewed</Text>
        // </ScrollView>
//     );
};

const styles = StyleSheet.create({  
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
      width: screenWidth / 2 -20,
      margin: 5,
      alighnItems: 'center',
    },
    postImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:5,
        backgrounfColor: 'white',
        borderRadius: 5, 
        
    },
    postText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5, 
        fontSize: 14
    },
});
export default HomeScreen;