import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const {height, width} = Dimensions.get("window");

const SHORTS_DATA = [
  {
    id: "1",
    uri: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "@cooking_master",
    description: "Resep rahasia membuat burger enak! 🍔 #food #recipe",
    likes: "12.5k",
  },
  {
    id: "2",
    uri: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "@travel_vlog",
    description: "Keindahan alam yang luar biasa. 🌿 #nature #travel",
    likes: "8.2k",
  },
];

export default function Shorts() {
  const [activeIndex, setActiveIndex] = useState(0);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.videoContainer}>
        {/* Komponen Video diganti dengan Image */}
        <Image
          source={{uri: item.uri}}
          style={styles.video}
          resizeMode="cover"
        />

        {/* Overlay Informasi */}
        <View style={styles.textOverlay}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        {/* Tombol Aksi di Kanan */}
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart" size={38} color="white" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-ellipses" size={34} color="white" />
            <Text style={styles.actionText}>432</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social" size={34} color="white" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={SHORTS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  videoContainer: {
    height: height,
    width: width,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  userName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  description: {
    color: "white",
    fontSize: 14,
    width: "80%",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  sidebar: {
    position: "absolute",
    right: 15,
    bottom: 120,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "bold",
  },
});
