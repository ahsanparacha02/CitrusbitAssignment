import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import Albums from "../components/Albums";
import Photos from "../components/Photos";
import ImageModal from "../components/ImageModal";
import Splash from "../components/Splash";
const Stack = createStackNavigator();
export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Albums" component={Albums} />
        <Stack.Screen name="Photos" component={Photos} />
        <Stack.Screen name="ImageModal" component={ImageModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
