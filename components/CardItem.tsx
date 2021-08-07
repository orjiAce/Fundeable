import {Animated, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";


interface itemProp {
    navigation: any,
    item: any,
}


const CardItem = ({item,navigation}: itemProp) => {



    return (


        <Pressable
            style={({pressed}) => ({opacity: pressed ? 0.5 : 1, alignItems:'center'})}
            onPress={() => navigation.navigate('EventScreen',
                {
                    eventId: item.id,
                })}>

            <Animated.View style={{
                    height: 440,
                    width: '95%',
                    borderRadius: 20,
                    marginVertical:10,
                    backgroundColor: '#fff'}}>

                <View style={{
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    width: '100%',
                    height: 230,
                }}>
                    <Image source={{uri: item.image}}
                           style={{
                               borderTopRightRadius: 20,
                               borderTopLeftRadius: 20,
                               width: '100%',
                               height: '100%',
                               resizeMode: 'cover'
                           }}
                    />
                </View>
                    <View style={{
                        padding: 10
                    }}>
                        <Text style={{
                            color: '#333',
                            fontFamily: 'gordita-black',
                            fontSize: 18,
                        }}
                        >{item.title}</Text>


                        <View style={{
                            flexDirection: 'column',
                            paddingVertical: 5
                        }}>
                            <Text style={{
                                lineHeight: 17,
                                fontFamily: 'gordita-regular',
                                fontSize: 10,
                                color: '#b0b0b0'
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
                                    color: '#131313'
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


                        <Text style={{
                            lineHeight: 17,
                            fontFamily: 'gordita-regular',
                            fontSize: 10,
                        }}>
                            {item.description}
                        </Text>
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
                                            borderWidth:1,
                                            borderColor:'#fff',
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


            </Animated.View>
        </Pressable>
    )
}

export default CardItem