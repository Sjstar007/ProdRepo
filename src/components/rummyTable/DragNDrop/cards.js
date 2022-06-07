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

export default function Cards ({key, cardDetails, index, wildCard}) {
    let dispatch = useDispatch();
    const [cardStateData,setCardStateData] = useState(useSelector(state => state.card_data));
    const  clickMe = (event,cards) =>{
        event.preventDefault()
        cards.isSelected = true;
        cardStateData.handCards[cards.index] = cards
        dispatch(selectMultiCards(cardStateData.handCards))
        setCardStateData({...cardStateData, handCards: cardStateData.handCards})
    }
        const isDragDisabled = cardDetails.index === false

        return (
            <Draggable
                draggableId={`${cardDetails.index}`}
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
                    <p className="suit_top">{wildCard.includes(cardDetails.index) || cardDetails.index === 53 ? <img src="https://img.icons8.com/color/48/undefined/joker.png"/> : cardDetails.icon}</p>
                    <p className="suit">{cardDetails.icon}</p>
                    <span className="number bottom">{cardDetails.cardName}</span>

                </div>)}
            </Draggable>
        )
}
