import React  from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { Entypo as Icon, FontAwesome } from '@expo/vector-icons';

export default function TextInput({  icon, error,touched,color, ...otherProps  }) {

    const validationColor = !touched ? "#D0CDCD" : error ? '#FF5A5F' :  "#D0CDCD";
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 65,
                borderRadius: 20,
                borderColor: validationColor,
                borderWidth: 1,
               backgroundColor: '#eee',
                padding: 8
            }}
        >
            <View style={{ padding: 10,flex:0.1, alignItems:"center" }}>
                {
                    color ? <FontAwesome name={icon} color='#4B13EA' size={16}/>
                    :

                    <Icon name={icon} color="#4B13EA" size={16} />
                }
            </View>
            <View style={{ flex: 0.9 }}>
                <RNTextInput
                    style={{
                        color:color ? color : "#eee",
                        fontFamily:"gordita-medium"
                    }}

                    underlineColorAndroid='transparent'
                    placeholderTextColor={
                       color ? color : "#eee"
                    }
                    {...otherProps}
                />
            </View>


        </View>
    );
}