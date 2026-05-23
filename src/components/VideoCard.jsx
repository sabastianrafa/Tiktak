import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../assets/theme";

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + " jt";

  if (num >= 1000) return (num / 1000).toFixed(0) + " rb";

  return num;
};

export default function VideoCard({video, user, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress(video)}>
      <Image source={{uri: video.uri}} style={styles.thumbnail} />

      <View style={styles.infoRow}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>

          <Text style={styles.meta}>
            {user.name} · {formatNumber(video.views)} ditonton ·{" "}
            {video.uploadAt}
          </Text>
        </View>

        <Text style={styles.menu}>⋮</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingBottom: 20,
    width: "100%",
  },

  thumbnail: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
    backgroundColor: colors.black(),
  },

  infoRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  title: {
    fontSize: 15,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
    lineHeight: 22,
  },

  meta: {
    fontSize: 12,
    fontFamily: "Pjs-Medium",
    color: colors.grey(0.7),
    marginTop: 2,
  },

  menu: {
    fontSize: 20,
    color: colors.black(),
  },
});
