import React from 'react';

import {Image, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import MyScrollView from "../components/MyScrollView";
import {Ionicons} from "@expo/vector-icons";
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from "react-native-reanimated";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../redux/actions/data-actions";
import Colors from "../constants/Colors";
import MyText from "../components/MyText";
import ProfileBox from "../components/ProfileBox";
import MyButton from "../components/MyButton";


const SWITCH_TRACK_COLOR = {
    true: 'rgba(0,64,255, 0.2)',
    false: 'rgba(0,0,0,0.1)',
};

const UserScreen = (props: any) => {
    const data = useSelector(state => state.data)
    const {theme} = data
    const dispatch = useDispatch()


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
    const rStyleTwo = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ["#eaeaea", Colors.dark.background]
        )

        return {
            backgroundColor
        }
    })

    const rStyleThree = useAnimatedStyle(() => {

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
        <MyScrollView message='Your profile'
                      navigation={props.navigation}
                      userName='Orji'>


            <View style={styles.container}>
                <View style={{
                    width: '100%',
                    height: 140,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}}
                        style={{
                            width: 120,
                            height: 120,
                            resizeMode: 'cover',
                            borderRadius: 100
                        }}
                    />

                </View>

                <View style={{
                    width: '100%',
                    height: 120,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <MyText textStyle={{
                        fontSize: 18,
                        fontFamily: 'gordita-black',
                    }}>
                        @Orji
                    </MyText>
                    <Text style={{
                        fontFamily: 'gordita-medium',
                        color: theme === 'light' ? '#515151' : '#ccc'
                    }}>
                        Orji joseph
                    </Text>

                    <TouchableOpacity style={{
                        height: 40,
                        width: 150,
                        backgroundColor: '#060016',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}>
                        <Ionicons name='ios-copy' size={17} color='#13EA1C'/>
                        <Text style={{
                            color: '#eee',
                            fontFamily: 'gordita-bold',
                        }}>
                            Copy wallet
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator}/>

                <View style={{
                    flexDirection: 'column',

                    width: '100%',
                    padding: 5,
                }}>


                    <View style={styles.profile}>
                        <Text style={{
                            padding: 10,
                            fontFamily: 'gordita-medium',
                            fontSize: 14,
                            color: '#acacac'
                        }}>
                            Profile
                        </Text>

                        <View style={{
                            height: 200,
                            width: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginVertical: 5,
                        }}>

                            <ProfileBox boxStyle={{
                                height: 80,
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                                width: '100%',
                                borderWidth: 1,
                                borderColor: '#eee',

                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flexDirection: 'row'
                            }}>

                                <Ionicons name='person' size={20}
                                          color={`${theme === 'dark' ? '#E6DDFF' : '#646464'}`}/>
                                <MyText textStyle={{
                                    width: '65%',
                                    fontSize: 15,
                                    fontFamily: 'gordita-black',
                                    color: '#333',
                                }}>

                                    Orji Joseph
                                </MyText>


                            </ProfileBox>

                            <ProfileBox boxStyle={{
                                height: 80,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                width: '100%',
                                borderWidth: 1,
                                borderColor: '#eee',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flexDirection: 'row'
                            }}>
                                <Ionicons name='mail' size={20} color={`${theme === 'dark' ? '#E6DDFF' : '#646464'}`}/>
                                <MyText textStyle={{
                                    width: '65%',
                                    color: '#333',
                                    fontFamily: 'gordita-bold'
                                }}>

                                    Orjiace@gmail.com
                                </MyText>
                            </ProfileBox>

                        </View>


                    </View>

                    <View style={styles.Setting}>
                        <Text style={{
                            padding: 10,
                            fontFamily: 'gordita-bold',
                            fontSize: 14,
                            color: '#acacac'
                        }}>
                            Setting
                        </Text>

                        <View style={{
                            width: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginVertical: 5,
                        }}>


                            <Animated.View style={[rStyle, styles.settingsBox,
                                {
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                }
                            ]}>
                                <View style={{
                                    width: '15%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <Ionicons name='ios-moon' size={18}
                                              color={`${theme === 'dark' ? '#f8e2a9' : '#646464'}`}/>
                                </View>
                                <View style={{
                                    width: '55%',
                                }}>
                                    <MyText textStyle={{
                                        color: '#333',
                                        fontFamily: 'gordita-bold'
                                    }}>

                                        Toggle dark mode
                                    </MyText>
                                </View>
                                <Switch style={{
                                    width: '10%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} trackColor={SWITCH_TRACK_COLOR}
                                        thumbColor='#4B13EA'
                                        value={theme === 'dark'} onValueChange={(toggled) => {
                                    dispatch(toggleTheme(toggled ? 'dark' : 'light'))
                                }}/>


                            </Animated.View>


                            <Animated.View style={[rStyleTwo, styles.settingsBox,]}>
                                <View style={{
                                    width: '15%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <Ionicons name='ios-key' size={18}
                                              color={`${theme === 'dark' ? '#f8e2a9' : '#646464'}`}/>
                                </View>
                                <View style={{
                                    width: '55%',
                                }}>
                                    <MyText textStyle={{
                                        color: '#333',
                                        fontFamily: 'gordita-bold'
                                    }}>

                                        Configure 2FA
                                    </MyText>
                                </View>

                                <View style={{
                                    width: '10%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>


                                    <Ionicons name='ios-chevron-forward' size={20}
                                              color={`${theme === 'dark' ? '#999999' : '#262626'}`}/>
                                </View>


                            </Animated.View>


                            <Animated.View style={[rStyleThree, styles.settingsBox, {
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            }]}>
                                <View style={{
                                    width: '15%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <Ionicons name='ios-lock-closed' size={18}
                                              color={`${theme === 'dark' ? '#f8e2a9' : '#646464'}`}/>
                                </View>
                                <View style={{
                                    width: '55%',

                                }}>
                                    <MyText textStyle={{
                                        color: '#333',
                                        fontFamily: 'gordita-bold'
                                    }}>

                                        Update Password
                                    </MyText>
                                </View>

                                <View style={{
                                    width: '10%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>

                                    <Ionicons name='ios-chevron-forward' size={20}
                                              color={`${theme === 'dark' ? '#999999' : '#262626'}`}/>

                                </View>
                            </Animated.View>


                        </View>

                        <View style={{
                            width:'100%',
                            marginTop:15,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <MyButton icon='ios-power' label='LOGOUT'/>
                        </View>

                    </View>


                </View>


            </View>

        </MyScrollView>
    );
};

const Settings = [
    {
        id: '1',
        title: "Toggle dark mode",
        icon: 'ios-moon',
    },
    {
        id: '2',
        title: "Configure 2FA",
        icon: 'ios-lock-closed',
    },
    {
        id: '3',
        title: "Update Password",
        icon: 'ios-key',
    }
]

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 100
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '80%',
    },
    profile: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    Setting: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 170
    },
    settingsBox: {
        height: 70,
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default UserScreen;
