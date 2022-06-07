// import {sequence} from "./DragNDrop/sequence";
//
// const findSetsFromPlayerCards = (cards) =>{
//     let repeatednumber = {};
//     for(let card in cards){
//         if(repeatednumber[cards[card].index] === undefined){
//             repeatednumber[cards[card].index] = [cards[card].id]
//         }else{
//             repeatednumber[cards[card].index].push(cards[card].id)
//         }
//     }
//     let sets = [];
//     let others =[];
//     for(let ids in repeatednumber){
//         if(repeatednumber[ids].length >= 3) {
//             sets.push(repeatednumber[ids])
//         }else{
//             others.push(repeatednumber[ids])
//         }
//     }
//     return {sets, others}
// }
//
// const getArrayForSeq = (state) => {
//     let cardType = ["❤", "♣", "♦", "♠"];
//     let concat = [];
//     for (let type of cardType) {
//         let cardSet = {};
//         for (let card in state) {
//             if (state[card].icon === type) {
//                 cardSet[card] = state[card]
//             }
//         }
//         let sortedSet = Object.values(cardSet).sort((a, b) => a.index - b.index)
//         concat.push(sortedSet);
//     }
//     return findSequenceFromPlayerCards(concat)
// }
//
// const findSequenceFromPlayerCards = (concat) =>{
//     // var seq = [];
//     var others = [];
//     var result = [];
//     let subSeq = []
//     for(let array of concat) {
//         for (let i = 0; i <= array.length - 1; i++) {
//             if (i < array.length - 1 && array[i].index + 1 == array[i + 1].index) {
//                 subSeq.push(array[i].id)
//             } else if (i > 0 && array[i].index - 1 == array[i - 1].index) {
//                 subSeq.push(array[i].id);
//             } else {
//                 if (subSeq.length > 0) {
//                     result.push(subSeq);
//                     subSeq = [];
//                 }
//                 others.push(array[i])
//             }
//         }
//     }
//     return {
//         others,
//         result
//     }
// }
// const getColumns= (Sequence, sets, invalid,count) =>{
//     let newColumn = {}
//     let columnOrdr = []
//     //===============this is for sequence===============
//     if(!!Sequence.length) {
//     if(Array.isArray(Sequence[0])){
//         for(let seq of Sequence){
//             newColumn[count] = {id:count,cardsId:seq}
//             columnOrdr.push(count)
//             count++;
//         }
//     }else{
//         newColumn[count] = {id:count,cardsId:Sequence}
//         columnOrdr.push(count)
//         count++
//     }
//     }
//     //=======this is for sets================
//     if(!!sets.length) {
//         if (Array.isArray(sets[0])) {
//             for (let set of sets) {
//                 newColumn[count] = {id: count, cardsId: set}
//                 columnOrdr.push(count)
//
//                 count++;
//             }
//         } else {
//             newColumn[count] = {id: count, cardsId: sets}
//             columnOrdr.push(count)
//
//             count++
//         }
//     }
// //    =============== invalid ===============
//     if(!!invalid.length) {
//         if (Array.isArray(invalid[0])) {
//             for (let ivld of invalid) {
//                 newColumn[count] = {id: count, cardsId: ivld}
//                 columnOrdr.push(count)
//
//                 count++;
//             }
//         } else {
//             newColumn[count] = {id: count, cardsId: invalid}
//             columnOrdr.push(count)
//
//             count++
//         }
//     }
//
//  return {newColumn,columnOrdr}
// }
// // export const setOrSequenceCards = (cards) =>{
// //     let SequenceOfCards = getArrayForSeq(cards)
// //     // console.log(SequenceOfCards)
// //    let setOfCards =  findSetsFromPlayerCards(SequenceOfCards.others)
// //     let Sequence = SequenceOfCards.result;
// //     let invalid = setOfCards.others.flat()
// //     let sets = setOfCards.sets;
// //
// //     let count = 1;
// //     let result  = getColumns(Sequence, sets, invalid,count)
// //     return result
// // }
//
// export  function  setOrSequenceCards(cards){
//     console.log("Working!!!")
//     let SequenceOfCards = getArrayForSeq(cards)
//     // console.log(SequenceOfCards)
//     let setOfCards =  findSetsFromPlayerCards(SequenceOfCards.others)
//     let Sequence = SequenceOfCards.result;
//     let invalid = setOfCards.others.flat()
//     let sets = setOfCards.sets;
//
//     let count = 1;
//     let result  = getColumns(Sequence, sets, invalid,count)
//     return result
// }

