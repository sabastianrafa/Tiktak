import { Search } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../assets/theme";
import VideoList from "../components/VideoList";

const CATEGORIES = ["All", "Music", "Gaming", "Education", "Sports", "Live"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>TIKTAK</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Search color={colors.black()} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Kategori Bar */}
      <View style={styles.listCategory}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollPadding}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity 
                key={cat}
                activeOpacity={0.8}
                onPress={() => setActiveCategory(cat)}
                style={[
                  category.item,
                  isActive && { backgroundColor: colors.light() }
                ]}
              >
                <Text style={[
                  category.title,
                  isActive && { color: colors.primary() }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Daftar Konten Utama */}
      <VideoList activeCategory={activeCategory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: colors.white() 
  },
  header: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.white(),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: "Pjs-ExtraBold",
    color: colors.primary(),
    letterSpacing: -0.5,
  },
  listCategory: { 
    paddingBottom: 10,
    marginTop: 10
  },
  categoryScrollPadding: { 
    paddingHorizontal: 10
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: 10,
  },
  title: {
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
    color: colors.grey(0.7),
  },
});