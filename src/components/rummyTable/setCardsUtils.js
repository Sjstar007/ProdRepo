import {sequence} from "./DragNDrop/sequence";

const findSetsFromPlayerCards = (cards) =>{
    let repeatednumber = {};
    for(let card in cards){
        if(repeatednumber[cards[card].index] === undefined){
            repeatednumber[cards[card].index] = [cards[card].id]
        }else{
            repeatednumber[cards[card].index].push(cards[card].id)
        }
    }
    let sets = [];
    let others =[];
    for(let ids in repeatednumber){
        if(repeatednumber[ids].length >= 3) {
            sets.push(repeatednumber[ids])
        }else{
            others.push(repeatednumber[ids])
        }
    }
    return {sets, others}
}

const getArrayForSeq = (state) => {
    let cardType = ["❤", "♣", "♦", "♠"];
    let concat = [];
    for (let type of cardType) {
        let cardSet = {};
        for (let card in state) {
            if (state[card].icon === type) {
                cardSet[card] = state[card]
            }
        }
        let sortedSet = Object.values(cardSet).sort((a, b) => a.index - b.index)
        concat.push(sortedSet);
    }
    return findSequenceFromPlayerCards(concat)
}

const findSequenceFromPlayerCards = (concat) =>{
    // var seq = [];
    var others = [];
    var result = [];
    let subSeq = []
    for(let array of concat) {
        for (let i = 0; i <= array.length - 1; i++) {
            if (i < array.length - 1 && array[i].index + 1 == array[i + 1].index) {
                subSeq.push(array[i].id)
            } else if (i > 0 && array[i].index - 1 == array[i - 1].index) {
                subSeq.push(array[i].id);
            } else {
                if (subSeq.length > 0) {
                    result.push(subSeq);
                    subSeq = [];
                }
                others.push(array[i])
            }
        }
    }
    return {
        others,
        result
    }
}
const getColumns= (Sequence, sets, invalid,count) =>{
    let newColumn = {}
    let columnOrdr = []
    //===============this is for sequence===============
    if(!!Sequence.length) {
    if(Array.isArray(Sequence[0])){
        for(let seq of Sequence){
            newColumn[count] = {id:count,taskIds:seq}
            columnOrdr.push(count)
            count++;
        }
    }else{
        newColumn[count] = {id:count,taskIds:Sequence}
        columnOrdr.push(count)
        count++
    }
    }
    //=======this is for sets================
    if(!!sets.length) {
        if (Array.isArray(sets[0])) {
            for (let set of sets) {
                newColumn[count] = {id: count, taskIds: set}
                columnOrdr.push(count)

                count++;
            }
        } else {
            newColumn[count] = {id: count, taskIds: sets}
            columnOrdr.push(count)

            count++
        }
    }
//    =============== invalid ===============
    if(!!invalid.length) {
        if (Array.isArray(invalid[0])) {
            for (let ivld of invalid) {
                newColumn[count] = {id: count, taskIds: ivld}
                columnOrdr.push(count)

                count++;
            }
        } else {
            newColumn[count] = {id: count, taskIds: invalid}
            columnOrdr.push(count)

            count++
        }
    }

 return {newColumn,columnOrdr}
}
// export const setOrSequenceCards = (cards) =>{
//     let SequenceOfCards = getArrayForSeq(cards)
//     // console.log(SequenceOfCards)
//    let setOfCards =  findSetsFromPlayerCards(SequenceOfCards.others)
//     let Sequence = SequenceOfCards.result;
//     let invalid = setOfCards.others.flat()
//     let sets = setOfCards.sets;
//
//     let count = 1;
//     let result  = getColumns(Sequence, sets, invalid,count)
//     return result
// }

export  function  setOrSequenceCards(cards){
    console.log("Working!!!")
    let SequenceOfCards = getArrayForSeq(cards)
    // console.log(SequenceOfCards)
    let setOfCards =  findSetsFromPlayerCards(SequenceOfCards.others)
    let Sequence = SequenceOfCards.result;
    let invalid = setOfCards.others.flat()
    let sets = setOfCards.sets;

    let count = 1;
    let result  = getColumns(Sequence, sets, invalid,count)
    return result
}