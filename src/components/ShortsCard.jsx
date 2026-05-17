import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/theme";

const formatNumber = (num) => {
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + " jt";
  if (num >= 1000) return (num / 1000).toFixed(0) + " rb";
  return num;
};

export default function ShortsCard({ item, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      // DIUBAH: Tambahkan clickId secara instan saat tombol di-klik
      onPress={() => 
        onPress({
          ...item,
          clickId: Date.now() // Menghasilkan trigger waktu unik setiap kali kartu ditekan
        })
      }
    >
      {/* IMAGE */}
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.image}
      />

      {/* DARK OVERLAY */}
      <View style={styles.overlay} />

      {/* TEXT */}
      <View style={styles.textOverlay}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.views}>{formatNumber(item.views)} ditonton</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: colors.black(),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  title: {
    fontSize: 13,
    color: colors.white(),
    fontFamily: "Pjs-SemiBold",
    lineHeight: 18,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
  views: {
    marginTop: 4,
    fontSize: 10,
    color: colors.white(),
    opacity: 0.9,
    fontFamily: "Pjs-Regular",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
});