import { Stack } from "expo-router";

const CreatePostPageLayout = () => {
    return (
        <Stack
        screenOptions={{
            headerShown: false,
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
        <Stack.Screen name="createPostPage" options ={{title: 'Create a Post'}} />
        </Stack>
    );
};

export default CreatePostPageLayout;