import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedProps,
    interpolateColor, useAnimatedStyle,
} from "react-native-reanimated";
import {
    cartesian2Canvas,
    Vector,
    serialize,
    createPath,
    addCurve,
} from "react-native-redash";
import Svg, { Path } from "react-native-svg";
const {height, width} = Dimensions.get('window')

const RATIO = 0.9;
const SIZE = width * RATIO;
const C = 0.551915024494;
const CENTER = { x: 1, y: 1 };

const vec = (x: number, y: number) => cartesian2Canvas({ x, y }, CENTER);
const addX = (v: Vector, x: number) => {
    "worklet";
    return { x: v.x + x, y: v.y };
};
const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

// const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

// const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);



interface SlideProps {
    x: Animated.SharedValue<number>;
    index: number;
    colors: [string, string, string];
    picture: string;
    color: string,
    btnTextColor: string,
    text: string;
    aspectRatio: number;
    navigation: any;
    translateX: Animated.SharedValue<number>
}


const AnimatedPath = Animated.createAnimatedComponent(Path);

const Slide = ({ x, index, colors,color,btnTextColor, navigation, picture,translateX, text }: SlideProps) => {

    const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];


    const rAninatedStyle = useAnimatedStyle(() => {


        /*
        basically this means when translateX value is equal to
         (index - 1) * width our scale value is equal to 0
         when TranslateX value is equal to index * width our scale value
         is equal 1 and so on
      * */
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );
        return {
            transform: [{scale: scale}]
        }
    })

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [height / 2, 0, -height / 2],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            translateX.value,
            inputRange,
            [-2, 1, -2],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY: translateY }],
        };
    });

    const animatedProps = useAnimatedProps(() => {
        const progress = (x.value - width * index) / width;
        const offset = interpolate(progress, [0, 1], [0, -2], Extrapolate.CLAMP);
        const path = createPath({ x: P00.x + offset, y: P00.y });
        addCurve(path, {
            c1: addX(P01, offset),
            c2: P02,
            to: P03,
        });
        addCurve(path, {
            c1: P11,
            c2: addX(P12, offset),
            to: addX(P13, offset),
        });
        addCurve(path, {
            c1: addX(P21, offset),
            c2: {
                x:
                    interpolate(
                        progress,
                        [(-1 * RATIO) / 2, 0],
                        [1, 0],
                        Extrapolate.CLAMP
                    ) + offset,
                y: P22.y,
            },
            to: {
                x:
                    interpolate(
                        progress,
                        [(-1 * RATIO) / 2, 0],
                        [1, 0],
                        Extrapolate.CLAMP
                    ) + offset,
                y: P23.y,
            },
        });
        addCurve(path, {
            c1: {
                x:
                    interpolate(
                        progress,
                        [(-1 * RATIO) / 2, 0],
                        [1, 0],
                        Extrapolate.CLAMP
                    ) + offset,
                y: P31.y,
            },
            c2: addX(P32, offset),
            to: addX(P33, offset),
        });
        return {
            d: serialize(path),
            fill: interpolateColor(progress, [-1, 0, 1], colors),
        };
    });
    return (
        <View style={{alignItems:'center', justifyContent:'space-evenly'}}>
            <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
                <AnimatedPath fill="#D5E4FF" animatedProps={animatedProps} />
            </Svg>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    alignItems: "center",
                }}
            >
                <Animated.View style={[rAninatedStyle, {
                    alignContent:'center',
                    justifyContent:'center',
                    alignItems:'center',
                    width:SIZE,
                    height: SIZE
                }]}>


                <Image
                    source={{uri:picture}}
                   // source={{uri:'https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}}

                    style={[{
                        borderRadius:400,
                        width: 220,
                        height: 220,
                    }]}
                />
                </Animated.View>
            </View>
            <Animated.View style={[rTextStyle,{
               width:'90%',
                height:300,
                marginTop:14,
                alignItems:'center',
                alignContent:'center',
                justifyContent:'center',
            }]}>



                    <Text style={{
                        fontFamily:"gordita-bold",
                        fontSize:18,
                        textAlign:'center',
                        lineHeight:30,
                        color:'#333'
                    }}>
                        {text}
                    </Text>


            </Animated.View>

            <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')} style={{
                width:250,
                height:50,
                borderRadius:10,
                backgroundColor: color,
                alignItems:'center',
                justifyContent:'center',
                alignContent:'center'
            }}>
                <Text style={{
                    fontFamily:"gordita-bold",
                    fontSize:18,
                    alignItems:'center',
color:btnTextColor
                }}>
                    START NOW
                </Text>

            </TouchableOpacity>

        </View>
    );
};

export default Slide;