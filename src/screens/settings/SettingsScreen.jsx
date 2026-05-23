import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  LogOut,
  Shield,
  User,
} from "lucide-react-native";

import { colors } from "../../../assets/theme";

export default function SettingsScreen({navigation}) {
  const settingMenus = [
    {
      id: 1,
      title: "Edit Profile",
      icon: <User size={20} color={colors.black()} />,
      onPress: () => {
        Alert.alert("Edit Profile");
      },
    },

    {
      id: 2,
      title: "Privacy & Security",
      icon: <Shield size={20} color={colors.black()} />,
      onPress: () => {
        Alert.alert("Privacy & Security");
      },
    },

    {
      id: 3,
      title: "Help Center",
      icon: <CircleHelp size={20} color={colors.black()} />,
      onPress: () => {
        Alert.alert("Help Center");
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={colors.black()} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={{width: 42}} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          {settingMenus.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuLeft}>
                <View style={styles.iconContainer}>{item.icon}</View>

                <Text style={styles.menuText}>{item.title}</Text>
              </View>

              <ChevronRight size={18} color={colors.grey(0.5)} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.logoutButton}
          onPress={() => Alert.alert("Logout")}>
          <LogOut size={18} color="#FF3B30" />

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey(0.08),
  },

  headerTitle: {
    fontSize: 22,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 15,
    fontFamily: "Pjs-SemiBold",
    color: colors.grey(0.6),
  },

  card: {
    borderRadius: 20,
    backgroundColor: colors.lightGrey(0.04),
    overflow: "hidden",
  },

  menuItem: {
    minHeight: 64,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.grey(0.08),
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white(),
  },

  menuText: {
    fontSize: 14,
    fontFamily: "Pjs-Medium",
    color: colors.black(),
  },

  logoutButton: {
    marginTop: 40,
    height: 58,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFECEC",
  },

  logoutText: {
    fontSize: 15,
    fontFamily: "Pjs-SemiBold",
    color: "#FF3B30",
  },
});
