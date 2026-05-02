import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, User } from "lucide-react-native";

import { colors } from "../../assets/theme";
import VideoList from "../components/VideoList";
import CategoryBar from "../components/CategoryBar";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Trending");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>TIKTAK</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Search color={colors.black()} size={24} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <User color={colors.black()} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CATEGORY */}
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* VIDEO */}
      <VideoList activeCategory={activeCategory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white() },

  header: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },

  headerIcons: { flexDirection: "row" },

  title: {
    fontSize: 22,
    fontFamily: "Pjs-ExtraBold",
    color: colors.primary(),
  },
});