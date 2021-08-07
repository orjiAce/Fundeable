import React from 'react';


import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from "react-native-reanimated";
import Colors from "../constants/Colors";
import {useSelector} from "react-redux";

interface box {
    children: any,
    boxStyle: any
}

const ProfileBox = (props:box) => {
    const {children,boxStyle} = props
    const data = useSelector(state => state.data)
    const {theme} = data

    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    }, [theme])

    const rStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ["#eaeaea", Colors.dark.background]
        )

        return {
            backgroundColor
        }
    })


    return (
        <Animated.View style={[rStyle,boxStyle ]}>
            {children}
        </Animated.View>


    );
};

export default ProfileBox;
