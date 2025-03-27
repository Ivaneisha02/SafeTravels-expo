import { Stack } from "expo-router";

const HomePageLayout = () => {
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
        <Stack.Screen name="homePage" options ={{title: 'Home Page'}} />
        </Stack>
    );
};

export default HomePageLayout;