import React, { Component } from 'react'
import { http } from '../utils/Http'
import { connect } from 'react-redux';
import { ToDo } from './ToDo'
import AddNewTodo from './AddNewTodo'
import { turnObjectIntoArray } from '../utils/utils'
import { mapStateToProps } from '../store/containers/Todos'
import '../App.css'

class ToDoList extends Component {

  async componentDidMount(){
    try {
      const { dispatch }:any = this.props
      const response:any = await http.get('/todos')
      const todos:Array<object> = turnObjectIntoArray(response.todos)
      dispatch({
        type: 'ADD_TODO_LIST',
        todos
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  private renderList():JSX.Element[] {
    const { todos }:any = this.props
    return todos.map((todo:any) => 
      <ToDo 
        key={todo.id}
        id={todo.id} 
        text={todo.text} 
        isCompleted={todo.isCompleted}
        urgency={todo.urgency}
        created={todo.created}
        updated={todo.updated}
      />
    )
  }

  public render():JSX.Element {
    return (
      <div className="todo-list-container">
        <div>
          <AddNewTodo />
        </div>
        <div className="todo-list">
          { this.renderList() }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ToDoList) 