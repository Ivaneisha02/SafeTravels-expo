import { Stack } from "expo-router";

const ProfilePageLayout = () => {
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
        <Stack.Screen name="profilePage" options ={{title: 'Profile Page'}} />
        </Stack>
    );
};

export default ProfilePageLayout;