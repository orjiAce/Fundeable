import React from "react";
import { Text, View} from "react-native";
import {Events} from "../constants/Events";
import CardItem from "../components/CardItem";
import MyScrollView from "../components/MyScrollView";



const EventsScreen = (props: any) => {
const {navigation} = props


  return (
      <MyScrollView userName='Orji' message='Happening now'
                    navigation={props.navigation}
                   >
          {
              Events.map((item) => (
                  <CardItem key={item.id} navigation={navigation} item={item}/>
              ))
          }


      </MyScrollView>

  )
};

export default EventsScreen;
