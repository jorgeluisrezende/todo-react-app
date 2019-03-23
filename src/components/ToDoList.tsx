import React, { Component } from 'react'
import { http } from '../utils/Http'
import { connect } from 'react-redux';
import { ToDo } from './ToDo'
import AddNewTodo from './AddNewTodo'
import { turnObjectIntoArray } from '../utils/utils'
import { mapStateToProps } from '../store/containers/Todos'
import { redirectToHome, showMessage } from '../utils/ErrorHandlers'
import '../App.css'

class ToDoList extends Component<{ history:any }> {
  http:any = new http()

  componentDidMount(){
    this.loadTodos()
  }

  private async loadTodos() {
    try {
      const { dispatch }:any = this.props
      const response:any = await this.http.get('/todos')
      const todos:Array<object> = turnObjectIntoArray(response.todos)
      dispatch({
        type: 'ADD_TODO_LIST',
        todos
      })
    } catch (error) {
      redirectToHome(this.props.history, error)
      showMessage(error)
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
        <div className="control-buttons">
          <button className="button confirm reload" onClick={() => this.loadTodos()}>
            <b>&#x21bb;</b>
          </button>
          <AddNewTodo router={this.props.history} http={this.http} />
        </div>
        <div className="todo-list">
          { this.renderList() }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ToDoList) 