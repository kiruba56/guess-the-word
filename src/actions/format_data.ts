import shuffle from 'lodash/shuffle';
import { Question } from '../types/question';


const format = (data:Question):Question => {
    // console.log(data.sentence, data.qustion_index.answer);
    const random_words = shuffle([...data.random_words,data.sentence[data.qustion_index.sentence].de]);
    return {...data,random_words};
};

export {
    format
}