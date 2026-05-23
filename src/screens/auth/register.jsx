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
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react-native";
import {colors} from "../../../assets/theme";

export default function Register({navigation}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Warning", "Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Password does not match.");
      return;
    }
    Alert.alert("Success", "Register Success");
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
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <User size={18} color={colors.grey(0.6)} />
                <TextInput
                  placeholder="Enter username"
                  placeholderTextColor={colors.grey(0.5)}
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
              </View>
            </View>
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
                  placeholder="Enter password"
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
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <Lock size={18} color={colors.grey(0.6)} />
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor={colors.grey(0.5)}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff size={20} color={colors.grey(0.6)} />
                  ) : (
                    <Eye size={20} color={colors.grey(0.6)} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.registerButton}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
              <Text style={styles.loginLabel}>Already have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}>Login</Text>
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
    paddingVertical: 40,
  },
  formContainer: {
    gap: 10,
    paddingTop: 20,
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
  registerButton: {
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
  registerButtonText: {
    fontSize: 15,
    fontFamily: "Pjs-Bold",
    color: colors.white(),
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  loginLabel: {
    fontSize: 13,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.7),
  },
  loginText: {
    fontSize: 13,
    fontFamily: "Pjs-Bold",
    color: colors.primary(),
  },
});