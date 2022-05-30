import * as cardsType from "../actions/actionType";
import arrayShuffle from "array-shuffle";
import {cardType, cardNumber, cardDataArray} from "../utils/cardDetailsUtil";

const initialState = [{
    userId: 1, userName: "player1", userCash: 300, userTurn: false, userCardSet: [], userPlayTime: "play1", playerStatus : "Redy"
}, {
    userId: 2, userName: "player2", userCash: 300, userTurn: false, userCardSet: [], userPlayTime: "play2", playerStatus : "Redy"
}]

const cardDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardsType.SORT_CARDS:
            return {
                ...state,
                columns: action.payload}
        case cardsType.UPDATE_DND:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export default cardDataReducer;