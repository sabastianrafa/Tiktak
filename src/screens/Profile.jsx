import { Image } from "expo-image";
import { Settings } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../assets/theme";
import { ProfileData } from "../data/profiledata";

const formatNumber = (number) => {
  if (!number) return "0";
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return number.toString();
};

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color={colors.black()} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE INFO */}
        <View style={styles.profileHeader}>
          <Image
            source={{uri: ProfileData.profilePict}}
            style={profile.pic}
            contentFit="cover"
          />

          <Text style={profile.name}>{ProfileData.name}</Text>
          <Text style={profile.info}>Member since {ProfileData.createdAt}</Text>

          {/* STATS */}
          <View style={profile.statsContainer}>
            <View style={profile.statItem}>
              <Text style={profile.sum}>{ProfileData.blogPosted}</Text>
              <Text style={profile.tag}>Posted</Text>
            </View>

            <View style={profile.statItem}>
              <Text style={profile.sum}>
                {formatNumber(ProfileData.following)}
              </Text>
              <Text style={profile.tag}>Following</Text>
            </View>

            <View style={profile.statItem}>
              <Text style={profile.sum}>
                {formatNumber(ProfileData.follower)}
              </Text>
              <Text style={profile.tag}>Followers</Text>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={profile.buttonEdit}>
            <Text style={profile.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
  },
});

const profile = StyleSheet.create({
  pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    fontSize: 20,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  info: {
    fontSize: 12,
    fontFamily: "Pjs-Regular",
    color: colors.grey(),
  },

  statsContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
  },

  statItem: {
    alignItems: "center",
  },

  sum: {
    fontSize: 16,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },

  tag: {
    fontSize: 12,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.6),
  },

  buttonEdit: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.grey(0.1),
  },

  buttonText: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },
});
