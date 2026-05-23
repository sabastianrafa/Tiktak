import {Search} from "lucide-react-native";
import {useState} from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {colors} from "../../assets/theme";
import VideoList from "../components/VideoList";
import {useNavigation} from "@react-navigation/native";

const CATEGORIES = ["All", "Music", "Gaming", "Education", "Sports", "Live"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />

      {/* HEADER */}
      <Animated.View style={styles.header}>
        <Text style={styles.title}>TIKTAK</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Search")}>

            <Search
              color={colors.black()}
              size={24}
            />

          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* CATEGORY */}
      <Animated.View style={styles.listCategory}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollPadding}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.85}
                onPress={() => setActiveCategory(cat)}
                style={[category.item, isActive && category.activeItem]}>
                <Text
                  style={[category.title, isActive && category.activeTitle]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* CONTENT */}
      <VideoList activeCategory={activeCategory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
  },

  header: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: colors.white(),
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBtn: {
    padding: 6,
  },

  title: {
    fontSize: 24,
    fontFamily: "Pjs-ExtraBold",
    color: colors.primary(),
    letterSpacing: -1,
  },

  listCategory: {
    paddingBottom: 10,
    paddingTop: 4,
  },

  categoryScrollPadding: {
    paddingHorizontal: 12,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginRight: 10,
  },

  activeItem: {
    backgroundColor: "rgba(255,0,0,0.08)",
  },

  title: {
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
    color: colors.grey(0.7),
  },

  activeTitle: {
    color: colors.primary(),
  },
});