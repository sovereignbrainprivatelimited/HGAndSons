import React from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback, View, Text, TextInput, ViewPropTypes, TouchableOpacity, Image } from "react-native";
import PropTypes from 'prop-types';
// import CustomIcon from "../CustomIcon";
// import { Color } from "../../utils/Themes";



const SearchBox = (props:any) => {

    const { onFocus, onBlur, onChangeText, searchPlaceholder, onPressClose, value
    } = props;

    return (
        <View style={styles.container} >
            <View style={styles.leftIconStyle}>
                {/* <CustomIcon name="search" size={20} color={'black'} /> */}
            </View>
            <TextInput
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                onChangeText={onChangeText}
                placeholder={searchPlaceholder}
                style={styles.inputStyle}
                autoCorrect={false}
            />
            {/* <View style={styles.rightContainer} >
                <TouchableOpacity onPress={onPressClose} >
                    <CustomIcon name="Union" size={15} />
                </TouchableOpacity>
            </View> */}
        </View>
    )
}


SearchBox.propTypes = {
    style: PropTypes.any,
    searchPlaceholder: PropTypes.string,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onPressClose: PropTypes.func,
    value: PropTypes.any,
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        backgroundColor: "#fff",
        // marginBottom: 5,
        // marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#28282B'
    },
    inputStyle: {
        fontSize: 16,
        padding: 15,
    },
    leftIconStyle: {
        marginLeft: 15
    },
    rightContainer: {
        position: 'absolute',
        right: 20
    },

})

export default SearchBox;