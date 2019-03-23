import React, { Component } from 'react';
import  ToDoList  from './components/ToDoList';
import { Routes } from './router';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  public render():JSX.Element {
    return (
      <div className="App">
        <h1 className="title">To Do React APP</h1>
        <Routes />
      </div>
    );
  }
}

export default App;
