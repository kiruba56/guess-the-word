import { word } from "./word";

export interface Question {
    // The sentence in english
    example_sentence:string[],
    // 3 random words to shuffle with right answer
    random_words:string[],
    // The sentence in german including the answer
    sentence:word[],
    qustion_index:Index
}


interface Index {
    // the index of the the word that need to be highlighted in example sentence
    example:number,
    // the index of the word that user need to guess
    sentence:number
};
