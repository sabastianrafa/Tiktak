import React, {useMemo} from "react";

import {FlatList, StyleSheet, Text, View} from "react-native";

import {useNavigation} from "@react-navigation/native";

import {colors} from "../../assets/theme";

import {SHORTS_DATA, USER_DATA, VIDEO_DATA} from "../data/videos";

import ShortsCard from "./ShortsCard";
import VideoCard from "./VideoCard";

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export default function VideoList({
  activeCategory,
  excludeVideoId,
  ListHeaderComponent,
}) {
  const navigation = useNavigation();

  // FILTER VIDEO
  const filteredVideos = useMemo(() => {
    const filtered = VIDEO_DATA.filter(
      (video) =>
        (activeCategory === "All" || video.category === activeCategory) &&
        video.id !== excludeVideoId,
    );

    return shuffleArray(filtered);
  }, [activeCategory, excludeVideoId]);

  // FILTER SHORTS
  const filteredShorts = useMemo(() => {
    const filtered = SHORTS_DATA.filter(
      (item) => activeCategory === "All" || item.category === activeCategory,
    );

    return shuffleArray(filtered);
  }, [activeCategory]);

  // TOP VIDEOS
  const topVideos = useMemo(() => filteredVideos.slice(0, 1), [filteredVideos]);

  const remainingVideos = useMemo(
    () => filteredVideos.slice(1),
    [filteredVideos],
  );

  // NAVIGATE VIDEO
  const handleVideoPress = (video) => {
    navigation.navigate("VideoDetail", {
      video,
    });
  };

  // GET USER
  const getUser = (userId) => {
    return USER_DATA.find((user) => user.id === userId);
  };

  // HEADER
  const renderHeader = () => (
    <View>
      {ListHeaderComponent}
      <View>
        {topVideos.map((video) => {
          const user = getUser(video.userId);

          return (
            <VideoCard
              key={`top-${video.id}`}
              video={video}
              user={user}
              onPress={handleVideoPress}
            />
          );
        })}
      </View>

      <View style={styles.shortSection}>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.primary(),
              },
            ]}>
            TIKTAK{" "}
          </Text>

          <Text style={styles.sectionTitle}>Shorts</Text>
        </View>

        <FlatList
          horizontal
          data={filteredShorts}
          keyExtractor={(item) => `short-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shortsContainer}
          renderItem={({item}) => (
            <ShortsCard
              item={item}
              onPress={() => navigation.navigate("Shorts", {video: item})}
            />
          )}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={remainingVideos}
      keyExtractor={(item) => `video-${item.id}`}
      renderItem={({item}) => {
        const user = getUser(item.userId);

        return (
          <VideoCard video={item} user={user} onPress={handleVideoPress} />
        );
      }}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={<View style={{height: 20}} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 5,
  },

  shortSection: {
    marginBottom: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  shortsContainer: {
    paddingHorizontal: 12
  },
});
