import React, { Component } from 'react'

export class Filter extends Component {
  render() {
    return (
      <div className="filter-container">
        <input
          className="filter-input" 
          type="text" 
          placeholder="Type something to filter your to dos by label..."
        />
      </div>
    )
  }
}
