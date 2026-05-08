import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";
import { colors } from "../../assets/theme";

export default function Header({
  onSearchPress,
  onBellPress,
}) {
  return (
    <View style={styles.header}>
      
      <Text style={styles.title}>TIKTAK</Text>

      <View style={styles.headerIcons}>
        <TouchableOpacity style={{marginRight: 15}}>
          <Search color={colors.black()} size={24} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
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
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: "Pjs-ExtraBold",
    color: colors.primary(),
    letterSpacing: -0.5,
  },
});