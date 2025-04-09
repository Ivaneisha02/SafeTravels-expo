import { Stack } from "expo-router";

const ProfilePageLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff', // Clean white background
                    shadowColor: 'transparent', // Remove shadow on iOS
                    elevation: 0, // Remove shadow on Android
                },
                headerTintColor: '#111', // Dark text/icons
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 20,
                    fontFamily: 'poppins',
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: 'My Profile' }} // This title will show in the header
            />
        </Stack>
    );
};

export default ProfilePageLayout;
