import { Stack } from "expo-router";

const IntMapLayout = () => {
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
        <Stack.Screen name="mapPage" options ={{title: 'Map Page'}} />
        </Stack>
    );
};

export default IntMapLayout;