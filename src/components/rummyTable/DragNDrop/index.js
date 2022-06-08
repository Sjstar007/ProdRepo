import React, {useEffect, useState} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux';
import {getInitialState, sortCards, updateCradsByDnD} from '../../../redux/actions/index.js'
import store from '../../../redux/store';
import styled from 'styled-components'
import Column from "./column";

export default function Dnd(currentPlayerChance) {
    let dispatch = useDispatch();
    console.log(currentPlayerChance)
    const Container = styled.div`display: flex;`
    const [cardStateData,setCardStateData] = useState(useSelector(state => state.card_data));
    const cardDetail = useSelector(state => state.card_data);
    const userData = useSelector(state => state.user_data);
    const [wildCards,setWildCards] = useState([]);

    const getWildCards = () =>{
        let wildCardArray = [];
        for(let i=0;i<52;i+=13){
            wildCardArray.push(cardDetail.wildCards+i)
        }
        setWildCards(wildCardArray)
    }
    const setColumns = (concat) => {
        var columnid = 1;
        var newState = {};
        for (let i of concat) {
            let crdid = [];
            for (let arr of i) {
                crdid.push(arr.index)
            }
            newState[columnid] = {
                id: `${columnid}`, cardsId: crdid
            }
            columnid++;
        }
        return newState;
    }
    const getClumnData = (state) => {
        let cardType = ["❤", "♣", "♦", "♠"];
        let concat = [];
        for (let type of cardType) {
            let cardSet = {};
            for (let card in state.handCards) {
                if (state.handCards[card].icon === type) {
                    cardSet[card] = state.handCards[card]
                }
            }
            let sortedSet = Object.values(cardSet).sort((a, b) => a.index - b.index)
            concat.push(sortedSet);
        }
        let result = setColumns(concat)
        return result;
    }
    const changePlayerCards = (currentPlayer) => {

    }

    useEffect(()=>{
        changePlayerCards(currentPlayerChance)
    },[currentPlayerChance])
    useEffect(() => {
        const data = store.getState().card_data
        let result = getClumnData(data)
        getWildCards()
        dispatch(sortCards(result))
    }, [])

    const cardDetails = useSelector(state => state.card_data);
    const onDragEnd = result => {

        const {destination, source, draggableId} = result

        if (!destination) {
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }
        const start = cardDetails.columns[source.droppableId]
        const finish = cardDetails.columns[destination.droppableId]

        if (start === finish) {
            const newcardsId = Array.from(start.cardsId)
            newcardsId.splice(source.index, 1)
            newcardsId.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start, cardsId: newcardsId
            }
            const newState = {
                ...cardDetails, columns: {
                    ...cardDetails.columns, [newColumn.id]: newColumn
                }
            }
            console.log(newState)
            dispatch(updateCradsByDnD(newState))
            // this.setState(newState)
            return
        }

        // Moving from one list to another
        const startcardsId = Array.from(start.cardsId)
        startcardsId.splice(source.index, 1)
        const newStart = {
            ...start, cardsId: startcardsId
        }
        const finishcardsId = Array.from(finish.cardsId)
        finishcardsId.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish, cardsId: finishcardsId
        }
        const newState = {
            ...cardDetails, columns: {
                ...cardDetails.columns, [newStart.id]: newStart, [newFinish.id]: newFinish
            }
        }
        console.log(newState)
        dispatch(updateCradsByDnD(newState))
        // this.setState(newState)
    }

    return (<DragDropContext onDragEnd={onDragEnd}>
        <Container style={{alignSelf: "center",height: '100%'}}>
            {cardDetails.columnOrder.map(columnId => {
                const column = cardDetails.columns[columnId]
                const handCards = column.cardsId.map(taskId => cardDetails.handCards[taskId])
                return (<div className="openCards">
                    <Column key={column.id} column={column} handCards={handCards} wildCards={wildCards}/>
                </div>)
            })}
        </Container>
    </DragDropContext>)
}

