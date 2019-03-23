import React, { Component } from 'react'

export class Filter extends Component {
  render():JSX.Element {
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
