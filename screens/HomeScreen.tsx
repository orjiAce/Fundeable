import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Animated,
    Pressable,
    Image,
    TouchableOpacity, Dimensions,
} from 'react-native';
import MyScrollView from "../components/MyScrollView";
import {Ionicons} from "@expo/vector-icons";
import {Events} from "../constants/Events";
import {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {useCallback} from "react";
import {TapGestureHandler} from "react-native-gesture-handler";
import ModalSheet from "../components/ModalSheet";
import {toggleBottomTab} from "../redux/actions/data-actions";
import {useDispatch, useSelector} from "react-redux";
import MyText from "../components/MyText";


const height = Dimensions.get('window').height


interface itemProp {
    index: number,
    item: any,
}


export default function HomeScreen(props: any) {

    const data = useSelector((state) => state.data)
    const {theme} = data
    const sheetHeight = useSharedValue(height)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);
    const dispatch = useDispatch();
    const {navigation} = props

    const [scrollViewWidth, setScrollViewWidth] = React.useState(0);

    const boxWidth = scrollViewWidth * 0.9;
    const boxDistance = scrollViewWidth - boxWidth;
    const halfBoxDistance = boxDistance / 2;


    const openSheet = useCallback(() => {
        opacity.value = withSpring(1)
        zIndex.value = 100
        sheetHeight.value = withSpring(height / 2.3)
        offset.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        })
        dispatch(toggleBottomTab())

    }, []);


    const CardItem = ({item, index}: itemProp) => (
        <Pressable
            style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}
            onPress={() => navigation.navigate('EventScreen',
                {
                    eventId: item.id,
                })}>

            <Animated.View
                style={{
                    transform: [
                        {
                            scale: pan.x.interpolate({
                                inputRange: [
                                    (index - 1) * boxWidth - halfBoxDistance,
                                    index * boxWidth - halfBoxDistance,
                                    (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
                                ],
                                outputRange: [0.8, 1, 0.8], // scale down when out of scope
                                extrapolate: 'clamp',
                            }),
                        },
                    ],
                }}>
                <View style={{
                    height: 440,
                    width: boxWidth,
                    borderRadius: 20,
                    backgroundColor: theme === 'dark' ? '#111' : '#fff'
                }}>

                    <Image source={{uri: item.image}}
                           style={{
                               borderTopRightRadius: 20,
                               borderTopLeftRadius: 20,
                               width: '100%',
                               height: 230,
                               resizeMode: 'cover'
                           }}
                    />
                    <View style={{
                        padding: 10
                    }}>
                        <MyText textStyle={{
                            color: '#333',
                            fontFamily: 'gordita-black',
                            fontSize: 18,
                        }}
                        >{item.title}</MyText>


                        <View style={{
                            flexDirection: 'column',
                            paddingVertical: 5
                        }}>
                            <Text style={{
                                lineHeight: 17,
                                fontFamily: 'gordita-regular',
                                fontSize: 10,
                                color: theme === 'dark' ? '#ccc' : '#b0b0b0'
                            }}>
                                Raised
                            </Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>


                                <Text style={{
                                    lineHeight: 17,
                                    fontFamily: 'gordita-bold',
                                    fontSize: 14,
                                    color:theme === 'dark' ? '#eee' : '#131313'

                                }}>
                                    {item.raised} BTC
                                </Text>
                                <Text style={{
                                    lineHeight: 17,
                                    fontFamily: 'gordita-bold',
                                    fontSize: 9,
                                    color: '#9f9d9d'
                                }}> / $56,000,000</Text>
                            </View>
                        </View>


                        <MyText textStyle={{
                            lineHeight: 17,
                            fontFamily: 'gordita-regular',
                            fontSize: 10,
                        }}>
                            {item.description}
                        </MyText>
                    </View>


                    <View style={{
                        height: 50,
                        width: '100%',
                        borderColor: '#111',
                        borderTopColor: '#eeeeee',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                        paddingHorizontal: 18,
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>


                        <View style={{
                            flexDirection: 'row',
                            width: '50%',
                            alignContent: 'flex-start',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {
                                item.avatars.map((avatar: any, index: number) => (
                                    <View key={index} style={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: 100,

                                        transform: [{translateX: index * -15}]
                                    }}>


                                        <Image source={{uri: avatar}} style={{
                                            backgroundColor: '#9217e9',
                                            width: 25,
                                            height: 25,
                                            borderRadius: 100,
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            resizeMode: 'cover'
                                        }}/>
                                    </View>

                                ))
                            }


                            <Text style={{
                                fontSize: 9,
                                fontFamily: 'gordita-medium',
                                color: '#6b6b6b',
                                transform: [{translateX: -20}]
                            }}>
                                Donated to this
                            </Text>

                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 45,
                            borderRadius: 10,
                            width: '40%'
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('EventScreen',
                                {
                                    eventId: item.id,
                                })} style={{
                                backgroundColor: '#4B13EA',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                height: 35,
                                width: '100%',
                                borderRadius: 20,
                            }}>
                                <Ionicons name='md-rocket-sharp' color='#eee' size={15}/>
                                <Text style={{
                                    fontFamily: 'gordita-bold',
                                    color: '#eee',
                                }}>
                                    Support
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </Animated.View>
        </Pressable>
    )

    const pan = React.useRef(new Animated.ValueXY()).current;


    return (
        <>

            <ModalSheet zIndex={zIndex} offset={offset} opacity={opacity}>
                <View style={{
                    height: '100%',
                    borderRadius: 20,
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>

                    <View style={{
                        height: 80,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#E6DDFF',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}>

                        <Text style={{
                            color: '#131313',
                            fontFamily: 'gordita-black'
                        }}>
                            Send desired BTC only to the wallet bellow
                        </Text>
                    </View>

                    <View style={{
                        marginTop: 20,
                        width: '60%',
                        height: 240,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#ccc',
                        borderStyle: 'dashed',
                        borderWidth: 1
                    }}>


                        <Image source={require('../assets/images/barcode.png')}
                               resizeMode='cover'
                               style={{
                                   width: '80%',
                                   height: '80%',
                                   borderRadius: 20,

                               }}
                        />
                    </View>

                    <Text style={{
                        marginTop: 25,
                        fontSize: 12,
                        color: '#646464',
                        fontFamily: 'gordita-bold'
                    }}>
                        0x7045E49206FdA7eC60fDd66fbDAbD56f26cc5aeA
                    </Text>


                    <TouchableOpacity style={{
                        marginTop: 20,
                        height: 40,
                        width: 150,
                        backgroundColor: '#d6d6d6',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}>
                        <Ionicons name='ios-copy' size={17} color='#4B13EA'/>
                        <Text style={{
                            color: '#444',
                            fontFamily: 'gordita-bold',
                        }}>
                            Copy wallet
                        </Text>
                    </TouchableOpacity>

                    <Text style={{
                        marginTop: 50,
                        fontSize: 12,
                        color: '#929292',
                        fontFamily: 'gordita-medium'
                    }}>
                        Fees may apply
                    </Text>

                </View>

            </ModalSheet>
            <MyScrollView message='Donate to a social movement'
                          navigation={props.navigation}
                          userName='Orji'>


                <View style={styles.container}>
                    <View style={styles.balance}>
                        <Text style={{
                            color: '#C4C4C4',
                            fontSize: 10,
                            fontFamily: 'gordita-medium',
                            marginTop: 10
                        }}>
                            Account
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 25,
                                fontFamily: 'gordita-black',
                            }}>
                                90.00 BTC &nbsp;
                            </Text>
                            <Text style={{
                                color: '#949494',
                                fontSize: 10,
                                fontFamily: 'gordita-medium',

                            }}>
                                / $67,000,000
                            </Text>
                        </View>

                        <TapGestureHandler onActivated={openSheet}>
                            <Animated.View>

                                <TouchableOpacity activeOpacity={0.8} style={{
                                    backgroundColor: '#4B13EA',
                                    borderRadius: 20,
                                    width: 110,
                                    height: 40,
                                    marginTop: 10,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: 'gordita-bold',
                                        fontSize: 16,
                                        justifyContent: 'space-evenly'
                                    }}>
                                        + Top Up
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </TapGestureHandler>

                    </View>
                    <View style={styles.separator}/>

                    <Text style={styles.title}>
                        Feeds
                    </Text>


                    <FlatList
                        horizontal
                        data={Events}
                        style={{height: 500}}
                        contentContainerStyle={{paddingVertical: 16}}
                        contentInsetAdjustmentBehavior="never"
                        snapToAlignment="center"
                        decelerationRate="fast"
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={1}

                        snapToInterval={boxWidth}
                        contentInset={{
                            left: halfBoxDistance,
                            right: halfBoxDistance,
                        }}
                        contentOffset={{x: halfBoxDistance * -1, y: 0}}
                        onLayout={(e) => {
                            setScrollViewWidth(e.nativeEvent.layout.width);
                        }}

                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: pan.x}}}],
                            {
                                useNativeDriver: false,
                            },
                        )}
                        keyExtractor={(item, index) => `${index}-${item}`}
                        renderItem={CardItem}

                    />


                </View>


            </MyScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        marginLeft: 5,
        fontSize: 15,
        color: '#5B5B5B',
        fontFamily: 'gordita-bold'
    },
    balance: {
        width: '100%',
        backgroundColor: '#060016',
        borderRadius: 20,
        height: 100,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '80%',
    },

});
