// components/SearchBar.jsx
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ArrowLeft, Plus, Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../assets/theme";

export default function SearchBar({ searchPhrase, setSearchPhrase }) {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false, // Wajib false untuk layout properties seperti padding/gap
    }).start();
  }, [animation]);

  // Interpolasi untuk animasi padding horizontal wadah utama guna menggantikan animasi 'gap'
  // karena menganimasikan properti 'gap' secara langsung sering tidak didukung di beberapa versi React Native
  const animatedPadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
  });

  return (
    <Animated.View style={[styles.container, { paddingLeft: animatedPadding }]}>
      
      {/* TOMBOL KEMBALI */}
      <Animated.View
        style={{
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 1.2, 1],
              }),
            },
          ],
        }}
      >
        <Pressable 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
        >
          <ArrowLeft color={colors.grey(0.6)} size={24} />
        </Pressable>
      </Animated.View>

      {/* KOTAK INPUT */}
      <View style={styles.bar}>
        <Search size={18} color={colors.grey(0.5)} />

        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={colors.grey(0.5)}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          autoFocus
        />

        {searchPhrase?.length > 0 && (
          <Pressable onPress={() => setSearchPhrase("")} style={styles.clearBtn}>
            <Plus
              size={18}
              color={colors.black()}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  backBtn: {
    paddingRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F2F2F2", 
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 10,
    fontFamily: "Pjs-Medium",
    color: colors.black(),
  },
  clearBtn: {
    padding: 4,
  },
});
