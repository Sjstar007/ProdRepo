import * as cardsType from "../actions/actionType";
import arrayShuffle from "array-shuffle";
import {cardType, cardNumber, cardDataArray} from "../utils/cardDetailsUtil";


const getObjectForCards = (cardarr) => {
    var cardData = {};
    for (let arr of cardarr) {
        let cardicon = arr.icon
        let cardname = arr.cardName
        let key = cardicon + cardname
        cardData[key] = arr
    }
    return cardData
}
const allCards = arrayShuffle(cardDataArray);
console.log(allCards)
const object = getObjectForCards(allCards.splice(0, 13))
const restOfCards = getObjectForCards(allCards)

const initialState = {
    tasks: object, columns: {
        '1': {
            id: '1', taskIds: []
            // taskIds: ['♣J','♦5','♠2', '♦3', '♣Q', '♠J']
        }, '2': {
            id: '2', taskIds: []
        }, '3': {
            id: '3', taskIds: []
        }, '4': {
            id: '4', taskIds: []
        }
    }, // Facilitate reordering of the columns
    columnOrder: ['1', '2', '3', '4'], restCards: restOfCards,
    DropedCards: []
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
            state.tasks[action.payload.id] = action.payload;
            let order = state.columnOrder.length + 1
            state.columns[order] = {id: order, taskIds: [action.payload.id]}
            state.columnOrder.push(order)
            return {
                ...state
            }
        case cardsType.SELECTMULTIPLECARDS:
            return {
                ...state, tasks: action.payload
            }
        case cardsType.DROPEDCARDS:
            return {
                ...state,
                DropedCards: action.payload
            }
        default:
            return state;
    }
}

export default cardDataReducer;