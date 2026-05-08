import { Search, User } from "lucide-react-native";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../assets/theme";
import CategoryBar from "../components/CategoryBar";
import VideoList from "../components/VideoList";
import Header from "../components/Header";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Trending");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />

      <Header />

      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <VideoList activeCategory={activeCategory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white()},
});