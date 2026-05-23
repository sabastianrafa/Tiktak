import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import { colors } from "../../assets/theme";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingLeft: 1,
    paddingRight: 14,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: colors.light(),
  }
});