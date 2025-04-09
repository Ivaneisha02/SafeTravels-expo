import { Stack } from "expo-router";

const FriendsPageLayout = () => {
    return (
        <Stack
        screenOptions={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'poppins',
            }, 
        }}>
        <Stack.Screen name="friendsPage" options ={{title: 'Friends Page'}} />
        </Stack>
    );
};

export default FriendsPageLayout;
