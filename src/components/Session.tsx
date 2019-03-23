import React, { Component } from 'react'
import { http } from '../utils/Http';

export class Session extends Component<{ history:any }> {
  http:any = new http()

  async startSession() {
    await this.http.session()
    this.props.history.push('/app')
  }

  render() {
    return (
      <div>
        <button className="button confirm" onClick={() => this.startSession()}>Start Session</button>
      </div>
    )
  }
}
