import { HomeScreen } from "./src/screens/homescreen";
import { Provider } from "react-redux";
import { store } from "./src/store";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RootStack, RootStackParams } from "./src/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeScreen"
          >
            <RootStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              initialParams={{}}
            />
          </RootStack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </Provider>
  );
}
