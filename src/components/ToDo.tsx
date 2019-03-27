import React, { Component } from 'react';
import { Todo } from '../interfaces/ToDo';
import { http } from '../utils/Http';
import { connect } from 'react-redux';
import { redirectToHome, showMessage } from '../utils/ErrorHandlers';
import { mapDispatchToProps, mapStateToProps } from '../store/containers/Todos';
import EditTodo from './EditTodo';

class ToDo extends Component<Todo, { }> {
  http:any = new http();
  
  state:any = {
    isCompleted: false,
    isEditing: false,
  }
  
  constructor(props:any){
    super(props)
    this.state = {
      isCompleted: props.isCompleted
    }
  }

  private isCompleted():string {
    return this.state.isCompleted ? 'todo-completed': '';
  }

  private async handleCheckBox() {
    await this.setState({...this.state, isCompleted: !this.state.isCompleted})
    this.updateTodo({isCompleted: this.state.isCompleted})
  }

  private async deleteTodo(){
    try {
      const { id, dispatch }:any = this.props;
      const response:any = await this.http.delete('/todos', id);

      dispatch({
        type: 'DELETE_FROM_TODO_LIST',
        id
      })

    } catch (error) {
      redirectToHome(this.props.router, error);
      showMessage(error);
    }
  }

  private async updateTodo(data:any) {
    try {
      if(data.close) {
        this.setState({ ...this.state, isEditing: false })
      } else {
        const { id, dispatch }:any= this.props
        const response = await this.http.patch('/todos', id, data)
        dispatch({
          type: 'UPDATE_FROM_TODO_LIST',
          id,
          text: response.todo.text,
          isCompleted: response.todo.isCompleted,
          urgency: response.todo.urgency
        })
        this.setState({ ...this.state, isEditing: false })
      }
    } catch (error) {
      const { router } = this.props
      redirectToHome(router, error)
      showMessage(error);
    }
  }

  private toggleBetweenEditing():JSX.Element {
    const { isEditing } = this.state
    if(!isEditing)
      return (
        <div className="todo-container">
          <label 
            className={`checkbox ${this.isCompleted()}`} 
            onChange={this.handleCheckBox.bind(this)}>
            <input defaultChecked={ this.state.isCompleted } type="checkbox" name="finish" className="visually-hidden" />
            <span className="checkbox-indicator"></span>
          </label>
          <span className={`todo-text ${ this.isCompleted() }`} onClick={() => this.setState({ ...this.state, isEditing: true })}>
            { this.props.text }
          </span>
        </div>
      )
    else 
      return (
        <EditTodo 
          isCompleted={this.isCompleted()} 
          text={this.props.text} 
          urgency={this.props.urgency}
          onClickOutside={this.updateTodo.bind(this)}
        />)
  }

  public render():JSX.Element {
    return (
      <div className="todo">
        { this.toggleBetweenEditing() }
        <div>
          <div className={`urgency urgency-${this.props.urgency}`}></div>
          <button className="button delete" onClick={() => this.deleteTodo()}>X</button>
        </div>
      </div>
    )
  }
}

export default connect(mapDispatchToProps)(ToDo)