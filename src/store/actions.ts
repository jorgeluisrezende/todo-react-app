export const addTodo = (value:any) => ({
  type: 'ADD_TODO',
  id: value.id,
  text: value.text,
  isCompleted: value.isCompleted,
  urgency: value.urgency,
  created: new Date(),
  updated:new Date()
});

export const addTodoList = (value:any) => ({
  type: 'ADD_TODO_LIST',
  todos: value
});