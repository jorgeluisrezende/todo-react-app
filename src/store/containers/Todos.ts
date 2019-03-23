import { bindActionCreators } from 'redux'
import { addTodo, addTodoList } from '../actions'

export const mapStateToProps = (store:any) => ({
  todos: store.todos
});

export const mapDispatchToProps = (dispatch:any) => bindActionCreators({ addTodo, addTodoList  }, dispatch)
