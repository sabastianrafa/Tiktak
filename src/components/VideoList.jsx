import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {colors} from "../../assets/theme";
import { VIDEO_DATA, SHORTS_DATA } from "../data/videos";

export default function VideoList({activeCategory}) {
  const filteredVideos = VIDEO_DATA.filter(
    (video) =>
      activeCategory === "Trending" || video.category === activeCategory,
  );

  const filteredShorts = SHORTS_DATA.filter(
    (item) => activeCategory === "Trending" || item.category === activeCategory,
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* short */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shorts</Text>

      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={shorts.scrollContainer}>
        {filteredShorts.map((item) => (
          <TouchableOpacity key={item.id} style={shorts.card}>
            <Image source={{uri: item.uri}} style={shorts.image} />
            <View style={shorts.textOverlay}>
              <Text style={shorts.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={shorts.views}>{item.views} ditonton</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* video */}
      <View style={[videos.list, {marginTop: 25}]}>
        {filteredVideos.map((video) => (
          <VideoCard key={`bottom-${video.id}`} video={video} />
        ))}
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const formatViews = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + " jt";
  if (num >= 1000) return (num / 1000).toFixed(0) + " rb";
  return num;
};

const VideoCard = ({video}) => (
  <TouchableOpacity activeOpacity={0.9} style={videos.card}>
    <Image source={{uri: video.uri}} style={videos.thumbnail} />
    <View style={videos.infoRow}>
      <View style={[videos.avatar, {backgroundColor: colors.lightGrey()}]} />
      <View style={videos.textContainer}>
        <Text style={videos.title} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={videos.meta}>
          {video.channel} • {formatViews(video.views)} ditonton • {video.uploadedAt}
        </Text>
      </View>
      <Text style={videos.menu}>⋮</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sectionHeader: {paddingHorizontal: 20, paddingVertical: 15},
  sectionTitle: {fontSize: 18, fontFamily: "Pjs-Bold", color: colors.black()},
});

const shorts = StyleSheet.create({
  scrollContainer: {paddingHorizontal: 20, gap: 12},
  card: {
    width: 150,
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: colors.lightGrey(),
  },
  image: {width: "100%", height: "100%", position: "absolute"},
  textOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  title: {fontSize: 13, fontFamily: "Pjs-SemiBold", color: colors.white()},
  views: {
    fontSize: 11,
    fontFamily: "Pjs-Regular",
    color: colors.white(),
    opacity: 0.8,
  },
});

const videos = StyleSheet.create({
  list: {marginTop: 5},
  card: {marginBottom: 20, width: "100%"},
  thumbnail: {width: "100%", height: 210, resizeMode: "cover"},
  infoRow: {flexDirection: "row", paddingHorizontal: 15, marginTop: 12},
  avatar: {width: 40, height: 40, borderRadius: 20},
  textContainer: {flex: 1, marginLeft: 12, marginRight: 8},
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
  menu: {fontSize: 20, color: colors.black()},
});
