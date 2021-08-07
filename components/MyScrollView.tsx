import React from 'react';

import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from "react-native-reanimated";
import {useSelector} from "react-redux";
import Colors from "../constants/Colors";
import MyText from "./MyText";

interface myScrollViewProps {
    message: string ,
    userName?: string ,
    children: any,
    navigation: any,
}

const MyScrollView = (props: myScrollViewProps) => {
    const {children,message,userName,navigation} = props

    const data = useSelector(state => state.data)
    const {theme} = data

    const progress = useDerivedValue(() =>{
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    },[theme])

    const rStyle = useAnimatedStyle(()=>{

        const backgroundColor = interpolateColor(
            progress.value,
            [0,1],
            [Colors.light.background, Colors.dark.background]
        )

        return{
            backgroundColor
        }
    })


    const rCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.circle, Colors.dark.circle]
        );

        return { backgroundColor };
    });




    return (
        <SafeAreaView>
            <Animated.View style={[styles.top,rCircleStyle]}>
                <View style={styles.titleWrap}>
                    {userName &&
                    <MyText textStyle={styles.routeName}>
                        {`@ ${userName}`}
                    </MyText>
                    }
                    <Text style={styles.message}>
                        {message}
                    </Text>
                </View>
                <View style={styles.notificationIconWrap}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')} activeOpacity={0.8} style={styles.notificationIcon}>
                        <Ionicons name="ios-notifications-sharp" size={20} color='#121212'/>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        <Animated.ScrollView
            keyboardShouldPersistTaps='handled'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            style={[rStyle]}
        contentContainerStyle={styles.container}
        >


            {
                children
            }
        </Animated.ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
paddingHorizontal:18,
        marginTop:12,
    },
    top: {
        width:'100%',
        paddingHorizontal:18,
        height: 80,
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleWrap: {
        width: '50%',
        height: 90,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    routeName: {
        padding: 3,
        fontFamily: 'gordita-black',
        color: "#1c1c1c",
        fontSize: 18,
    },

    message: {
        padding: 3,
        fontSize: 10,
        color: '#5d5d5d',
        fontFamily: 'gordita-medium',
    },

    notificationIconWrap: {
        width: '40%',
        height: 90,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    notificationIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#E6DDFF',
    }
})

export default MyScrollView;
