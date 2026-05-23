import {Image} from "expo-image";
import {Settings, Plus} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {colors} from "../../assets/theme";
import {ProfileData} from "../data/profiledata";
import {VIDEO_DATA, USER_DATA, SHORTS_DATA} from "../data/videos";
import VideoCard from "../components/VideoCard";
import ShortsCard from "../components/ShortsCard";

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

export default function Profile({navigation}) {
  const CURRENT_USER_ID = 1;

  const currentUser = USER_DATA.find((user) => user.id === CURRENT_USER_ID);

  const userVideos = VIDEO_DATA.filter(
    (video) => video.userId === CURRENT_USER_ID,
  );

  const userShorts = SHORTS_DATA.filter(
    (short) => short.userId === CURRENT_USER_ID,
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.settingButton}
          onPress={() => navigation.navigate("Settings")}>
          <Settings size={20} color={colors.black()} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* PROFILE */}
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: currentUser.avatar,
              }}
              style={styles.profileImage}
              contentFit="cover"
            />
          </View>

          <Text style={styles.name}>{currentUser.name}</Text>

          <Text style={styles.info}>@{currentUser.username}</Text>

          {/* STATS */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {formatNumber(currentUser.blogPosted)}
              </Text>

              <Text style={styles.statLabel}>Posted</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {formatNumber(currentUser.following)}
              </Text>

              <Text style={styles.statLabel}>.....</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {formatNumber(currentUser.subscribers)}
              </Text>

              <Text style={styles.statLabel}>Subscribers</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.addContentButton}
              onPress={() => navigation.navigate("AddContent")}>
              <Plus size={18} color={colors.white()} />

              <Text style={styles.addContentText}>Add Content</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SHORTS */}
        <View style={styles.shortSection}>
          <View style={[styles.sectionHeader, {marginRight: 10}]}>
            <Text style={styles.sectionTitle}>Uploaded Shorts</Text>

            <Text style={styles.sectionCount}>{userShorts.length} Shorts</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shortScroll}>
            {userShorts.map((short) => (
              <ShortsCard
                key={short.id}
                item={short}
                onPress={(selectedShort) => {
                  navigation.navigate("Shorts", {
                    short: selectedShort,
                  });
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.videoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Uploaded Videos</Text>

            <Text style={styles.sectionCount}>{userVideos.length} Videos</Text>
          </View>

          {userVideos.map((video) => (
            <VideoCard
              key={video.id}
              variant="profile"
              video={video}
              user={{
                name: currentUser.name,
                avatar: currentUser.avatar,
              }}
              onPress={(selectedVideo) => {
                navigation.navigate("VideoDetail", {
                  video: selectedVideo,
                  user: currentUser,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
    letterSpacing: -0.5,
  },
  settingButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey(0.08),
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  imageWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: colors.lightGrey(),
  },
  name: {
    marginTop: 14,
    fontSize: 24,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
    letterSpacing: -0.4,
  },
  info: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.6),
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: colors.lightGrey(0.03),
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.5),
  },
  divider: {
    width: 1,
    height: 38,
    backgroundColor: colors.grey(0.12),
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 24,
  },

  addContentButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black(),
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },

  addContentText: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.white(),
  },

  sectionHeader: {
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  sectionCount: {
    fontSize: 13,
    fontFamily: "Pjs-Medium",
    color: colors.grey(0.5),
  },

  /* SHORTS */

  shortSection: {
    marginTop: 40,
    paddingLeft: 10,
  },

  shortScroll: {
    paddingRight: 24,
  },

  videoSection: {
    marginTop: 40,
    paddingHorizontal: 10,
  },
});
