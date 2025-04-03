import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const FriendsScreen = () => {
    const router = useRouter();
    return (
        <ScrollView>
            <Text>Welcome to the Friends Page!</Text>
            <Text>Here you can view and manage your friends.</Text>

            <View style={styles.container}>
                <View style={styles.component1}>
                    <Text>Add Friend</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, margin: 10 }}
                        placeholder="Friend's Email"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            // Add functionality to add a friend
                        }}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.component2}>
                    <Text>Friends List</Text>
                    {/* Here you can map through a list of friends */}
                </View>
            </View>
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
export default FriendsScreen;