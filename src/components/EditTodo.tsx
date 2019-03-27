import React, { Component } from 'react'
import onClickOutside from "react-onclickoutside";
import { http } from '../utils/Http';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../store/containers/Todos';

class EditTodo extends Component<{isCompleted:boolean, urgency:number, text:string, onClickOutside:Function}> {
  http = new http()
  state:any = {
    isCompleted:false,
    text: '',
    urgency: 1
  }

  constructor(props:any) {
    super(props)
    this.state = {
      isCompleted: props.isCompleted,
      text: props.text,
      id: props.id,
      urgency: props.urgency
    }
  }
  
  private handleClickOutside = (evt:any):void => {
    if(this.state.text !== this.props.text || this.state.urgency !== this.props.urgency) {
      const payload = { 
        isCompleted: this.state.isCompleted, 
        text: this.state.text, 
        urgency: this.state.urgency
      }
      
      this.props.onClickOutside(payload)
    } else {
      this.props.onClickOutside({ close: true })
    }

  };

  private getUrgency(e:any) {
    let urgency = e.target.options[e.target.selectedIndex].text;
    if(urgency === 'Urgency') urgency = 1
    this.setState({ ...this.state, urgency: parseInt(urgency) })
  }

  private getInputValue(e:any):void {
    this.setState({...this.state, text:e.target.value })
  }
  
  render():JSX.Element {
    return (
      <div className="todo-container">
        <label 
          className={`checkbox ${this.props.isCompleted}`} 
          onChange={(e) => this.setState({...this.state, isCompleted: !this.state.isCompleted})}
        >
          <input 
            defaultChecked={ this.props.isCompleted } 
            type="checkbox" 
            name="finish" 
            className="visually-hidden" 
          />
          <span className="checkbox-indicator"></span>
        </label>
        <input 
          onChange={this.getInputValue.bind(this)}
          autoFocus 
          defaultValue={this.props.text} 
          className={`todo-text input`} 
        />
        <select defaultValue={this.state.urgency} className="input select" onChange={this.getUrgency.bind(this)}>
          <option>Urgency</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    )
  }
}

export default connect(mapDispatchToProps)(onClickOutside(EditTodo))