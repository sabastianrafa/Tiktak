import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  PlusSquare,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function VideoDetail({ route, navigation }) {
  const video = route?.params?.video;

  // Fallback data yang lebih relevan dengan format YouTube
  const data = video || {
    title: "Cara Membuat Clone UI YouTube dengan React Native",
    views: "125K views",
    date: "2 days ago",
    creator: "React Native Indo",
    subscribers: "1.2M",
    avatar: "https://via.placeholder.com/100", // Placeholder untuk foto profil
    thumbnail: "https://via.placeholder.com/640x360", // Placeholder rasio 16:9
    likes: "12K",
    description:
      "Di video kali ini kita akan membahas cara mendesain UI aplikasi seperti YouTube menggunakan React Native. Jangan lupa like, comment, dan subscribe!",
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* VIDEO PLAYER PLACEHOLDER (16:9) */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: data.thumbnail }} style={styles.videoPlayer} />
        {/* Tombol Back Overlay */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TITLE & VIEWS */}
        <View style={styles.titleSection}>
          <Text style={styles.title} numberOfLines={2}>
            {data.title}
          </Text>
          <Text style={styles.statsText}>
            {data.views} • {data.date}
          </Text>
        </View>

        {/* CHANNEL INFO & SUBSCRIBE */}
        <View style={styles.channelSection}>
          <View style={styles.channelLeft}>
            <Image source={{ uri: data.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.creatorName}>{data.creator}</Text>
              <Text style={styles.subscribers}>{data.subscribers}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        {/* HORIZONTAL ACTION BUTTONS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsScroll}
        >
          {/* Like & Dislike Group */}
          <View style={[styles.actionPill, styles.likeDislikeGroup]}>
            <TouchableOpacity style={styles.likeBtn}>
              <ThumbsUp size={20} color="#000" />
              <Text style={styles.actionText}>{data.likes}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.dislikeBtn}>
              <ThumbsDown size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Share */}
          <TouchableOpacity style={styles.actionPill}>
            <Share2 size={20} color="#000" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          {/* Save/Add */}
          <TouchableOpacity style={styles.actionPill}>
            <PlusSquare size={20} color="#000" />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>

          {/* Download */}
          <TouchableOpacity style={styles.actionPill}>
            <Download size={20} color="#000" />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* DESCRIPTION / COMMENTS PREVIEW SECTION */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionStats}>Comments • 1.4K</Text>
          <Text style={styles.descriptionText} numberOfLines={3}>
            {data.description}
          </Text>
        </View>

        {/* Spacer for bottom */}
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
    backgroundColor: "#0F0F0F", // Hitam khas YouTube modern
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
    gap: 8, // Mengatur jarak antar pill
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
    paddingHorizontal: 0, // Reset padding karena dipisah untuk tombol dalam
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