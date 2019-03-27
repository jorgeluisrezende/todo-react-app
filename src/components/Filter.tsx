import React, { Component } from 'react'
import { mapDispatchToProps } from '../store/containers/Todos'
import { connect } from 'react-redux';

export class Filter extends Component<{dispatch:Function}> {
  private filter(filter:string) {
    const { dispatch } = this.props
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })
  }

  render():JSX.Element {
    return (
      <div className="filter-container">
        <span className="filter-label">Filter:</span>
        <button className="button" onClick={() => this.filter('SHOW_FINISHED')}>Finished</button>
        <button className="button" onClick={() => this.filter('SHOW_NOT_FINISHED')}>Active</button>
        <button className="button" onClick={() => this.filter('SHOW_ALL')}>All</button>
      </div>
    )
  }
}

export default connect(mapDispatchToProps)(Filter)