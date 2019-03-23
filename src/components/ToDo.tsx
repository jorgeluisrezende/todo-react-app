import React, { Component } from 'react';
import { Todo } from '../interfaces/ToDo';

export class ToDo extends Component<Todo, {}> {
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

  public render():JSX.Element {
    return (
      <div className="todo">
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
    )
  }
}
