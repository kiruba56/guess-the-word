import { StyleSheet } from 'react-native';
import { hp, wp } from '../utils/responsive';
import colors from './colors';


export default StyleSheet.create({
    flex:{
        flex:1,
        backgroundColor:colors.background,
        justifyContent:'flex-end'
    },
    container:{
        flex:.80,
        backgroundColor:colors.container,
        borderTopLeftRadius:wp(8),
        borderTopRightRadius:wp(8),
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:hp(6)
    },
    text:{
        color:colors.white,
        fontSize:wp(5)
    },
    align_space_between:{
        flex:1,
        justifyContent:'space-between',
    },
    row:{
        flexDirection:'row',
        alignSelf:'center'
    }
});

