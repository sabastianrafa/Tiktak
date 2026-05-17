import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import {Home as HomeIcon, Clapperboard, User} from "lucide-react-native";

import {colors} from "../../assets/theme";

// SCREENS
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Shorts from "../screens/Shorts";
import VideoDetail from "../screens/VideoDetail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor: colors.primary(),

        tabBarInactiveTintColor: colors.grey(),

        tabBarStyle: {
          height: 80,
          paddingTop: 8,

          borderTopWidth: 0,
          elevation: 0,

          backgroundColor: colors.white(),
        },
        
        tabBarLabelStyle: {
          marginTop: 3,
          fontSize: 10,
          fontFamily: "Pjs-Medium",
        },
      }}>
      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({color}) => <HomeIcon color={color} size={24} />,
        }}
      />

      {/* SHORTS */}
      <Tab.Screen
        name="Shorts"
        component={Shorts}
        options={{
          tabBarLabel: "Shorts",

          tabBarStyle: {
            display: "none",
          },

          tabBarIcon: ({color}) => <Clapperboard color={color} size={24} />,
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",

          tabBarIcon: ({color}) => <User color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* MAIN APP */}
      <Stack.Screen name="MainApp" component={MainApp} />

      {/* VIDEO DETAIL */}
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          gestureEnabled: false,

          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
