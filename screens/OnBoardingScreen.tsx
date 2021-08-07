import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import Slide from "../components/onBoarding/Slide";

const { width } = Dimensions.get("window");

const slides = [
    {
        text:"There's an art to getting your way, and spitting olive pits across the table isn't it.",
        color: "#4B13EA",
        btnTextColor: "#f3f3f3",
        picture: "https://images.unsplash.com/photo-1592687632657-a5513c20565b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb3Rlc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        aspectRatio: 439.75 / 470.5,
    },
    {
        text:'The wake behind the boat told of the past while the open sea for told life in the unknown future.',
        color: "#05c853",
        btnTextColor: "#333",
        picture: "https://images.unsplash.com/photo-1592147326603-35fd59228df1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb3Rlc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        aspectRatio: 400.5 / 429.5,
    },
    {
        text:"Even though he thought the \n" +
            "world was flat he didn’t see the\n" +
            "irony of wanting to travel around\n" +
            "the world.",
        color: "#060016",
        btnTextColor: "#eee",
        picture:"https://images.unsplash.com/photo-1564663546430-46192ce6be42?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTF8fHByb3Rlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        aspectRatio: 391.25 / 520,
    },
];
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        width,
        justifyContent: "center",
        alignItems: "center",
    },
});

const OnBoardingScreen = (props: any) => {
    const {navigation} = props
    const x = useSharedValue(0);
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({

        onScroll: (event: { contentOffset: { x: any; }; }) => {
            x.value = event.contentOffset.x;
            translateX.value = event.contentOffset.x
        },
    });
    return (
        <View style={styles.root}>
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {slides.map((slide, index) => {
                    const isFirst = index === 0;
                    const isLast = index === slides.length - 1;
                    return (
                        <View key={index} style={styles.container}>
                            <Slide
                                navigation={navigation}
                                btnTextColor={slide.btnTextColor}
                                translateX={translateX}
                                x={x}
                                text={slide.text}
                                index={index}
                                aspectRatio={slide.aspectRatio}
                                picture={slide.picture}
                                color={slide.color}
                                colors={[
                                    isFirst ? slide.color : slides[index - 1].color,
                                    slide.color,
                                    isLast ? slide.color : slides[index + 1].color,
                                ]}
                            />
                        </View>
                    );
                })}
            </Animated.ScrollView>
        </View>

    );
};

export default OnBoardingScreen;
