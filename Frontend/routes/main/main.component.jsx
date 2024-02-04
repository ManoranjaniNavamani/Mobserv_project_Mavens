import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomePage from '../home/home.component.jsx';
import AboutPage from '../about/about.component.jsx';
import ChatPage from '../chat/chat.component.jsx';
import SettingsPage from '../settings/settings.component.jsx';

import {tabBarStyle} from './main.styles.js';
import CourseCreationPage from '../create/courseCreation.component.jsx';

const Tabs = createBottomTabNavigator();

const MainScreen = ({navigation}) => {
	return (
		<>
			<Tabs.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: tabBarStyle, // Make sure to import tabBarStyle from your app.styles.js
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name="Home"
					component={HomePage}
					options={{
						tabBarIcon: () => <Ionicons name="home" size={25} />,
					}}
				/>
				<Tabs.Screen
					name="About"
					component={AboutPage}
					options={{
						tabBarIcon: () => <Ionicons name="calendar-outline" size={25} />,
					}}
				/>
				<Tabs.Screen
					name="Create"
					component={CourseCreationPage}
					options={{
						tabBarIcon: () => <Ionicons name="create" size={25} />,
					}}
				/>
				<Tabs.Screen
					name="Chat"
					component={ChatPage}
					options={{
						tabBarIcon: () => (
							<Ionicons name="chatbox-ellipses-outline" size={25} />
						),
					}}
				/>
				<Tabs.Screen
					name="Settings"
					component={SettingsPage}
					options={{
						tabBarIcon: () => <Ionicons name="people-outline" size={25} />,
					}}
				/>
			</Tabs.Navigator>
		</>
	);
};

export default MainScreen;