import {type} from "@testing-library/user-event/dist/type";

function gettingHand(cards) {
    let Hand = [];
    for (let card in cards.handCards) {
        Hand.push(cards.handCards[card].index)
    }
    return Hand
}
function getColumnCardIds(setAndSequence,cardInHand){
    let columns = {}
    let columnOrder = []
    let id= 1;
    for(let sorts in setAndSequence){
        if(typeof  setAndSequence[sorts][0] === 'object') {
            for (let cardIds of setAndSequence[sorts]) {
                columns[id] = {id: id, cardsId: cardIds}
                columnOrder.push(id)
                id++
            }
        }else{
            columns[id] = {id: id, cardsId: setAndSequence[sorts]}
            columnOrder.push(id)
            id++
        }
    }
    return {columns,columnOrder};
}

export function setOrSequenceCards(cards, wildCard, cardInHand) {

    var hand = gettingHand(cards);
    hand.sort((a, b) => a - b);
console.log(hand)
    const pureSequences = getPureSequences(hand, 3);
    const impureSequences = getImpureSequences(hand, pureSequences, 2, wildCard);
    const sets = getSets(pureSequences, impureSequences,null, hand, 3);
    const invalidCards = getInvalidCards(pureSequences, impureSequences, sets, hand);

    console.log("Hand :: " + (hand));
    console.log("Pure Sequences :: " + pureSequences);
    console.log("Impure Sequences :: " + impureSequences);
    console.log("Sets :: " + sets);
    console.log("Invalid Cards :: " + invalidCards);
   return  getColumnCardIds({pureSequences, impureSequences, sets, invalidCards},cardInHand)
}

function getPureSequences(hand, min) {
    var sequences = [];
    var sequence = [];
    for (let i = 1; i < hand.length; i++) {
        if (getSuit(hand[i]) === getSuit(hand[i - 1]) && (hand[i] - hand[i - 1]) === 1) {
            sequence.push(hand[i - 1]);
            if (i === hand.length - 1) {
                sequence.push(hand[i]);
                if (sequence.length >= min) {
                    sequences.push(sequence);
                }
            }
        } else {
            sequence.push(hand[i - 1]);
            if (sequence.length >= min) {
                sequences.push(sequence);
            }
            sequence = [];
        }
    }
    return sequences;
}

function getImpureSequences(hand, pureSequences, min, wildCard) {
    let sequences = [];
    let sequence = [];
    let pureSequenceCards = [];
    for (let pureSequence of pureSequences) {
        pureSequenceCards.push(pureSequence);
    }

    let concat = pureSequenceCards.flat();
    let hands = hand.filter((el) => {
        return !concat.includes(el);
    });
    let  wildCardArray  = getWildCards(hands, wildCard)
        wildCardArray.push(53)
    for (let i = 1; i < hands.length; i++) {

        if (getSuit(hands[i]) === getSuit(hands[i - 1]) && ((hands[i] - hands[i - 1]) === 1 ||  (hands[i] - hands[i - 1]) === 2)) {
            sequence.push(hands[i - 1]);
            if (i === hands.length - 1) {
                sequence.push(hands[i]);
                if (sequence.length >= min) {
                    let index = 0;
                    for(let data of wildCardArray) {
                        if (hands.includes(data) && data != -1 && !sequence.includes(data)) {
                            sequence.push(data)
                            wildCardArray[index] = -1;
                            hands[hands.indexOf(data)] = -1;
                            sequences.push(sequence);
                            break;
                        }
                        index++;
                    }
                }

            }
        } else {
            sequence.push(hands[i - 1]);
            if (sequence.length >= min) {
                let index = 0;
                for(let data of wildCardArray) {
                    if (hands.includes(data) && data != -1 && !sequence.includes(data)) {
                        sequence.push(data)
                        wildCardArray[index] = -1;
                        hands[hands.indexOf(data)] = -1;
                        sequences.push(sequence);
                        break;
                    }
                    index++;
                }
            }
            sequence = [];
        }
    }
    return sequences;
}

