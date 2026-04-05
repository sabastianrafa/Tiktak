import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Search } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import VideoList from './src/components/VideoList';
import { useFonts } from 'expo-font';

const CATEGORIES = ["Trending", "Music", "Gaming", "Education", "Sports", "Live"];

export default function App() {
  const [loaded] = useFonts(fontType);

  const [activeCategory, setActiveCategory] = useState("Trending"); // penerapan state

  if (!loaded) return null;

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
          <TouchableOpacity>
            <Bell color={colors.black()} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CATEGORY BAR */}
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

      {/* penerapan props activeCategory untuk VideoList */}
      <VideoList activeCategory={activeCategory} /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white() },
  header: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: colors.white(),
  },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  title: {
    fontSize: 22,
    fontFamily: 'Pjs-ExtraBold',
    color: colors.primary(),
    letterSpacing: -0.5,
  },
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
    fontFamily: 'Pjs-SemiBold',
    fontSize: 14,
    color: colors.grey(0.8),
  },
});