import React from 'react';
import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import Action from './src/components/action';
import Example from './src/components/example';
import Question from './src/components/question';
import default_styles from './src/theme/default_styles';
import { hp, wp } from './src/utils/responsive';

interface Props {
}

class App extends React.PureComponent<Props> {
    constructor(props:Props){
        super(props);
    };
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

class Exersice extends React.PureComponent<Props>{
  render(): React.ReactNode {
      return (
        <View >
          <Example sentence={["The",'house','is','small.']} highlighted={1}/>
          <Question answer={1}
          options={["Hello","ist","Look big","Hause"]}
          sentence={[
            {
               en:"The",
               de:"Das"
            },
            {
              en:"Hause",
              de:'Cat'
            },
            {
              en:"is",
              de:'ist'
            },
            {
              en:"cute",
              de:'kelin.'
            }
          ]}/>
          <Action />
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