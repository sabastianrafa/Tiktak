import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { colors, fontType } from "../../assets/theme";

const SHORTS_DATA = [
  { id: 1, title: "Nature Vibes 🌿", views: "1,2 jt", uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
  { id: 2, title: "City Night 🌃", views: "890 rb", uri: "https://images.unsplash.com/photo-1494783367193-149034c05e8f" },
  { id: 3, title: "Gaming Setup 🎮", views: "2 jt", uri: "https://images.unsplash.com/photo-1511512578047-dfb367046420" },
  { id: 4, title: "Sneaker Style 👟", views: "500 rb", uri: "https://images.unsplash.com/photo-1527090526205-beaac8dc3c62" },
];

const VIDEO_DATA = [
  { id: 1, title: "How to use Redux in ReactJS", meta: "Channel Tech • 120 rb ditonton • 2 hari lalu", uri: "https://images.unsplash.com/photo-1555066931-4365d14bab8c" },
  { id: 2, title: "Boosting Traffic with SEO", meta: "SEO Master • 89 rb ditonton • 1 minggu lalu", uri: "https://images.unsplash.com/photo-1477013743164-ffc3a5e556da" },
];

export default function VideoList() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* VIDEO ATAS */}
      <View style={videos.list}>
        {VIDEO_DATA.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </View>

      {/* SECTION SHORTS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shorts</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={shorts.scrollContainer}
      >
        {SHORTS_DATA.map((item) => (
          <TouchableOpacity key={item.id} style={shorts.card}>
            <Image source={{ uri: item.uri }} style={shorts.image} />
            <View style={shorts.textOverlay}>
              <Text style={shorts.title} numberOfLines={2}>{item.title}</Text>
              <Text style={shorts.views}>{item.views} ditonton</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* VIDEO BAWAH */}
      <View style={[videos.list, { marginTop: 25 }]}>
        {VIDEO_DATA.map((video) => (
          <VideoCard key={`bottom-${video.id}`} video={video} />
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const VideoCard = ({ video }) => (
  <TouchableOpacity activeOpacity={0.9} style={videos.card}>
    <Image source={{ uri: video.uri }} style={videos.thumbnail} />
    <View style={videos.infoRow}>
      <View style={[videos.avatar, { backgroundColor: colors.lightGrey() }]} />
      <View style={videos.textContainer}>
        <Text style={videos.title} numberOfLines={2}>{video.title}</Text>
        <Text style={videos.meta}>{video.meta}</Text>
      </View>
      <Text style={videos.menu}>⋮</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sectionHeader: { paddingHorizontal: 20, paddingVertical: 15 },
  sectionTitle: { fontSize: 18, fontFamily: "Pjs-Bold", color: colors.black() },
});

const shorts = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 20, gap: 12 }, // Biar sejajar ke kiri
  card: {
    width: 150,
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: colors.lightGrey(),
  },
  image: { width: "100%", height: "100%", position: "absolute" },
  textOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  title: { fontSize: 13, fontFamily: "Pjs-SemiBold", color: colors.white() },
  views: { fontSize: 11, fontFamily: "Pjs-Regular", color: colors.white(), opacity: 0.8 },
});

const videos = StyleSheet.create({
  list: { marginTop: 5 },
  card: { marginBottom: 20, width: "100%" },
  thumbnail: { width: "100%", height: 210, resizeMode: "cover" },
  infoRow: { flexDirection: "row", paddingHorizontal: 15, marginTop: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  textContainer: { flex: 1, marginLeft: 12, marginRight: 8 },
  title: { fontSize: 15, fontFamily: "Pjs-Bold", color: colors.black(), lineHeight: 22 },
  meta: { fontSize: 12, fontFamily: "Pjs-Medium", color: colors.grey(0.7), marginTop: 2 },
  menu: { fontSize: 20, color: colors.black() },
});