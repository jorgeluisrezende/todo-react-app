import { createStore, combineReducers } from 'redux';
import { state } from '../interfaces/StoreState'

const initialState:state = {
  visibilityFilter: 'SHOW_ALL',
  todos: []
}

function todos(state:any = initialState, action:any) {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: [
          {
            id: action.id,
            text: action.text,
            isCompleted: action.isCompleted,
            urgency: action.urgency,
            created: action.created,
            updated: action.updated
          },
          ...state.todos,
        ]
      }
    }
    case 'ADD_TODO_LIST': {
      return {
        ...state,
        todos: [
          ...action.todos
        ]
      }
    }
    case 'EDIT_TODO_LIST': {
      
    }
    case 'DELETE_FROM_TODO_LIST': {
      const newTodos:Array<object> = state.todos.filter((item:any) => item.id != action.id)
      return {
        ...state,
        todos: newTodos
      }
    }
    case 'UPDATE_FROM_TODO_LIST': {
      const newTodos:Array<object> = state.todos.map((item:any) => {
        if(item.id === action.id) {
          return {
            id: action.id,
            text: action.text,
            urgency: action.urgency,
            isCompleted: action.isCompleted
          } 
        } else {
          return item
        }
      })
      console.log(newTodos)
      return {
        ...state,
        todos: newTodos
      }
    }
    case 'SET_VISIBILITY_FILTER':{
      return {
        visibilityFilter: action.filter,
        todos: [
          ...state.todos
        ]
      }
    }
    default:
      return state
  }
}

const Store = createStore(todos);

export default Store;