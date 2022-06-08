import * as cardsType from "../actions/actionType";
import arrayShuffle from "array-shuffle";
import {cardType, cardNumber, cardDataArray} from "../utils/cardDetailsUtil";
import {STOREPLAYERCARDS} from "../actions/actionType";

const initialState = [{
    userId: 1, userName: "player1", userCash: 300, userTurn: false, userCardSet: [], userPlayTime: "play1", playerStatus : "Redy",activePlayer : false
}, {
    userId: 2, userName: "player2", userCash: 300, userTurn: false, userCardSet: [], userPlayTime: "play2", playerStatus : "Redy",activePlayer : false
}]

const cardDataReducer = (state = initialState, action) => {
    switch (action.type) {
        // case cardsType.SORT_CARDS:
        //     return {
        //         ...state,
        //         columns: action.payload}
        // case cardsType.UPDATE_DND:
        //     return {
        //         ...action.payload
        //     }
        case cardsType.STOREPLAYERCARDS:
            return {

            }
        default:
            return state;
    }
}

export default cardDataReducer;