import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Todo } from '../interfaces/ToDo'
import { mapDispatchToProps } from '../store/containers/Todos'
import { redirectToHome, showMessage } from '../utils/ErrorHandlers'

class AddNewTodo extends Component<{ router:any, http:any }> {
  state = {
    showInput: false,
    inputValue: '',
    urgency: 1
  }

  private toggleInput():void {
    this.setState({ ... this.state, showInput: !this.state.showInput })
  }

  private getInputValue(e:any):void {
    this.setState({...this.state, inputValue:e.target.value })
  }

  private getUrgency(e:any):void {
    this.setState({ ...this.state, urgency: e.target.value })
  }

  private dispatchTodo(value:Todo):void {
    const { dispatch }:any = this.props
    dispatch({
      type: 'ADD_TODO',
      id: value.id,
      text: value.text,
      isCompleted: value.isCompleted,
      urgency: value.urgency,
      created: value.created,
      updated: value.updated
    })
  }

  private async submitTodo() {
    try {
      const { http } = this.props
      const { inputValue, urgency } = this.state
      const response = await http.post('/todos', { text: inputValue, isCompleted: false, urgency: 1 })
      this.dispatchTodo(response.todo)
      this.toggleInput()
    } catch (error) {
      redirectToHome(this.props.router, error)
      showMessage(error)
    }
  }

  private renderOptions():JSX.Element[] {
    const urgencys = [1, 2, 3, 4, 5]
    return urgencys.map(item => <option key={item} value={item}>{item}</option>)
  }

  public render():JSX.Element {
    if(!this.state.showInput) {
      return (
        <button className="add-new-todo" onClick={() => this.toggleInput()}>
          + Add new to do
        </button>
      )
    } else {
      return (
        <div className="add-new-todo">
          <input className="input" type="text" placeholder="What do you need to do?" onChange={this.getInputValue.bind(this)}/>
          <select className="input select" onChange={this.getUrgency.bind(this)}>
            <option value={1} >Urgency</option>
            { this.renderOptions() }
          </select>
          <button className="button confirm" onClick={() => this.submitTodo()}>add</button>
          <button className="button cancel" onClick={() => this.toggleInput()}>cancel</button>
        </div>
      )
    }
  }
}

export default connect(mapDispatchToProps)(AddNewTodo)
