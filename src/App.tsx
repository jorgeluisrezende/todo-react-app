import React, { Component } from 'react';
import { ToDoList } from './components/ToDoList';
import { Filter } from './components/Filter';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  public render() {
    return (
      <div className="App">
        <h1 className="title">To Do React APP</h1>
        <Filter/>
        <ToDoList />
      </div>
    );
  }
}

export default App;
