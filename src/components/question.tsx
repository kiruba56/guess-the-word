import React, { useState } from 'react';
import {View,StyleSheet, Text} from 'react-native';
import colors from '../theme/colors';
import default_styles from '../theme/default_styles';
import { hp, wp } from '../utils/responsive';

interface word {
    en:string
    de:string
};

interface Props {
    sentence:word[],
    answer:number,
    options:string[]
}

const Question:React.FC<Props> = ({sentence=[], answer,options=[]}) => {

    const [selected,set_selected] = useState<word|undefined>();

    const _render_words_ = (x:word,i:number) => {
        if(answer===i){
            return <SelectedWord {...selected}/>
        };
        return (
            <Word {...x} key={x.de}/>
        )
    };

    const _render_options =(x:string,i:number) => (
        <View style={{
            width:'50%',
            justifyContent:'flex-end'
        }}>
            <Option selected={selected?.de===x} title={x} key={x} index={i}/>
        </View>
    )

    return (
        <View style={styles.container}> 
            <View style={[default_styles.row,styles.text_container]}>
                {sentence.map(_render_words_)}
            </View>
            <View style={styles.option_container}>
                {options.map(_render_options)}
            </View>
        </View>
    )
};

interface SelectedWordProps {
    en?:string
    de?:string
};


interface OptionProps {
    title:string,
    selected:boolean
    index:number
}

const Option:React.FC<OptionProps> = React.memo(({title,index,selected}) => {
    return (
        <View style={[styles.selected,styles.option,!selected&&styles.shadow,{alignSelf:index%2==1?'flex-start':'flex-end',backgroundColor:selected?colors.gray:colors.white}]}>
            <Text style={[styles.selected_text,{color:selected?colors.gray:colors.container}]}>{title}</Text>
        </View>
    )
},(p,n)=>p.selected===n.selected);

const SelectedWord:React.FC<SelectedWordProps> = ({en,de}) => {
    return (
        <>
            {!de&&<View style={[styles.space_fill,styles.margin]}/>}
            {de&&<View style={[styles.selected,styles.shadow]}>
                    <Text style={styles.selected_text}>{de}</Text>
                </View>}
        </>
    )
};

const Word:React.FC<word> = React.memo(({de}) => {
    return (
        <Text style={[styles.text,styles.margin]}>{de}</Text>
    )
});

export default Question;


const styles = StyleSheet.create({
    container:{
        marginTop:hp(3)
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