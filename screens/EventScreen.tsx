import React, {useCallback, useEffect, useState} from 'react';
import {NavigationProp, RouteProp} from "@react-navigation/native";
import {
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text, TextInput as RNTextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {PanGestureHandler, TapGestureHandler} from "react-native-gesture-handler";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring, withTiming
} from "react-native-reanimated";
import {snapPoint, useVector} from "react-native-redash";
import {Events} from "../constants/Events";
import {SnapchatRoutes} from "../Model";
import {Ionicons, FontAwesome, Octicons} from "@expo/vector-icons";
import BottomSheet from "../components/BottomSheet";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import {useFormik} from "formik";

const Schema = Yup.object().shape({
    amount: Yup.number()
        .required("Amount is Required"),

});



const {height} = Dimensions.get("window");

interface EventProps {
    navigation: NavigationProp<SnapchatRoutes, "Story">;
    route: RouteProp<SnapchatRoutes, "Story">;
}



const fingerprint = require('../assets/images/fingerprint.png')

const EventScreen = (props: EventProps) => {

    // const [event, setEvent] = useState([]);

    const {navigation, route} = props


    const isGestureActive = useSharedValue(false);
    const translation = useVector();
    const {eventId} : any= route.params;
    const [event, setEvent] = useState([]);
    // const [avatars, setAvatars] = useState([]);

    const {avatars}: any = event


    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(500);


    const {
        handleChange, handleSubmit, handleBlur,

        errors,
    } = useFormik({
        validationSchema: Schema,
        initialValues: {
          amount: 0
        },
        onSubmit: (values: { amount: number; }) => {
            const {amount} = values;
//Alert.alert('Error', amount.toString())
            // loginUser(user,navigation)
        }
    });


    const openSheet = useCallback(() => {
        opacity.value = withTiming(1, {
            duration: 100,
            easing: Easing.out(Easing.exp),
        })
        zIndex.value = 100

        offset.value = withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.exp),
        })

    }, []);


    useEffect(() => {
        const eventDetail: any = Events.find((item) => item.id === eventId)
        setEvent(eventDetail)
        // setAvatars(eventAvatars)


    }, [])
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: () => (isGestureActive.value = true),
        onActive: ({translationX, translationY}) => {
            translation.x.value = translationX;
            translation.y.value = translationY;
        },
        onEnd: ({translationY, velocityY}) => {
            const snapBack =
                snapPoint(translationY, velocityY, [0, height]) === height;

            if (snapBack) {
                runOnJS(navigation.goBack)();
            } else {
                isGestureActive.value = false;
                translation.x.value = withSpring(0);
                translation.y.value = withSpring(0);
            }
        },
    });
    const style = useAnimatedStyle(() => {
        const scale = interpolate(
            translation.y.value,
            [0, height],
            [1, 0.5],
            Extrapolate.CLAMP
        );
        return {
            flex: 1,
            transform: [
                {translateX: translation.x.value * scale},
                {translateY: translation.y.value * scale},
                {scale},
            ],
            borderRadius: withTiming(isGestureActive.value ? 24 : 0),
        };
    });


    //biometric


    const onBiometric = async () => {
        try {
            // Checking if device is compatible
            const isCompatible = await LocalAuthentication.hasHardwareAsync();

            if (!isCompatible) {
                throw new Error('Your device isn\'t compatible.')
            }

            // Checking if device has biometrics records
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!isEnrolled) {
                throw new Error('No Faces / Fingers found.')
            }

            // Authenticate user


            const auth =  await LocalAuthentication.authenticateAsync();
            if(auth.success){

                AsyncStorage.getItem('crowdFactureUser').then(value =>{
                    //getUser(value)
                    //Alert.alert('Authenticated', `Welcome back ! ${value}`)
                })
            }else{
                Alert.alert(
                    'Biometric record not found',
                    'Please verify your identity with your password')
            }




        } catch (error) {
            Alert.alert('An error as occured', error?.message);
        }
    };

    return (
        <>
            <BottomSheet offset={offset} opacity={opacity} zIndex={zIndex}>

                <View style={{
                    width: '90%',
                    height:'100%',
                    justifyContent:'space-between',
                    alignItems: 'center',
                }}>
                    <View style={{
                        marginTop: 10,
                        alignItems: 'center',
                        width: '100%',
                    }}>

                        <Text style={{
                            color: '#4c4c4c',
                            fontFamily: 'gordita-black',
                            fontSize: 10,
                        }}>
                            Balance
                        </Text>
                        <Text style={{
                            backgroundColor:'#f5f3ff',
                            padding:10,
                            borderRadius:10,
                            fontFamily: 'gordita-black',
                            color: '#161616'
                        }}>
                            78.00 btc
                        </Text>
                    </View>

<View style={{
    flexDirection:'column',
    width: '70%',
    marginVertical: 10,
    height:200,
    justifyContent:'space-between'
}}>


                    <View style={{
                        borderRadius: 30,
                        height: 120,
                        backgroundColor: '#eeeeee',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <View style={{  height: '60%', width:'100%', alignItems:'center', justifyContent:'center' }}>
                            <RNTextInput
                                style={{
                                    fontFamily: 'gordita-black',
                                    color: '#1f1f1f',
                                    fontSize: 20,
                                    width:'80%',
                                    textAlign:'center',

                                   flex:1
                                }}

                                underlineColorAndroid='transparent'
                                placeholderTextColor={"#ddd"
                                }
                                keyboardType='default'
                                placeholder='Enter amount'
                                autoCapitalize='none'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onChangeText={handleChange('amount')}
                                onBlur={handleBlur('amount')}
                            />
                        </View>
                     {/*   <Text style={{
                            fontFamily: 'gordita-black',
                            color: '#1f1f1f',
                            fontSize: 35
                        }}>

                            34.0
                        </Text>*/}


  <Text style={{
                            fontFamily: 'gordita-bold',
                            color: '#61B960',
                            fontSize: 11
                        }}>
                            Fee 0.7%
                        </Text>


                    </View>
    <View style={{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }}>


    <Text style={{
        color:'red',
        fontSize:10,
        fontFamily:'gordita-bold'
    }} numberOfLines={1}>
        {errors.amount}
    </Text>
    </View>

                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity style={{
                            width: 80,
                            height: 45,
                            alignItems: 'center',
                            backgroundColor: '#eaeaea',
                            justifyContent: 'center',
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50
                        }}>

                          <Ionicons name='ios-chevron-down' size={30}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 80,
                            height: 45,
                            alignItems: 'center',
                            backgroundColor: '#eaeaea',
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50,
                            justifyContent: 'center'
                        }}>
                            <Ionicons name='ios-chevron-up' size={30}/>
                        </TouchableOpacity>
                    </View>

</View>

                    <TouchableOpacity style={styles.smBtn} onPress={onBiometric}>

                        <Image source={fingerprint}
                               style={styles.btnImage}/>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.7} style={{
                        width: 230,
                        height: 60,
                        marginBottom: 20,
                        backgroundColor: '#4B13EA',
                        alignItems: 'center',
                        borderRadius: 30,
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}>
                        <Ionicons name='md-rocket-sharp' color='#eee' size={20}/>
                        <Text style={{
                            fontFamily: 'gordita-black',
                            color: '#fff',
                            fontSize: 20,
                        }}>
                            DONATE NOW
                        </Text>

                    </TouchableOpacity>


                    </View>



            </BottomSheet>
            <SafeAreaView>

                <Animated.ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                >

                    <Animated.View style={[styles.container]}>

                        <PanGestureHandler onGestureEvent={onGestureEvent}>
                            <Animated.View style={[{
                                width: '100%',
                                height: 300,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            }]}>

                                {
                                    event &&

                                    <Animated.Image
                                        resizeMode='cover'
                                        source={{uri: event.image}}

                                        style={[
                                            {
                                                ...StyleSheet.absoluteFillObject,
                                                width: '100%',
                                                height: 300,
                                                borderBottomLeftRadius: 20,
                                                borderBottomRightRadius: 20,
                                            },
                                            style
                                        ]}
                                    />
                                }
                            </Animated.View>

                        </PanGestureHandler>


                        <View style={[{width: '100%', padding: 15,}]}>
                            <Text style={{
                                fontSize: 20,
                                color: '#1D1C1C',
                                fontFamily: 'gordita-black'
                            }}>
                                {event.title}
                            </Text>


                            <Text style={{
                                marginTop: 15,
                                lineHeight: 17,
                                fontFamily: 'gordita-medium',
                                fontSize: 14,
                                color: '#b0b0b0'
                            }}>
                                Raised so far <Octicons name='primitive-dot' size={12} color='#90ffa8'/>
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>

                                <Text style={{
                                    fontFamily: 'gordita-bold',
                                    fontSize: 18,
                                    color: '#212121',
                                }}>
                                    {event.raised} BTC
                                </Text>
                                <Text style={{
                                    lineHeight: 17,
                                    fontFamily: 'gordita-bold',
                                    fontSize: 9,
                                    color: '#9f9d9d'
                                }}> / $56,000,000</Text>
                            </View>


                            <Text style={{
                                width: '100%',
                                marginTop: 15,
                                lineHeight: 20,
                                fontFamily: 'gordita-medium',
                                fontSize: 12,
                                color: '#5A5A5A'
                            }}>
                                {event.description}
                            </Text>
                        </View>

                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 15,
                        }}>


                            <View style={{
                                flexDirection: 'row',
                                width: '50%',
                                alignContent: 'flex-start',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                                {

                                    avatars && Object.keys(avatars).length > 0 && avatars.map((avatar: any, index: number) => (
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
                                    Donated to this project
                                </Text>

                            </View>
                        </View>


                        <View style={{
                            marginVertical: 8,
                            width: '95%',
                            height: 250,
                            backgroundColor: '#fffcfc',
                            borderRadius: 33,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>

                            <View style={{
                                width: '100%',
                                height: 100,
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#fff',
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FontAwesome name='flag' color='#333' size={25}/>
                                </View>

                                <View style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#fff',
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FontAwesome name='thumbs-up' color='#333' size={25}/>
                                </View>
                                <View style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#fff',
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FontAwesome name='share-alt' color='#333' size={25}/>
                                </View>

                            </View>


                            <View style={{
                                width: '100%',
                                height: 100,
                                alignItems: 'center',
                            }}>
                                <TapGestureHandler onActivated={openSheet}>
                                    <Animated.View>
                                        <TouchableOpacity activeOpacity={0.7} style={{
                                            width: 230,
                                            height: 60,
                                            backgroundColor: '#4B13EA',
                                            alignItems: 'center',
                                            borderRadius: 30,
                                            justifyContent: 'space-evenly',
                                            flexDirection: 'row'
                                        }}>

                                            <Ionicons name='md-rocket-sharp' color='#eee' size={20}/>
                                            <Text style={{
                                                fontFamily: 'gordita-black',
                                                color: '#fff',
                                                fontSize: 20,
                                            }}>
                                                DONATE
                                            </Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                </TapGestureHandler>
                            </View>

                        </View>


                    </Animated.View>
                </Animated.ScrollView>

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },


        btnImage:{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',


        } ,
        smBtn:{
            height: 35,
            width: 35
        }


})

export default EventScreen;
