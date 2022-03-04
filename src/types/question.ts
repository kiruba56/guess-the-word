import { word } from "./word";

export interface Question {
    example_sentence:string[],
    random_words:string[],
    sentence:word[],
    qustion_index:Index
}


interface Index {
    example:number,
    sentence:number
};
