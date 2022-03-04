import React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image} from 'react-native';
import Animated, { CurvedTransition, FadeInDown, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import colors from '../theme/colors';
import default_styles from '../theme/default_styles';
import { hp, wp } from '../utils/responsive';
import Bouncy from './bouncy';


interface Props {
    btn_state?:'disabled'|'active'|'right_answer'|'wrong_answer',
    onPress():void,
    answer?:string
};


const Action:React.FC<Props> = ({btn_state="disabled",onPress,answer}) => {
    return (
        <SafeAreaView style={[styles.container]}>
           {(btn_state==='right_answer'||btn_state==='wrong_answer')&&
           <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={[styles.cover,styles[`${btn_state}_cover`]]}>
                <View style={styles.top_header}>
                  <Text style={styles.cover_text}>
                      {btn_state==='right_answer'?'Great Job!':
                      <Text>Answer: <Text style={styles.no_bold}>{answer}</Text></Text>
                      }</Text>
                    <Image source={require('../assets/icons/flag.png')} resizeMode="contain" style={styles.flag}/>
                </View>
            </Animated.View>}
            <Bouncy onPress={onPress} container={styles.btn_container}>
                <Animated.View layout={CurvedTransition} style={[styles.btn, styles[btn_state] ]}>
                    <Text style={[styles.btn_text,styles[`${btn_state}_btn_text`]]}>CONTINUE</Text>
                </Animated.View>
            </Bouncy>
        </SafeAreaView>
    )
};


export default Action;


const styles:any = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    btn:{
        justifyContent:'center',
        alignItems:'center',
        width:'85%',
        padding:wp(5),
        marginBottom:hp(2.5),
        borderRadius:100
    },
    disabled:{
        backgroundColor:colors.gray,
    },
    right_answer:{
        backgroundColor:colors.white,
    },
    right_answer_btn_text:{
        color:colors.positive
    },
    active:{
        backgroundColor:colors.positive,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    btn_text:{
        ...default_styles.text,
        fontWeight:'bold',
        fontSize:wp(4),
        alignSelf:'center'
    },
    btn_container:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    wrong_answer:{
        backgroundColor:colors.white
    },
    wrong_answer_btn_text:{
        color:colors.negative
    },
    wrong_answer_cover:{
        backgroundColor:colors.negative
    },
    cover:{
        ...StyleSheet.absoluteFillObject,
        top:'50%',
        backgroundColor:colors.positive,
        borderTopLeftRadius:wp(8),
        borderTopRightRadius:wp(8)
    },
    top_header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:wp(5),
        paddingLeft:wp(10),
        paddingRight:wp(10)
    },
    no_bold:{
        fontWeight:'400'
    },
    cover_text:{
        color:colors.white,
        fontSize:wp(4),
        fontWeight:'700'
    },
    flag:{
        width:wp(5),
        height:wp(5),
        tintColor:colors.white
    },
});