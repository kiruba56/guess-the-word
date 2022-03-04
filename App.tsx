import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Exersice from './src/components/exersise';
import default_styles from './src/theme/default_styles';
import { hp, wp } from './src/utils/responsive';

interface Props {
}

class App extends React.PureComponent<Props> {
   
    render() {
        return (
          <View style={default_styles.flex}>
              <View style={default_styles.container}>
                  <Text style={[default_styles.text,styles.subtitle]}>Fill in the missing word</Text>
                  <View style={[styles.inner_container]}>
                      <Exersice />
                  </View>
              </View>
          </View>
        )
    }
};


export default App;

const styles = StyleSheet.create({
    subtitle:{
        fontSize:wp(3.5),
        textAlign:'center'
    },
    inner_container:{
        flex:1,
        paddingTop:hp(2.5)
    }
});