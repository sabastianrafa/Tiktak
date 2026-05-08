import React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function VideoDetail({ route }) {
  const video = route?.params?.video || {};

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Thumbnail */}
      <View style={styles.videoContainer}>
        <Image
          source={{ uri: video?.uri }}
          style={styles.videoPlayer}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{video?.title}</Text>
          <Text style={styles.statsText}>
            {video?.views} views • {video?.uploadedAt}
          </Text>
        </View>

        {/* Channel Section */}
        <View style={styles.channelSection}>
          <View style={styles.channelLeft}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.creatorName}>{video?.channel}</Text>
              <Text style={styles.subscribers}>{video?.category}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsScroll}
        >
          <View style={[styles.actionPill, styles.likeDislikeGroup]}>
            <TouchableOpacity style={styles.likeBtn}>
              <ThumbsUp size={20} color="#000" />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.dislikeBtn}>
              <ThumbsDown size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {/* Anda bisa menambahkan Action Pill lainnya di sini nanti (Share, Save, dll) */}
        </ScrollView>

        {/* Description Box (Komponen yang sebelumnya tidak terender) */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionStats}>
            {video?.views} views • {video?.uploadedAt}
          </Text>
          <Text style={styles.descriptionText}>
            {video?.description || "Tidak ada deskripsi tersedia untuk video ini."}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Video Section
  videoContainer: {
    width: width,
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    position: "relative",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },

  // Title Section
  titleSection: {
    padding: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F0F",
    marginBottom: 8,
    lineHeight: 24,
  },
  statsText: {
    fontSize: 13,
    color: "#606060",
  },

  // Channel Section
  channelSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  channelLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  creatorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F0F0F",
  },
  subscribers: {
    fontSize: 12,
    color: "#606060",
    marginTop: 2,
  },
  subscribeBtn: {
    backgroundColor: "#0F0F0F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  subscribeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // Action Buttons Section
  actionsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
    flexDirection: "row", // Menjamin tombol tersusun horizontal
  },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  likeDislikeGroup: {
    paddingHorizontal: 0,
  },
  likeBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 12,
  },
  dislikeBtn: {
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 16,
  },
  separator: {
    width: 1,
    height: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#0F0F0F",
  },

  // Description / Comment Box
  descriptionBox: {
    marginHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    padding: 12,
  },
  descriptionStats: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F0F0F",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#0F0F0F",
  },
});