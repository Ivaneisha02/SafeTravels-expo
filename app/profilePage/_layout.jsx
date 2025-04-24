import { Stack } from "expo-router";

const ProfilePageLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen name="index" options={{ title: 'My Profile' }} />
      <Stack.Screen name="editProfile" options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="addPost" options={{ title: 'New Post' }} />
      <Stack.Screen name="postDetail" options={{ title: 'Post' }} />
    </Stack>
  );
};

export default ProfilePageLayout;