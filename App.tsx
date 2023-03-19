import { ThemeProvider } from "styled-components/native";
import FlashMessage from "react-native-flash-message";
import { AppProvider } from "./src/hooks";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import theme from "@theme/index";
import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>{fontsLoaded ? <Routes /> : <Loading />}</AppProvider>
      <FlashMessage position="top" />
    </ThemeProvider>
  );
}
