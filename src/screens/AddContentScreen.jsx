import {useMemo, useState} from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Upload,
  Video,
} from "lucide-react-native";
import {Image} from "expo-image";
import {colors} from "../../assets/theme";

export default function AddContentScreen({navigation}) {
  const [contentType, setContentType] = useState("video");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const generatedThumbnail = useMemo(() => {
    if (!videoUrl) return "";
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = videoUrl.match(youtubeRegex);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return "";
  }, [videoUrl]);
  const finalThumbnail = thumbnail || generatedThumbnail;
  const handleUpload = () => {
    if (!title || !description || !videoUrl) {
      Alert.alert("Warning", "Please fill all required fields.");
      return;
    }
    const newContent = {
      id: Date.now(),
      type: contentType,
      title,
      description,
      thumbnail: finalThumbnail,
      videoUrl,
      createdAt: new Date(),
    };
    console.log("NEW CONTENT :", newContent);
    Alert.alert(
      "Success",
      `${contentType === "short" ? "Short" : "Video"} uploaded successfully!`,
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={colors.black()} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Content</Text>
        <View style={{width: 42}} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Content Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.typeButton,
                  contentType === "video" && styles.activeTypeButton,
                ]}
                onPress={() => setContentType("video")}>
                <Video
                  size={18}
                  color={
                    contentType === "video" ? colors.white() : colors.black()
                  }
                />
                <Text
                  style={[
                    styles.typeText,
                    contentType === "video" && styles.activeTypeText,
                  ]}>
                  Video
                </Text>
                {contentType === "video" && (
                  <Check size={16} color={colors.white()} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.typeButton,
                  contentType === "short" && styles.activeTypeButton,
                ]}
                onPress={() => setContentType("short")}>
                <Upload
                  size={18}
                  color={
                    contentType === "short" ? colors.white() : colors.black()
                  }
                />
                <Text
                  style={[
                    styles.typeText,
                    contentType === "short" && styles.activeTypeText,
                  ]}>
                  Short
                </Text>
                {contentType === "short" && (
                  <Check size={16} color={colors.white()} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Content Title</Text>
            <TextInput
              placeholder="Enter content title..."
              placeholderTextColor={colors.grey(0.5)}
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Write content description..."
              placeholderTextColor={colors.grey(0.5)}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              style={[styles.input, styles.textArea]}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Video URL</Text>
            <View style={styles.iconInputContainer}>
              <Upload size={18} color={colors.grey(0.6)} />
              <TextInput
                placeholder="Paste video URL..."
                placeholderTextColor={colors.grey(0.5)}
                value={videoUrl}
                onChangeText={setVideoUrl}
                style={styles.iconInput}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Thumbnail URL (Optional)</Text>
            <View style={styles.iconInputContainer}>
              <ImageIcon size={18} color={colors.grey(0.6)} />
              <TextInput
                placeholder="Thumbnail auto generated from YouTube..."
                placeholderTextColor={colors.grey(0.5)}
                value={thumbnail}
                onChangeText={setThumbnail}
                style={styles.iconInput}
              />
            </View>
          </View>
          {finalThumbnail ? (
            <View style={styles.previewContainer}>
              <Text style={styles.previewLabel}>Thumbnail Preview</Text>
              <Image
                source={{
                  uri: finalThumbnail,
                }}
                style={styles.previewImage}
                contentFit="cover"
              />
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.uploadButton}
            onPress={handleUpload}>
            <Upload size={18} color={colors.white()} />
            <Text style={styles.uploadButtonText}>Upload Content</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey(0.08),
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 22,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.lightGrey(0.05),
  },
  activeTypeButton: {
    backgroundColor: colors.black(),
  },
  typeText: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },
  activeTypeText: {
    color: colors.white(),
  },
  input: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 18,
    backgroundColor: colors.lightGrey(0.05),
    fontSize: 14,
    fontFamily: "Pjs-Regular",
    color: colors.black(),
  },
  textArea: {
    height: 140,
    paddingTop: 18,
  },
  iconInputContainer: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.lightGrey(0.05),
  },
  iconInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: "Pjs-Regular",
    color: colors.black(),
  },
  previewContainer: {
    marginTop: 6,
  },
  previewLabel: {
    marginBottom: 10,
    fontSize: 13,
    fontFamily: "Pjs-Medium",
    color: colors.grey(0.6),
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 18,
    backgroundColor: colors.lightGrey(0.1),
  },
  uploadButton: {
    marginTop: 10,
    height: 58,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.black(),
  },
  uploadButtonText: {
    fontSize: 15,
    fontFamily: "Pjs-SemiBold",
    color: colors.white(),
  },
});