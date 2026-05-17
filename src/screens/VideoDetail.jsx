import React from "react";

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {useNavigation} from "@react-navigation/native";

import {ThumbsDown, ThumbsUp} from "lucide-react-native";

import {SafeAreaView} from "react-native-safe-area-context";

import {colors} from "../../assets/theme";

import {USER_DATA, VIDEO_DATA} from "../data/videos";

import VideoCard from "../components/VideoCard";

const {width} = Dimensions.get("window");

// FORMAT NUMBER
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + " jt";

  if (num >= 1000) return (num / 1000).toFixed(0) + " rb";

  return num;
};

export default function VideoDetail({route}) {
  const navigation = useNavigation();

  const video = route?.params?.video || {};

  const user = USER_DATA.find((item) => item.id === video.userId);

  // RELATED VIDEOS
  const sameCategoryVideos = VIDEO_DATA.filter(
    (item) =>
      item.category === video.category &&
      item.id !== video.id,
  );

  const otherVideos = VIDEO_DATA.filter(
    (item) =>
      item.category !== video.category &&
      item.id !== video.id,
  );

  const relatedVideos = [
    ...sameCategoryVideos,
    ...otherVideos,
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* VIDEO */}
      <View style={styles.videoContainer}>
        <Image source={{uri: video?.uri}} style={styles.videoPlayer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{video?.title}</Text>

          <Text style={styles.statsText}>
            {formatNumber(video?.views)} ditonton • {video?.uploadAt}
          </Text>
        </View>

        {/* CHANNEL */}
        <View style={styles.channelSection}>
          <View style={styles.channelLeft}>
            <Image
              source={{
                uri: user?.avatar,
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.creatorName}>{user?.name}</Text>

              <Text style={styles.subscribers}>
                {formatNumber(user?.subscribers)} subscriber
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        {/* RELATED VIDEOS */}
        <View>
          {relatedVideos.map((item) => {
            const relatedUser = USER_DATA.find(
              (user) => user.id === item.userId,
            );

            return (
              <VideoCard
                key={item.id}
                video={item}
                user={relatedUser}
                onPress={(selectedVideo) =>
                  navigation.push("VideoDetail", {
                    video: selectedVideo,
                  })
                }
              />
            );
          })}
        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },

  videoContainer: {
    width: width,
    aspectRatio: 16 / 9,
    backgroundColor: colors.black(),
  },

  videoPlayer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  titleSection: {
    padding: 16,
    paddingBottom: 15,
  },

  title: {
    fontSize: 18,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
    lineHeight: 26,
  },

  statsText: {
    fontSize: 13,
    color: colors.darkGrey(),
    marginTop: 6,
    fontFamily: "Pjs-Regular",
  },

  channelSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.lightGrey(),
    marginBottom: 12,
  },

  channelLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  creatorName: {
    fontSize: 15,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },

  subscribers: {
    fontSize: 12,
    color: colors.darkGrey(),
    marginTop: 2,
    fontFamily: "Pjs-Regular",
  },

  subscribeBtn: {
    backgroundColor: colors.black(),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  subscribeText: {
    color: colors.white(),
    fontFamily: "Pjs-SemiBold",
    fontSize: 14,
  },
});
