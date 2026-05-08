import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

// Pastikan path import ini sudah benar sesuai struktur folder kamu
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Shorts from "../screens/Shorts";
import VideoDetail from "../screens/VideoDetail";

import { Home as HomeIcon, Play, User } from "lucide-react-native";
import { colors } from "../../assets/theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary(),
        tabBarInactiveTintColor: colors.grey(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 5,
          height: 75,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: "Pjs-Medium",
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => <HomeIcon color={color} size={24} />,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Shorts"
        component={Shorts}
        options={{
          tabBarLabel: "Shorts",
          tabBarIcon: ({color}) => <Play color={color} size={24} />,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color}) => <User color={color} size={24} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
