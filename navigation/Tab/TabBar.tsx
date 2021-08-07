import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Tab from './Tab';

import { useDispatch, useSelector} from "react-redux";
import {handleTab} from "../../redux/actions/data-actions";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import Colors from "../../constants/Colors";

//our props
interface PageProps {
    navigation: any,
    state: any,
}

let tabColor: any;
let textColor: { (arg0: any): string; (currentTab: any): any; (currentTab: any): any; };

const TabBar = (props: PageProps) => {
const selected = useSelector((state)=> state.data )

    const {tabStatus, theme} = selected

theme === 'dark' ? tabColor =  '#c2c4bf' : tabColor = '#9fa79b'



    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    }, [theme])

    const rStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ["#fff", '#111']
        )

        return {
            backgroundColor
        }
    })
    const dispatch = useDispatch();
    const {state, navigation} = props

    const opacity = useSharedValue(0)
    const translateY = useSharedValue(0)

    const tabStyle = useAnimatedStyle(() =>{

        return{
            opacity:opacity.value,
            transform: [{translateY: translateY.value}]
        }
    })

    useEffect(() =>{
        if(tabStatus){
            opacity.value = 1
            translateY.value = withTiming(0)
        }else{
            opacity.value = 0
            translateY.value = 100
        }

    },[tabStatus])


   // const [selected, setSelected] = useState('Home');
    const {routes} = state;


    textColor = (currentTab: any) => (currentTab === selected.selectedTab ? "#232eff" : '#161616');



    const handlePress = (activeTab: any, key: string) => {

        if (state.index !== key) {
            //setSelected(activeTab);
            dispatch(handleTab(activeTab))
            navigation.navigate(activeTab);
        }


    };



    return (
        <Animated.View style={[tabStyle,styles.wrapper]}>
            <Animated.View style={[styles.containerW,rStyle]}>
                {routes.map((route: any, key: string) => (


                    <Tab

                        tab={route}
                        selected={selected.selectedTab}
                        tabName={route.params.routeName}
                        icon={route.params.icon}
                        color={route.name === selected.selectedTab ? route.params.tabColor : tabColor}
                        onPress={() => handlePress(route.name, key)}
                        //color={renderColor(route.name)}
                        //textSize={textSize(route.name)}
                        //size={renderSize(route.name)}
                        textColor={textColor(route.name)}
                        key={key}
                        index={key}/>

                ))}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {

        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute',
    },

    containerW: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    containerD: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#05050c",
        height: 85,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default TabBar;