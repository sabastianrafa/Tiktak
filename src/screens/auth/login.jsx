import {useState} from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Eye, EyeOff, Lock, Mail, Play} from "lucide-react-native";
import {colors} from "../../../assets/theme";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Warning", "Please fill all fields.");
      return;
    }
    Alert.alert("Success", "Login Success");
    navigation.replace("MainApp");
  };
  const handleGuestLogin = () => {
    Alert.alert("Guest Mode", "You entered as guest.");

    navigation.replace("MainApp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black()} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Mail size={18} color={colors.grey(0.6)} />
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={colors.grey(0.5)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Lock size={18} color={colors.grey(0.6)} />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={colors.grey(0.5)}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={20} color={colors.grey(0.6)} />
                  ) : (
                    <Eye size={20} color={colors.grey(0.6)} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.loginButton}
              onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.guestButton}
              onPress={handleGuestLogin}>
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerLabel}>Don't have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  formContainer: {
    gap: 10,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },
  inputContainer: {
    height: 58,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.lightGrey(),
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: "Pjs-Regular",
    color: colors.black(),
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -6,
  },
  forgotText: {
    fontSize: 13,
    fontFamily: "Pjs-Medium",
    color: colors.primary(),
  },
  loginButton: {
    marginTop: 10,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary(),
    shadowColor: colors.primary(),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 15,
    fontFamily: "Pjs-Bold",
    color: colors.white(),
  },
  guestButton: {
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,0,0,0.15)",
    backgroundColor: "rgba(255,0,0,0.05)",
  },
  guestButtonText: {
    fontSize: 15,
    fontFamily: "Pjs-SemiBold",
    color: colors.primary(),
  },
  registerContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  registerLabel: {
    fontSize: 13,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.7),
  },
  registerText: {
    fontSize: 13,
    fontFamily: "Pjs-Bold",
    color: colors.primary(),
  },
});