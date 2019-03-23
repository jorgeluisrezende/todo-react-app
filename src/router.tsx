import React, { Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Session } from './components/Session';
import ToDoList from './components/ToDoList';

export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Session}/>
          <Route exact path="/app" component={ToDoList}/>
        </Switch>
      </Router>
    )
  }
}

