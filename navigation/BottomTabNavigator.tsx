/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import { EventsParamList, TabOneParamList, UserParamList} from '../types';
import UserScreen from "../screens/UserScreen";
import TabBar from "./Tab/TabBar";
import CreateEvent from "../screens/CreateScreen";

const BottomTab = createBottomTabNavigator();


export default function BottomTabNavigator() {


  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      backBehavior='history'
      detachInactiveScreens={true}
      tabBar={props => <TabBar {...props} />}

    >
      <BottomTab.Screen
        name="HomeScreen"
        options={{
            tabBarVisible:false,

        }}
        component={HomeNavigator}
        initialParams={{icon: 'ios-home', tabColor:'#232eff',  routeName:'Home'}}

      />
      <BottomTab.Screen
        name="EventsScreen"
        component={EventsNavigator}
        initialParams={{icon: 'md-rocket-sharp',tabColor:'#232eff', routeName:'Feed'}}
      />
      <BottomTab.Screen
        name="CreateScreen"
        component={CreateStackNavigator}
        initialParams={{icon: 'md-create-sharp',tabColor:'#232eff', routeName:'Create'}}
      />

      <BottomTab.Screen
        name="userScreen"
        component={UserNavigator}
        initialParams={{icon: 'ios-person', tabColor:'#232eff', routeName:'User'}}
      />
    </BottomTab.Navigator>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function HomeNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{

            headerTitle: 'Tab One Title', headerShown:false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<EventsParamList>();

function EventsNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{ headerTitle: 'Tab Two Title',headerShown:false  }}
      />
    </TabTwoStack.Navigator>
  );
}

const UserStack = createStackNavigator<UserParamList>();

function UserNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="userScreen"
        component={UserScreen}
        options={{ headerTitle: 'Tab Two Title',headerShown:false  }}
      />
    </UserStack.Navigator>
  );
}

const CreateStack = createStackNavigator();

function CreateStackNavigator() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name="CreateScreen"
        component={CreateEvent}
        options={{headerShown:false  }}
      />
    </CreateStack.Navigator>
  );
}
