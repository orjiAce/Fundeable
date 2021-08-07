import React from 'react';

import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';
import { useSelector} from "react-redux";
import Colors from "../constants/Colors";


interface textProps{
    children: any,
    textStyle: any
}

const MyText = (props: textProps) =>{
const {children,textStyle} = props
    const data = useSelector(state => state.data)
    const {theme} = data


    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    }, [theme])
    const rTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.text, Colors.dark.text]
        );

        return { color };
    });

    return (

        <Animated.Text style={[rTextStyle, textStyle]}>
            {
                children
            }
        </Animated.Text>
    );
};

export default MyText;
