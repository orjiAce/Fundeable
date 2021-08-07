import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, ImageBackground, ScrollView,Image, Alert, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import TextInput from "../components/TextInput";
import * as Yup from "yup";
import {useFormik} from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication'

const fingerprint = require('../assets/images/fingerprint.png')

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, "Password is Too short")
        .max(50, "Password is Too long")
        .required("Password is Required"),
    email: Yup.string()
        .min(2, "Email is Too short")
        .required("Email is required"),
});




const AuthScreen = (props: any) => {
const {navigation} = props

    const [isBioMetric, setIsBioMetric] = useState(true);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);


    useEffect(() =>{
        AsyncStorage.getItem('crowdFactureUser').then(value =>{
            if(value === null) setIsBioMetric(false)
        })
    },[])



// Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    },[]);

    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            email: '', password: '',
        },
        onSubmit: (values: { email: string; password: string; }) => {
            const {email, password} = values;
            const user = new FormData();
            user.append("email", email);
            user.append("password", password);
           // loginUser(user,navigation)
        }
    });



    const onFaceId = async () => {
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
                console.log('ace ooo')
                navigation.navigate('Root')
               /* AsyncStorage.getItem('crowdFactureUser').then(value =>{
                    //getUser(value)
                    //Alert.alert('Authenticated', `Welcome back ! ${value}`)
                    navigation.navigate('Root')
                })*/
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
        <SafeAreaView>
            <ScrollView
                        keyboardShouldPersistTaps='handled'
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.container}>
                <View style={{
flex:1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',

                }}>
                <ImageBackground
                    source={{uri: 'https://images.unsplash.com/photo-1616252620471-2a0d50a3ae93?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHxwcm90ZXN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: 260,


                    }}/>
                    <View style={{
                        width:'100%',
                        height:150,
                        padding:20,
                        alignItems:'flex-start'
                    }}>

                        <Text style={{
                            fontFamily:'gordita-black',
                            color:'#333',
                            fontSize:25
                        }}>
                            Let’s sign you in.
                        </Text>

                        <Text style={{
                        fontFamily:'gordita-medium',
                        color:'#131313',
                        fontSize:18,
                            lineHeight:25
                        }}>
                            Make your voice head while your
                            pocket speak.
                        </Text>
                    </View>


                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
height:340
                }}>

                    <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                        <TextInput
                            color='#111'
                            keyboardType='default'
                            icon='user'
                            placeholder='Enter your first Name'
                            autoCapitalize='none'
                            keyboardAppearance='dark'
                            returnKeyType='next'
                            returnKeyLabel='next'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                          error={errors.email}
                            touched={touched.email}
                        />
                    </View>
                <View style={{paddingHorizontal: 32, width: '100%'}}>
                    <TextInput
                        color='#111'
                        required
                        icon='key'
                        placeholder='Enter your password'
                        secureTextEntry
                        autoCompleteType='password'
                        autoCapitalize='none'
                        keyboardAppearance='dark'
                        returnKeyType='go'
                        returnKeyLabel='go'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                        onSubmitEditing={() => handleSubmit()}
                    />
                </View>

                <Text style={{
                    color:'red'
                }} numberOfLines={1}>
                    {errors.password}
                </Text>

                    <TouchableOpacity style={styles.smBtn} onPress={onFaceId}>

                        <Image source={fingerprint}
                               style={styles.btnImage}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Root')} style={{
                        width:250,
                        height:50,
                        borderRadius:10,
                        backgroundColor: "#4B13EA",
                        alignItems:'center',
                        justifyContent:'center',
                        alignContent:'center'
                    }}>
                        <Text style={{
                            fontFamily:"gordita-bold",
                            fontSize:18,
                            alignItems:'center',
                            color:'#eee'
                        }}>
                            START NOW
                        </Text>

                    </TouchableOpacity>
            </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnImage:{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',


    } ,
    smBtn:{
height: 40,
        width: 40
    }
})

export default AuthScreen;
