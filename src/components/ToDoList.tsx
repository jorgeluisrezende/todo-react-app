import React, { Component } from 'react'
import { http } from '../utils/Http'
import { ToDo } from './ToDo'
import { AddNewTodo } from './AddNewTodo'
import { turnObjectIntoArray } from '../utils/utils'
import '../App.css'
export class ToDoList extends Component {
  state = {
    todos: [{
      id: 1,
      text: 'feed the dog',
      isCompleted: false,
      urgency: 0,
      created: new Date(),
      updated:new Date()
    },{
      id: 2,
      text: 'feed the fish',
      isCompleted: true,
      urgency: 0,
      created: new Date(),
      updated:new Date()
    }]
  }

  async componentDidMount() {
    try {
      const response:any = await http.get('/todos')
      const todos:Array<object> = turnObjectIntoArray(response.todos)
      this.setState({...this.state, todos})
    } catch (error) {
      console.log(error)
    }
    
  }

  private renderList():JSX.Element[] {
    const { todos } = this.state
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

  public render() {
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
