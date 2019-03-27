import React, { Component } from 'react'
import { http } from '../utils/Http'
import { connect } from 'react-redux';
import ToDo from './ToDo'
import { Todo as TodoInterface } from '../interfaces/ToDo';
import Filter from './Filter';
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

  visibilityFilter():Array<TodoInterface> {
    const { todos, visibilityFilter }:any = this.props
    switch(visibilityFilter) {
      case 'SHOW_ALL': {
        return todos
      }
      case 'SHOW_FINISHED': {
        return todos.filter((item:TodoInterface) => item.isCompleted === true)
      }
      case 'SHOW_NOT_FINISHED': {
        return todos.filter((item:TodoInterface) => item.isCompleted === false)
      }
      default:
        return todos
    }
  }

  private renderList():JSX.Element[] {
    const todos = this.visibilityFilter()
    return todos.map((todo:any) => 
      <ToDo 
        router={this.props.history}
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
      <div style={{width: '40%'}}>
      <Filter/>
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(ToDoList) 