import React, { Component } from 'react'
import { connect } from 'react-redux';
import Select from 'react-select';
import { Todo } from '../interfaces/ToDo'
import { mapDispatchToProps } from '../store/containers/Todos'
import { redirectToHome, showMessage } from '../utils/ErrorHandlers'

class AddNewTodo extends Component<{ router:any, http:any }> {
  state = {
    showInput: false,
    inputValue: '',
    urgency: null
  }

  private toggleInput():void {
    this.setState({ ... this.state, showInput: !this.state.showInput })
  }

  private getInputValue(e:any):void {
    this.setState({...this.state, inputValue:e.target.value })
  }

  private getUrgency(e:any) {
      let urgency = e.target.options[e.target.selectedIndex].text;
      if(urgency === 'Urgency') urgency = 1
      this.setState({ ...this.state, urgency: parseInt(urgency) })
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
      const response = await http.post('/todos', { text: inputValue, isCompleted: false, urgency: urgency })
      this.dispatchTodo(response.todo)
      this.toggleInput()
    } catch (error) {
      redirectToHome(this.props.router, error)
      showMessage(error)
    }
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
            <option>Urgency</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button className="button confirm" onClick={() => this.submitTodo()}>add</button>
          <button className="button cancel" onClick={() => this.toggleInput()}>cancel</button>
        </div>
      )
    }
  }
}

export default connect(mapDispatchToProps)(AddNewTodo)
