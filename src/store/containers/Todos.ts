import { bindActionCreators } from 'redux'
import { addTodo, addTodoList, deleteFromTodoList } from '../actions'

export const mapStateToProps = (store:any) => ({
  visibilityFilter: store.visibilityFilter,
  todos: store.todos
});

export const mapDispatchToProps = (dispatch:any) => bindActionCreators({ addTodo, addTodoList, deleteFromTodoList }, dispatch)
