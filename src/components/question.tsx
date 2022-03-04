import React, { useState } from 'react';
import {View,StyleSheet, Text} from 'react-native';
import Animated, { FadeInDown, CurvedTransition, FadeOutUp, Layout } from 'react-native-reanimated';
import colors from '../theme/colors';
import default_styles from '../theme/default_styles';
import { word } from '../types/word';
import { hp, wp } from '../utils/responsive';
import Bouncy from './bouncy';


const reactive_states = ['right_answer','wrong_answer'];

interface Props {
    sentence:word[]
    answer:number
    options:string[]
    btn_state:'disabled'|'active'|'right_answer'|'wrong_answer'
    onOptionSelected?(selected:string|undefined):void
}

const Question:React.FC<Props> = React.memo(({sentence=[], answer=0,onOptionSelected,options=[],btn_state}) => {

    const [selected,set_selected] = useState<word|undefined>();
    const _render_words_ = (x:word,i:number) => {
        if(i===answer){
            return <SelectedWord btn_state={btn_state} key={`selected_word_${selected?.de}`} {...selected}/>
        };
        return (
            <Word {...x} key={x.de}/>
        )
    };

    const onSelect = (title:string):void => {
        if(title===selected?.de){
            onOptionSelected&&onOptionSelected(undefined);
            set_selected(undefined);
        }else{
            onOptionSelected&&onOptionSelected(title);
            set_selected({de:title,en:""});
        }
    };

    const _render_options =(x:string,i:number) => (
                <Option key={x} onSelect={onSelect} selected={selected?.de===x} title={x}  index={i}/>
    )

    return (
        <View pointerEvents={reactive_states.includes(btn_state)?'none':'auto'} style={styles.container}> 
            <View style={[default_styles.row,styles.text_container]}>
                {sentence.map(_render_words_)}
            </View>
            <View style={styles.option_container}>
                {options.map(_render_options)}
            </View>
        </View>
    )
});

interface SelectedWordProps {
    en?:string
    de?:string,
    btn_state:'disabled'|'active'|'right_answer'|'wrong_answer'
};


interface OptionProps {
    title:string,
    selected:boolean
    index:number,
    onSelect?(title:string):void
}

const Option:React.FC<OptionProps> = React.memo(({title,index,selected,onSelect}) => {

    const onPress = () => onSelect&&onSelect(title);

    return (
        <Animated.View layout={CurvedTransition} style={styles.option_cover}>
            <Bouncy onPress={onPress} bounce={0.98}>
                <View style={[styles.selected,styles.option,!selected&&styles.shadow,{alignSelf:index%2==1?'flex-start':'flex-end',backgroundColor:selected?colors.gray:colors.white}]}>
                    <Text style={[styles.selected_text,{color:selected?colors.gray:colors.container}]}>{title}</Text>
                </View>
            </Bouncy>
        </Animated.View>
    )
},(p,n)=>p.selected===n.selected);


// change the bg of selected answer based on right or wrong
const get_color_by_states = (state:string):string => {
    if(state==='right_answer'){
        return colors.positive
    };
    return colors.negative;
};

const SelectedWord:React.FC<SelectedWordProps> = ({en,de,btn_state}) => {
    return (
        <>
            {!de&&<Animated.View entering={FadeInDown} exiting={FadeOutUp} layout={Layout}  style={[styles.space_fill,styles.margin]}/>}
            {de&&<Animated.View entering={FadeInDown.delay(200)} exiting={FadeOutUp} style={[styles.selected,styles.shadow,reactive_states.includes(btn_state)&&{backgroundColor:get_color_by_states(btn_state)}]}>
                    <Text style={[styles.selected_text,reactive_states.includes(btn_state)&&{color:colors.white}]}>{de}</Text>
                </Animated.View>}
        </>
    )
};

const Word:React.FC<word> = React.memo(({de}) => {
    return (
        <Animated.Text layout={Layout} style={[styles.text,styles.margin]}>{de}</Animated.Text>
    )
});

export default Question;


const styles = StyleSheet.create({
    container:{
        marginTop:hp(3)
    },
    option_cover:{
        width:'50%',
        justifyContent:'flex-end'
    },
    text_container:{
        alignSelf:'center',
        alignItems:'center',
        minHeight:hp(7)
    },
    space_fill:{
        width:'30%',
        paddingLeft:wp(7),
        paddingRight:wp(7),
        padding:wp(3),
        borderBottomWidth:1.2,
        borderColor:colors.white
    },
    margin:{
        marginLeft:wp(1.5),
        marginRight:wp(1.5)
    },
    text:{
        color:colors.white,
        fontSize:wp(5.5),
        fontWeight:'400',
        textDecorationLine:'underline',
        textDecorationStyle:'dotted',
    },
    selected:{
        backgroundColor:colors.white,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:wp(7.5),
        paddingRight:wp(7.5),
        padding:wp(4.2),
        borderRadius:wp(5),
        marginLeft:wp(2),
        marginRight:wp(2),
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    option:{
        margin:wp(2),
        alignSelf:'flex-start'
    },
    selected_text:{
        color:colors.container,
        fontSize:wp(4.5),
        fontWeight:'bold',
    },
    option_container:{
        alignSelf:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop:hp(4)
    }
});