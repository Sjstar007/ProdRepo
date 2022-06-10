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
const cardDeack = getObjectForCards(cardDataArray);
const allCards = arrayShuffle(cardDataArray);
const object1 = getObjectForCards(allCards.splice(0, 13))
const object2 = getObjectForCards(allCards.splice(0, 13))
const restOfCards = getObjectForCards(allCards)

function randomIntFromInterval(min, max) { // min and max included
    let a = Math.floor(Math.random() * (max - min + 1) + min)
    return a;
}

const initialState = {
    deckOfCards: cardDeack, handCards: {}, columns: {}, // Facilitate reordering of the columns
    columnOrder: [], restCards: restOfCards, DropedCards: [], wildCards: randomIntFromInterval(1, 13),

    userData: [{
        userId: 1, userName: "player1", userCash: 300, userTurn: false, userCardSet: object1, userCardColumnSet: {
        }, columnOrder: ['1', '2', '3', '4'], userPlayTime: "play1", playerStatus: "Redy", activePlayer: false
    }, {
        userId: 2,
        userName: "player2",
        userCash: 300,
        userTurn: false,
        userCardSet: object2,
        userPlayTime: "play2",
        playerStatus: "Redy",
        activePlayer: false,
        columnOrder: ['1', '2', '3', '4'],
        userCardColumnSet: {

        },
    }]
}

const cardDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardsType.SORT_CARDS:
            return {
                ...state,
                handCards: action.cardsSet,
                columns: action.payload,
                columnOrder: action.columnOrder
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
                ...state, DropedCards: action.payload
            }
        case cardsType.REMOVECLOSEDCARDS:
            return {
                ...state, restCards: action.payload
            }
        case cardsType.REMOVEDROPEDCARDBYPLAYER:
            return {
                ...state, handCards: action.payload
            }
        case cardsType.SETCARDSINSEQUENCEANDSET:
            return {
                ...state, columns: action.payload.columns, columnOrder: action.payload.columnOrder
            }
        default:
            return state;
    }
}

export default cardDataReducer;