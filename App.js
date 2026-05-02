import { useFonts } from "expo-font";
import { fontType } from "./assets/theme";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Shorts from "./src/screens/Shorts";
import VideoDetail from "./src/screens/VideoDetail";

export default function App() {
  const [loaded] = useFonts(fontType);

  if (!loaded) return null;

  return <VideoDetail />;
}