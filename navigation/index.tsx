/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React,{useRef} from 'react';


import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, StartStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AuthScreen from "../screens/AuthScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";

import {useDispatch} from "react-redux";
import {handleTab, updateRouteName} from "../redux/actions/data-actions";
import EventScreen from "../screens/EventScreen";








export default function Navigation() {
    const dispatch = useDispatch()
    const navigationRef = useRef<any>();
    const routeNameRef = useRef();




    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name
                const currentIndex = navigationRef.current.getCurrentRoute().key

                if (previousRouteName !== currentRouteName) {
                    // The line below uses the expo-firebase-analytics tracker
                    // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
                    // Change this line to use another Mobile analytics SDK
                    // Analytics.setCurrentScreen(currentRouteName, currentRouteName);
                    // alert(`The route changed to ${currentRouteName}`);
                    const routeData = {
                        currentRouteName,
                        currentIndex
                    }
                    dispatch(updateRouteName(routeData))


                }

                // Save the current route name for later comparision
                routeNameRef.current = currentRouteName;
                dispatch(handleTab(currentRouteName))
            }}
            linking={LinkingConfiguration}>
            <RootNavigator />
        </NavigationContainer>
    );
}


// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const StartStack = createStackNavigator<StartStackParamList>()

function StartNavigation(){
    return(
       <StartStack.Navigator
           screenOptions={{ headerShown: false,
               animationEnabled:true,
               gestureEnabled: true,
       }} mode='modal'>
           <StartStack.Screen name='OnBoarding' component={OnBoardingScreen}/>
           <StartStack.Screen name='AuthScreen' component={AuthScreen}/>

       </StartStack.Navigator>
    )
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
    }}
        mode="modal">
        <Stack.Screen name="Start" component={StartNavigation}/>
        <StartStack.Screen name='EventScreen' component={EventScreen}/>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
