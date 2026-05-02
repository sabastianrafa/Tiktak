import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../assets/theme";

const CATEGORIES = ["Trending", "Music", "Gaming", "Education", "Sports", "Live"];

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <View style={styles.listCategory}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        >
            {CATEGORIES.map((cat) => (
            <TouchableOpacity 
                key={cat}
                onPress={() => setActiveCategory(cat)} // state untuk interaksi aktivasi kategori
                style={[
                category.item,
                activeCategory === cat && { backgroundColor: colors.light() } // stste untuk ubah tampilan kategori
                ]}
            >
                <Text style={[
                category.title,
                activeCategory === cat && { color: colors.primary() }
                ]}>
                {cat}
                </Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listCategory: { paddingVertical: 12 },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGrey(),
    marginRight: 8,
  },
  title: {
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
    color: colors.grey(0.8),
  },
});