function getSets(pureSequences, impureSequences, srd,hands, min) {
    let sets = [];
    let set = [];
    let usedCards = getUsedCards(pureSequences, impureSequences,null, hands)
    let hand = hands.filter((el) => {
        return !usedCards.includes(el);
    });

    for (let i = 0; i < hand.length; i++) {
        if (hand[i] === 53 || hand[i] === 54 || hand[i] === -1) continue;
        set.push(hand[i]);
        if (hand[i] <= 13) {
            if (hand.includes(hand[i] + 13)) {
                set.push(hand[i] + 13);
                hand[hand.indexOf(hand[i] + 13)] = -1

            }
            if (hand.includes( hand[i] + 26)) {
                set.push(hand[i] + 26);
                hand[hand.indexOf(hand[i] + 26)] = -1
            }
            if (hand.includes( hand[i] + 39)) {
                set.push(hand[i] + 39);
                hand[hand.indexOf(hand[i] + 39)] = -1
            }
        } else if (hand[i] <= 26) {
            if (hand.includes( hand[i] + 13)) {
                set.push(hand[i] + 13);
                hand[hand.indexOf(hand[i] + 13)] = -1
            }
            if (hand.includes( hand[i] + 26)) {
                set.push(hand[i] + 26);
                hand[hand.indexOf(hand[i] + 26)] = -1
            }
            if (hand.includes( hand[i] + 39)) {
                set.push(hand[i] + 39);
                hand[hand.indexOf(hand[i] + 39)] = -1
            }
        }

        if (set.length >= min) {
            sets.push(set);
        }
        set = [];
    }
    return sets;
}


function getInvalidCards(pureSequences, impureSequences, sets, hand) {
    let hands = hand;
    // let  hands = Arrays.stream(hand).boxed().collect(Collectors.toList());
    let usedCards = getUsedCards(pureSequences, impureSequences, sets, hand)

    let invalid = hands.filter((el) => {
        return !usedCards.includes(el);
    });
    return invalid;
}

function contains(arr, key) {
    return arr.includes(key)
}

function getSuit(card) {
    return Math.floor((card-1) / 13);
}

function getUsedCards(pureSequences, impureSequences, sets, hand){
    let usedCards = [];
    for (let pureSequence of pureSequences) {
        usedCards.push(pureSequence);
    }
    for (let impureSequence of impureSequences) {
        usedCards.push(impureSequence);
    }
    if(sets) {
        for (let set of sets) {
            usedCards.push(set);
        }
    }
    let concat = usedCards.flat();
    return concat;
}

function getWildCards(cards, wildCard) {
    let wildCardArray = [];
console.log(wildCard)
    if (contains(cards, wildCard)) {
        wildCardArray.push(wildCard)
    }
    if (contains(cards, wildCard + 13)) {
        wildCardArray.push(wildCard + 13)
    }
    if (contains(cards, wildCard + 26)) {
        wildCardArray.push(wildCard + 26)
    }
    if (contains(cards, wildCard + 39)) {
        wildCardArray.push(wildCard + 39)
    }
    if (contains(cards, wildCard - 13)) {
        wildCardArray.push(wildCard - 13)
    }
    if (contains(cards, wildCard - 26)) {
        wildCardArray.push(wildCard - 26)
    }
    if (contains(cards, wildCard - 39)) {
        wildCardArray.push(wildCard - 39)
    }

  return wildCardArray;
}