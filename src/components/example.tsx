import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import colors from '../theme/colors';
import default_styles from '../theme/default_styles';
import { wp } from '../utils/responsive';

interface Props {
    sentence: string[];
    highlighted:number,
}
const Example: React.FC<Props>  = React.memo(({sentence=[],highlighted}) => {
    const total = sentence.length-1;
    const _render_words_ = (x:string,i:number) => <Text style={[styles.text,highlighted===i&&styles.text_higlighted]} key={x}>{x}{i!==total?' ':null}</Text>
    return (
        <View style={[default_styles.row]}>
            {sentence.map(_render_words_)}
        </View>
    );
});

export default Example;

const styles = StyleSheet.create({
    text_higlighted:{
        fontWeight:'600',
        textDecorationLine:'underline'
    },
    text:{
        color:colors.white,
        fontSize:wp(6.5),
        fontWeight:'400'
    }
});