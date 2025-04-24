import { Stack } from "expo-router";

const ExplorePageLayout = () => {
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
        <Stack.Screen name="friendsPage" options ={{title: 'Friends Page'}} />
        </Stack>
    );
};

export default ExplorePageLayout;