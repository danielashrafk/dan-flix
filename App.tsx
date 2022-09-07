import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src";
import { State } from "./src/reducers";
import React, { useMemo, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MovieData } from "./src/components/MovieData";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export type RootStackParams = {
  HomeScreen: {
    reference: any;
  };
  MovieScreen: {
    id: string;
  };
};
const RootStack = createNativeStackNavigator<RootStackParams>();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  // const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeScreen"
          >
            <RootStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              initialParams={
                {
                  // reference: sheetRef,
                }
              }
            />
            {/* <RootStack.Screen name="MovieScreen" component={MovieScreen} /> */}
          </RootStack.Navigator>

          {/* {showMovie && <MovieData movies={[]} setShowMovie={setShowMovie} />} */}
          {/* {showMovie && (
            <BottomSheetModal
              ref={sheetRef}
              snapPoints={snapPoints}
              children={BottomSheetModal}
            />
          )} */}
        </BottomSheetModalProvider>
      </Provider>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
