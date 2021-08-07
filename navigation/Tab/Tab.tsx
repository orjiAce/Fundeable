import React, {useEffect} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons, Octicons} from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring, withSequence,
} from 'react-native-reanimated';





//we need to create animated image component if the animation will not work
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

//our props
interface PageProps {
    textColor: string,
    tabName: string,
    icon: any,
    color: any,
    index: any,
   // size: number,
    //textSize: number,
    onPress: any,
    tab: any,
    selected: any,
}


const Tab = (props: PageProps) => {
    const {tabName,icon, selected, color, onPress, tab} = props

    const scale = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {

        return {
            transform: [{ scale: scale.value }],
        }

    },[])

    useEffect(() =>{
        //withSequence(withSpring(1.5), withTiming(0), withSpring(1))
        selected === tab.name ?  scale.value = withSequence(withSpring(1.4), withSpring(1.1), withSpring(1.3)) :
            scale.value = withSpring(1)
    },[selected])




    return (
        <Animated.View style={[animatedStyle, {flex:1}]}>
        <AnimatedTouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.container]}>




                    <Ionicons name={icon} size={18} color={color}/>

            <Animated.Text
                style={{color,fontSize: 9, fontFamily:'gordita-bold'}}

            >{tabName}</Animated.Text>
<Octicons name='primitive-dot' size={6} color={color}/>

        </AnimatedTouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width:'100%'

    },
    text: {}
});

export default Tab;