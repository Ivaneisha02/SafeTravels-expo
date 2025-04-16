import { Stack } from "expo-router";

const HomePageLayout = () => {
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
        </Stack>
    );
};

export default HomePageLayout;