import React from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Action from './action';
import Example from './example';
import Question from './question';
import { Question as QT} from '../types/question';
import { format } from '../actions/format_data';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface Props {
}


interface ExersiceState {
    btn_state:'disabled'|'active'|'right_answer'|'wrong_answer',
    questions:QT[],
    current_index:number
};
  
  class Exersice extends React.PureComponent<Props,ExersiceState>{
    private _selected_: undefined|string;
    private subscriber:any;
    constructor(props:Props){
      super(props);
      this.state = {
        btn_state:'disabled',
        questions:[],
        current_index:0
      }
    };


    componentDidMount(){    
        this._get();
    };

    componentWillUnmount(){
        this.subscriber&&this.subscriber();
    };

    _get = async():Promise<void> => {
        try{
            // authenticate the user before accessing the firestore
            if(!auth().currentUser){
                await auth().signInAnonymously();
            }
            this.subscriber = firestore().collection('questions').limit(5).onSnapshot((snap)=>{
                let questions:QT[] = [];
                snap.docs.map((d:any)=>{
                    const _data = format(d.data());
                    questions.push(_data);
                });
                this.setState({questions});
            });
        }catch(e){

        }
    };

    _next = () => {
        this.setState((p)=>{
            const new_index = p.current_index===p.questions.length-1?0:p.current_index+1;
            return{btn_state:'disabled',current_index:new_index};
        });
    };

    _validate = () => {
        if(!this._selected_){
            return;
        }
        if(['right_answer','wrong_answer'].includes(this.state.btn_state)){
            return this._next();
        };
        const q = this.state.questions[this.state.current_index];
        if(this._selected_=== q.sentence[q.qustion_index.sentence].de){
            return this.setState({btn_state:'right_answer'})
        };
        this.setState({btn_state:'wrong_answer'})
    };
  
    _on_select = (selected:string|undefined) => {
        this._selected_ = selected;
        if(selected&&this.state.btn_state==='disabled'){
            return this.setState({btn_state:'active'})
        };
        if(!selected&&this.state.btn_state==='active'){
          return this.setState({btn_state:'disabled'});
        };
    };
  
    render(): React.ReactNode {
        if(this.state.questions.length===0){
            return <View />
        };
        const q = this.state.questions[this.state.current_index];
        return (    
          <Animated.View key={`q_${this.state.current_index}`} entering={FadeInDown}>
            <Example sentence={q.example_sentence} highlighted={q.qustion_index.example}/>
            <Question btn_state={this.state.btn_state} answer={Number(q.qustion_index.sentence)} options={q.random_words} onOptionSelected={this._on_select} sentence={q.sentence}/>
            <Action onPress={this._validate} answer={q.sentence[q.qustion_index.sentence].de} btn_state={this.state.btn_state}/>
          </Animated.View>
        )
    }
  };
  

  export default Exersice;