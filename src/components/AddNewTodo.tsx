import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mapDispatchToProps } from '../store/containers/Todos'
class AddNewTodo extends Component {
  addBlankCard:Function;

  constructor(props:any) {
    super(props)
    this.addBlankCard = () => props.dispatch({
      type: 'ADD_TODO',
      id: 'asdadfadvd',
      text: 'feed the CAT',
      isCompleted: false,
      urgency: 0,
      created: new Date(),
      updated:new Date()
    })
  }

  public render():JSX.Element {
    return (
      <button className="add-new-todo" onClick={() => this.addBlankCard()}>
        + Add new to do
      </button>
    )
  }
}

export default connect(mapDispatchToProps)(AddNewTodo)
