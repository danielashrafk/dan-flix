import { Provider } from "react-redux";
import { store } from "./src/store";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { MainStack, RootStack } from "./src/navigation";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <MainStack />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </Provider>
    </RecoilRoot>
  );
}
