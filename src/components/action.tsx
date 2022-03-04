import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../theme/colors';
import default_styles from '../theme/default_styles';
import { hp, wp } from '../utils/responsive';


interface Props {

};

const Action:React.FC<Props> = () => {
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.btn}>
                <Text style={styles.btn_text}>CONTINUE</Text>
            </View>
        </SafeAreaView>
    )
};


export default Action;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    btn:{
        backgroundColor:colors.gray,
        justifyContent:'center',
        alignItems:'center',
        width:'80%',
        padding:wp(5),
        marginBottom:hp(1),
        borderRadius:100
    },
    btn_text:{
        ...default_styles.text,
        fontWeight:'bold',
        fontSize:wp(4)
    }
});