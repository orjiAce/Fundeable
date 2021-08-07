import React, {useCallback} from 'react';
import {Ionicons} from "@expo/vector-icons";
import { TouchableOpacity} from 'react-native';
import Animated, {Easing, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {TapGestureHandler} from "react-native-gesture-handler";

interface sheetProps{
    offset: Animated.SharedValue<number>,
    opacity: Animated.SharedValue<number>,
    zIndex: Animated.SharedValue<number>,
    children: any
}




const BottomSheet = ({offset,opacity,zIndex,children}: sheetProps) => {


    const sheetStyle = useAnimatedStyle(() => {

        return {
            opacity: opacity.value,
            transform:[ {translateY: offset.value}],
        }
    })

    const sheetOverlayStyle = useAnimatedStyle(() => {

        return {
            opacity: opacity.value,
            zIndex:zIndex.value,
        }
    })



    const closeSheet = useCallback(() => {
        opacity.value = withTiming(0)
        offset.value = withTiming(500,{
            duration: 500,
            easing: Easing.out(Easing.exp),
        });
    }, []);


    return (
        <Animated.View style={[sheetOverlayStyle,{
            backgroundColor:'rgba(29,29,29,0.8)',
            width: '100%',
            height:'100%',
            flex:1,
            position: "absolute",
            alignItems:'center',
            justifyContent:'flex-end',

        }]}>

            <TapGestureHandler onActivated={closeSheet}>
                <Animated.View>
                    <TouchableOpacity activeOpacity={0.5} style={{
                        borderRadius: 100,
                        backgroundColor: '#cbcbcb',
                        width: 50,
                        marginVertical:15,
                        height: 50,
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>

                        <Ionicons name='ios-close' size={25}/>
                    </TouchableOpacity>
                </Animated.View>
            </TapGestureHandler>


            <Animated.View style={[sheetStyle, {

                bottom:0,
                width: '100%',
                height: 500,
                backgroundColor: '#fff',
                justifyContent:'flex-start',
                alignItems:'center',
                borderTopRightRadius:36,
                borderTopLeftRadius:36,
                padding:15
            }]}>


                {
                    children
                }

            </Animated.View>


        </Animated.View>
    );
};

export default BottomSheet;
