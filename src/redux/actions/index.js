import * as actionType from './actionType'
import {ADDNEWCARDTOPLAYER, SELECTMULTIPLECARDS} from "./actionType";
import userData from "../../components/rummyTable/userData";

export const sortCards = (data,id,cardsSet,columnOrder) => ({
    type: "SORT_CARDS", payload: data , id:id, cardsSet:cardsSet,columnOrder:columnOrder
})

export const updateCradsByDnD = (data) => ({
    type: "UPDATE_DND", payload: data
})
export const insterNewCardToPlayer = (data) => ({
    type: ADDNEWCARDTOPLAYER, payload: data
})

export const selectMultiCards = (data) => ({
    type: "SELECTMULTIPLECARDS", payload: data
})

export const dropedCardsByPlayer = (data) => ({
    type: "DROPEDCARDS", payload: data
})

export const removeClosedCards = (data) => ({
    type: "REMOVECLOSEDCARDS", payload: data
})

export const removeDropedCardByPlayer = (data) => ({
    type: "REMOVEDROPEDCARDBYPLAYER", payload: data
})

export const setCardsInSeqAndSet = (data,cardData) =>({
 type: "SETCARDSINSEQUENCEANDSET",  payload :data, data: cardData
})

export const storePlayerCards = (data) => ({
    type: "STOREPLAYERCARDS", payload: data
})