import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import React, {useState, useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider, useAuth} from './context/authContext';
import LoginPage from './routes/login/login.component.jsx';
import MainScreen from './routes/main/main.component.jsx';
import SignUpPage from './routes/signUp/signUp.component.jsx';
import ForgotPasswordPage from './routes/forget-password/forgot-password.component.jsx';
import ResetPasswordPage from './routes/reset-password/reset-password.component.jsx';
import ProfileMenuPage from './routes/profile-menu/profile-menu.component.jsx';
import SettingsPage from './routes/settings/settings.component.jsx';
import BecomeTeacherPage from './routes/become-teacher/become-teacher.component.jsx';
import ManageRequestsPage from './routes/manage-requests/manage-requests.component.jsx';
import ProfilePage from './routes/profile-page/profile-page.component.jsx';
import ChatPage from './routes/chat/chat.component.jsx';
import GroupChatPage from './routes/Group-chats/Group-chat.component.jsx'
import CreateNewGroupPage from './routes/CreateNewGroup/Create-New-Group.component.jsx'
import GroupNameAndEnrollmentPage from './routes/GroupNameAndEnrollment/Group-Name-And-Enrollment.component.jsx'
import ChatScreenPage from './routes/chat-screen/chat-screen.component.jsx';
import UserBrowserPage from './routes/users/user-browser.component.jsx';
import CourseDescriptionPage from './routes/courseDescription/courseDescription.component.jsx';
import VideoPage from './routes/video/video.component.jsx';
import CreateReviewPage from './routes/create-review/create-review.component.jsx';
import CreateChapterPage from './routes/createChapter/createChapter.component.jsx';
const Stack = createStackNavigator();

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		checkLoginStatus();
	}, []);

	const checkLoginStatus = async () => {
		const userToken = await AsyncStorage.getItem('userToken');

		if (userToken) {
			setIsLoggedIn(true);
		}
	};
	if (!isLoggedIn) {
		return (
			<GestureHandlerRootView style={{flex: 1}}>
				<SafeAreaProvider>
					<AuthProvider>
						<NavigationContainer>
							<Stack.Navigator
								initialRouteName="Login"
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen name="Login" component={LoginPage} />
								<Stack.Screen name="SignUp" component={SignUpPage} />
								<Stack.Screen name="Main" component={MainScreen} />
								<Stack.Screen name="Forget" component={ForgotPasswordPage} />
								<Stack.Screen name="Reset" component={ResetPasswordPage} />
								<Stack.Screen name="ProfileMenu" component={ProfileMenuPage} />
								<Stack.Screen name="Settings" component={SettingsPage} />
								<Stack.Screen name="Profile" component={ProfilePage} />
								<Stack.Screen name="Chat" component={ChatPage} />
								<Stack.Screen name="GroupChat" component={GroupChatPage} />
								<Stack.Screen name="CreateNewGroup" component={CreateNewGroupPage} />
								<Stack.Screen name="GroupNameAndEnrollment" component={GroupNameAndEnrollmentPage} />
								<Stack.Screen name="ChatScreen" component={ChatScreenPage} />
								<Stack.Screen name="UserBrowser" component={UserBrowserPage} />
								<Stack.Screen name="VideoPage" component={VideoPage} />
								<Stack.Screen
									name="CreateChapter"
									component={CreateChapterPage}
								/>

								<Stack.Screen
									name="CreateReviewPage"
									component={CreateReviewPage}
								/>
								<Stack.Screen
									name="CourseDescriptionPage"
									component={CourseDescriptionPage}
								/>
								<Stack.Screen
									name="ManageRequests"
									component={ManageRequestsPage}
								/>
								<Stack.Screen
									name="BecomeTeacher"
									component={BecomeTeacherPage}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</AuthProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		);
	}

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaProvider>
				<AuthProvider>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName="Main"
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Screen name="Login" component={LoginPage} />
							<Stack.Screen name="SignUp" component={SignUpPage} />
							<Stack.Screen name="Main" component={MainScreen} />
							<Stack.Screen name="Forget" component={ForgotPasswordPage} />
							<Stack.Screen name="Reset" component={ResetPasswordPage} />
							<Stack.Screen name="ProfileMenu" component={ProfileMenuPage} />
							<Stack.Screen name="Settings" component={SettingsPage} />
							<Stack.Screen name="Profile" component={ProfilePage} />
							<Stack.Screen name="Chat" component={ChatPage} />
							<Stack.Screen name="GroupChat" component={GroupChatPage} />
							<Stack.Screen name="CreateNewGroup" component={CreateNewGroupPage} />
							<Stack.Screen name="GroupNameAndEnrollment" component={GroupNameAndEnrollmentPage} />
							<Stack.Screen name="ChatScreen" component={ChatScreenPage} />
							<Stack.Screen name="UserBrowser" component={UserBrowserPage} />
							<Stack.Screen name="VideoPage" component={VideoPage} />
							<Stack.Screen
								name="CreateChapter"
								component={CreateChapterPage}
							/>
							<Stack.Screen
								name="CreateReviewPage"
								component={CreateReviewPage}
							/>

							<Stack.Screen
								name="CourseDescriptionPage"
								component={CourseDescriptionPage}
							/>
							<Stack.Screen
								name="ManageRequests"
								component={ManageRequestsPage}
							/>
							<Stack.Screen
								name="BecomeTeacher"
								component={BecomeTeacherPage}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</AuthProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};

export default App;
