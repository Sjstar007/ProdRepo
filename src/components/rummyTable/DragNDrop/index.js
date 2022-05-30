import React, {useEffect, useState} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux';
import {getInitialState, sortCards, updateCradsByDnD} from '../../../redux/actions/index.js'
import store from '../../../redux/store';
import styled from 'styled-components'
import Column from "./column";

export default function Dnd() {
    let dispatch = useDispatch();

    const Container = styled.div`display: flex;`
    const [cardStateData,setCardStateData] = useState(useSelector(state => state.card_data));

    const setColumns = (concat) => {
        var columnid = 1;
        var newState = {};
        for (let i of concat) {
            let crdid = [];
            for (let arr of i) {
                crdid.push(arr.id)
            }
            newState[columnid] = {
                id: `${columnid}`, taskIds: crdid
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
            for (let card in state.tasks) {
                if (state.tasks[card].icon === type) {
                    cardSet[card] = state.tasks[card]
                }
            }
            let sortedSet = Object.values(cardSet).sort((a, b) => a.index - b.index)
            concat.push(sortedSet);
        }
        let result = setColumns(concat)
        return result;
    }
    useEffect(() => {
        const data = store.getState().card_data
        let result = getClumnData(data)
        console.log(result)
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
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start, taskIds: newTaskIds
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
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start, taskIds: startTaskIds
        }
        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish, taskIds: finishTaskIds
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
        <Container style={{alignSelf: "center"}}>
            {cardDetails.columnOrder.map(columnId => {
                const column = cardDetails.columns[columnId]
                const tasks = column.taskIds.map(taskId => cardDetails.tasks[taskId])
                return (<div className="openCards">
                    <Column key={column.id} column={column} tasks={tasks}/>
                </div>)
            })}
        </Container>
    </DragDropContext>)
}

