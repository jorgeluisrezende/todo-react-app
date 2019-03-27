export const addTodo = (value:any) => ({
  type: 'ADD_TODO',
  id: value.id,
  text: value.text,
  isCompleted: value.isCompleted,
  urgency: value.urgency,
  created: value.created,
  updated:  value.updated
});

export const addTodoList = (value:any) => ({
  type: 'ADD_TODO_LIST',
  todos: value
});

export const deleteFromTodoList = (value:any) => ({
  type: 'DELETE_FROM_TODO_LIST',
  id: value.id
});