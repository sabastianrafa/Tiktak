import {useEffect, useRef} from "react";

import {Animated, StatusBar, StyleSheet, Text, View} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";

import {Play} from "lucide-react-native";

import {colors} from "../../assets/theme";

export default function SplashScreen({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    const timeout = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <View style={styles.logoContainer}>
          <Play size={38} color={colors.white()} fill={colors.white()} />
        </View>
        <Text style={styles.title}>TikTak</Text>
        <Text style={styles.subtitle}>Watch. Create. Share.</Text>
      </Animated.View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by React Native</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary(),
    shadowColor: colors.primary(),
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontFamily: "Pjs-ExtraBold",
    color: colors.primary(),
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.7),
  },
  footer: {
    position: "absolute",
    bottom: 40,
  },
  footerText: {
    fontSize: 13,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.5),
  },
});