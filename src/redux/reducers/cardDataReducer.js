import * as cardsType from "../actions/actionType";
import arrayShuffle from "array-shuffle";
import {cardType, cardNumber, cardDataArray} from "../utils/cardDetailsUtil";
import {REMOVECLOSEDCARDS, REMOVEDROPEDCARDBYPLAYER, REMOVEDROPEDCARDS} from "../actions/actionType";


const getObjectForCards = (cardarr) => {
    var cardData = {};
    for (let arr of cardarr) {
        let cardindex = arr.index
        let key = cardindex
        cardData[key] = arr
    }
    return cardData
}

const allCards = arrayShuffle(cardDataArray);
const object = getObjectForCards(allCards.splice(0, 13))
const restOfCards = getObjectForCards(allCards)

function randomIntFromInterval(min, max) { // min and max included
    let a = Math.floor(Math.random() * (max - min + 1) + min)
    // let joker = [];
    // for(let i = 0;i<52;i+=13){
    //     joker.push(i)
    // }
    // for(let j of joker){
    //     if(object[j]) {
    //        object[j].icon = '*'
    //         console.log(object[j])
    //     }
    // }
    return a;
}

const initialState = {
    handCards: object, columns: {
        '1': {
            id: '1', cardsId: []
            // cardsId: [1,2,4,5,7]
        }, '2': {
            id: '2', cardsId: []
        }, '3': {
            id: '3', cardsId: []
        }, '4': {
            id: '4', cardsId: []
        }
    }, // Facilitate reordering of the columns
    columnOrder: ['1', '2', '3', '4'],
    restCards: restOfCards,
    DropedCards: [],
    wildCards: randomIntFromInterval(1, 13),
}

const cardDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardsType.SORT_CARDS:
            return {
                ...state, columns: action.payload
            }
        case cardsType.UPDATE_DND:
            return {
                ...action.payload
            }
        case cardsType.ADDNEWCARDTOPLAYER:
            state.handCards[action.payload.index] = action.payload;
            let order = state.columnOrder.length + 1
            if (order <= 6) {
                state.columns[order] = {id: order, cardsId: [action.payload.index]}
                state.columnOrder.push(order)
            } else {
                state.columns[state.columnOrder.length].cardsId.push(action.payload.index)
            }
            return {
                ...state
            }
        case cardsType.SELECTMULTIPLECARDS:
            return {
                ...state, handCards: action.payload
            }
        case cardsType.DROPEDCARDS:
            return {
                ...state,
                DropedCards: action.payload
            }
        case cardsType.REMOVECLOSEDCARDS:
            return {
                ...state,
                restCards: action.payload
            }
        case cardsType.REMOVEDROPEDCARDBYPLAYER:
            return {
                ...state,
                handCards: action.payload
            }
        case cardsType.SETCARDSINSEQUENCEANDSET:
            return {
                ...state,
                columns: action.payload.columns,
                columnOrder: action.payload.columnOrder
            }
        default:
            return state;
    }
}

export default cardDataReducer;