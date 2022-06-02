import * as actionType from './actionType'
import {ADDNEWCARDTOPLAYER, SELECTMULTIPLECARDS} from "./actionType";

export const sortCards = (data) => ({
    type: "SORT_CARDS", payload: data
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

export const setCardsInSeqAndSet = (data) =>({
 type: "SETCARDSINSEQUENCEANDSET",  payload :data
})