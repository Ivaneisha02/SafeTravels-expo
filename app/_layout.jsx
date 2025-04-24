import { Stack } from "expo-router";

const RootLayout = () => {
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
    <Stack.Screen name="index" options ={{title: 'Welcome Back'}} />
    </Stack>
  );
};

export default RootLayout;