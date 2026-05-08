import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { fontType } from "./assets/theme";
import Router from "./src/navigation/Router";

export default function App() {
  const [loaded] = useFonts(fontType);
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
