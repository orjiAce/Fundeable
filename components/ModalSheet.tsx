import React, {useCallback} from 'react';

import { TouchableOpacity} from 'react-native';
import Animated, {Easing, useAnimatedStyle, withSpring, withTiming} from "react-native-reanimated";
import {TapGestureHandler} from "react-native-gesture-handler";
import {toggleBottomTab} from "../redux/actions/data-actions";
import {useDispatch} from "react-redux";
import {Ionicons} from "@expo/vector-icons";



interface modalProps{
    offset: Animated.SharedValue<number>,
    opacity: Animated.SharedValue<number>,
    zIndex: Animated.SharedValue<number>,
    children: any
}

const ModalSheet = ({opacity,offset,zIndex,children}: modalProps) => {
const dispatch = useDispatch()


    const sheetStyle = useAnimatedStyle(() => {

        return {
            opacity: opacity.value,
          transform:[{translateY:offset.value }]
        }
    })

    const sheetOverlayStyle = useAnimatedStyle(() => {

        return {
            opacity: opacity.value,
            zIndex:zIndex.value
        }
    })



    const closeSheet = useCallback(() => {
        opacity.value = withSpring(0)
        zIndex.value = 0
        offset.value = withTiming(600, {
            duration: 300,
            easing: Easing.out(Easing.exp),
        })

        dispatch(toggleBottomTab())
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
                    width: '100%',
                    height: 600,
                    backgroundColor: '#fff',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:20,
                }]}>

                {
                    children
                }


                </Animated.View>

            </Animated.View>
    );
};

export default ModalSheet;
