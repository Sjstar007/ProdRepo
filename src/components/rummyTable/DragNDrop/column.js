import React from 'react'
import styled from 'styled-components'
import Task from './task'
import {Droppable} from 'react-beautiful-dnd'
import {sequence} from './sequence';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  //padding: 8px;
`
const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`
const grid = 8;
const getListStyle = (isDraggingOver) => ({
    display: "flex", padding: grid,
});

export default class Column extends React.Component {

    render() {
        return (<Container style={{border: "none", width: "auto"}}>
            <h5 style={{color:"#fff"}}>{sequence(this.props.tasks)}</h5>
            <Droppable droppableId={this.props.column.id} type="TASK" direction="horizontal"
            >
                {(provided, snapshot) => (<TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    // isDraggingOver={snapshot.isDraggingOver}
                    style={getListStyle(snapshot.isDraggingOver)}

                >
                    {this.props.tasks.map((task, index) => (<Task key={task.id}  cardDetails={task} index={index}/>))}
                    {provided.placeholder}
                </TaskList>)}
            </Droppable>


        </Container>)
    }
}
