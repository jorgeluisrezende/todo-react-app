import { createStore } from 'redux';
import { state } from '../interfaces/StoreState'

const initialState:state = {
  visibilityFilter: 'SHOW_ALL',
  todos: []
}

function todoApp(state:any = initialState, action:any) {
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
          ...state.todos,
          ...action.todos
        ]
      }
    }
    default:
      return state
  }
}

const Store = createStore(todoApp);

export default Store;