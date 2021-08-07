import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import {useSelector} from "react-redux";
import MyText from "./MyText";

interface ButtonProps {
  icon: string;
  label: string;
}

const width = (Dimensions.get("window").width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefed',
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 16,
    width: width,
  },
  containerD: {
    backgroundColor: "black",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 16,
    width: width,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: "white",
    fontSize: 14,
    fontFamily:'gordita-medium'
  },
});

const MyButton = ({ icon, label }: ButtonProps) => {
  const data = useSelector(state => state.data)
  const {theme} = data
  return (
    <TouchableWithoutFeedback>
      <View style={theme === 'dark'? styles.containerD : styles.container}>
        <Icon color={theme === 'dark' ? "white" :'#333'} name={icon} size={18} style={styles.icon} />
        <MyText textStyle={styles.label}>{label}</MyText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyButton;
