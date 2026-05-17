import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// IMPORT: Pastikan SHORTS_DATA diimport ke sini
import { USER_DATA, SHORTS_DATA } from "../data/videos";

const { width, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Shorts() {
  const route = useRoute();
  const flatListRef = useRef(null);

  const tabBarHeight = useBottomTabBarHeight(); 
  const containerHeight = SCREEN_HEIGHT - tabBarHeight;

  // Tangkap parameter navigasi
  const selectedVideo = route?.params?.video;
  const refreshId = route?.params?.refreshId;
  const clickId = route?.params?.clickId; 

  const [shortsData, setShortsData] = useState([]);

  // 1. Fungsi pengacak data berdasarkan SHORTS_DATA
  const generateShuffledData = () => {
    return SHORTS_DATA.map((item) => {
      const user = USER_DATA.find((u) => u.id === item.userId);
      return {
        // Gabungkan id unik agar tidak konflik saat diduplikasi (Infinite Scroll)
        id: `${item.id}-${Math.random().toString(36).substr(2, 9)}`,
        originalId: item.id,
        uri: item.uri,
        title: item.title,
        likes: item.views, // sesuaikan jika ada item.likes
        avatar: user?.avatar,
        username: user?.username || user?.name,
      };
    }).sort(() => Math.random() - 0.5);
  };

  // 2. Efek Utama: Sinkronisasi klik dari Home atau Navbar
  useEffect(() => {
    // Mapping data mentah dari SHORTS_DATA
    const mappedBase = SHORTS_DATA.map((item) => {
      const user = USER_DATA.find((u) => u.id === item.userId);
      return {
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        uri: item.uri,
        title: item.title,
        likes: item.views,
        avatar: user?.avatar,
        username: user?.username || user?.name,
      };
    });

    if (selectedVideo) {
      // SINKRON: Cari berdasarkan originalId yang dikirim dari SHORTS_DATA di beranda
      const targetVideo = mappedBase.find((v) => Number(v.originalId) === Number(selectedVideo.id));
      
      // Ambil sisa video lainnya untuk antrean di bawahnya
      const remainingVideos = mappedBase
        .filter((v) => Number(v.originalId) !== Number(selectedVideo.id))
        .sort(() => Math.random() - 0.5);

      if (targetVideo) {
        // Taruh video pilihan di index 0, diikuti sisa video acak
        setShortsData([targetVideo, ...remainingVideos]);
      } else {
        setShortsData(mappedBase.sort(() => Math.random() - 0.5));
      }
    } else {
      // Jika ditekan lewat navbar bawah murni
      setShortsData(generateShuffledData());
    }

    // Paksa FlatList reset posisi scroll ke paling atas (index 0) secara instan
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }

  }, [selectedVideo, refreshId, clickId]); // clickId memastikan efek ini jalan tiap kali kartu diklik ulang

  // Fungsi muat video tanpa batas
  const loadMoreVideos = () => {
    const newData = generateShuffledData();
    setShortsData((prevData) => [...prevData, ...newData]);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.videoContainer, { height: containerHeight }]}>
        <Image source={{ uri: item.uri }} style={styles.video} />
        <View style={styles.overlay} />

        {/* TEXT CONTENT */}
        <View style={styles.textOverlay}>
          <View style={styles.userContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>@{item.username}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.title}
          </Text>
        </View>

        {/* SIDEBAR ACTIONS */}
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart" size={34} color="white" />
            <Text style={styles.actionText}>{formatViews(item.likes)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble" size={30} color="white" />
            <Text style={styles.actionText}>432</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social" size={30} color="white" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={flatListRef}
        data={shortsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: containerHeight,
          offset: containerHeight * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        snapToInterval={containerHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const formatViews = (num) => {
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + " jt";
  if (num >= 1000) return (num / 1000).toFixed(0) + " rb";
  return num;
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "black" },
  videoContainer: { width: width, position: "relative" },
  video: { ...StyleSheet.absoluteFillObject, resizeMode: "cover" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },
  textOverlay: { position: "absolute", left: 16, right: 80, bottom: 25, zIndex: 10 },
  userContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, borderWidth: 1.5, borderColor: "white" },
  username: { color: "white", fontSize: 15, fontWeight: "700" },
  description: { color: "white", fontSize: 14, lineHeight: 20 },
  sidebar: { position: "absolute", right: 16, bottom: 35, alignItems: "center", zIndex: 10 },
  actionButton: { alignItems: "center", marginBottom: 20 },
  actionText: { color: "white", fontSize: 12, marginTop: 4, fontWeight: "600" },
});