import React, { Component } from 'react';
import { Todo } from '../interfaces/ToDo';
import { http } from '../utils/Http';

export class ToDo extends Component<Todo, {}> {
  http:any = new http();
  
  state:any = {
    isCompleted: false
  }
  
  constructor(props:Todo){
    super(props)
    this.state = {
      isCompleted: props.isCompleted
    }
  }

  private isCompleted():string {
    return this.state.isCompleted ? 'todo-completed': '';
  }

  private async deleteTodo() {
    try {
      const { id } = this.props
      const response = await this.http.delete('/todos', id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  public render():JSX.Element {
    return (
      <div className="todo">
        <div>
          <label 
            className={`checkbox ${this.isCompleted()}`} 
            onChange={(e) => this.setState({...this.state, isCompleted: !this.state.isCompleted})}
          >
            <input defaultChecked={ this.state.isCompleted } type="checkbox" name="finish" className="visually-hidden" />
            <span className="checkbox-indicator"></span>
          </label>
          <span className={`todo-text ${ this.isCompleted() }`}>
            { this.props.text }
          </span>
        </div>
        <div>
          <button className="button delete" onClick={() => this.deleteTodo()}>X</button>

        </div>
      </div>
    )
  }
}
