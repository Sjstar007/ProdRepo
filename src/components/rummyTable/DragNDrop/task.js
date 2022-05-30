import React,{useState} from 'react'
import styled from 'styled-components'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {useSelector,useDispatch} from "react-redux";
import {selectMultiCards} from "../../../redux/actions";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
`

export default function Task ({key, cardDetails, index}) {
    let dispatch = useDispatch();
    const [cardStateData,setCardStateData] = useState(useSelector(state => state.card_data));
    const  clickMe = (event,cards) =>{
        event.preventDefault()
        cards.isSelected = true;
        cardStateData.tasks[cards.id] = cards
        dispatch(selectMultiCards(cardStateData.tasks))
        setCardStateData({...cardStateData, tasks: cardStateData.tasks})
    }
        const isDragDisabled = cardDetails.id === false
        return (
            <Draggable
                draggableId={cardDetails.id}
                index={index}
                isDragDisabled={isDragDisabled}
            >

                {(provided, snapshot) => (<div
                    className={cardDetails.color === "red" ? "openCard red" : "openCard "}
                    style={{
                        background: cardDetails.isSelected && "lightgrey"
                    }}
                    onClick={e => clickMe(e,cardDetails)}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={isDragDisabled}
                >
                    {/*{this.props.task.icon+this.props.task.cardName}*/}
                    <span className="number top">{cardDetails.cardName}</span>
                    <p className="suit_top">{cardDetails.icon}</p>
                    <p className="suit">{cardDetails.icon}</p>
                    <span className="number bottom">{cardDetails.cardName}</span>

                </div>)}
            </Draggable>
        )
}
