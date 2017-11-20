interface ITodo {
  title: string
  done: boolean
}

interface ITodoItemProps {
  todo: ITodo
  className: string
  removeTodo: (todo: ITodo) => void
  toggleTodo: (todo: ITodo) => void
}
