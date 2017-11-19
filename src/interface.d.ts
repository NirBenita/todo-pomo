interface ITodo {
  title: string
  done: boolean
}

interface ITodoItemProps {
  todo: ITodo
  removeTodo: (todo: ITodo) => void
  toggleTodo: (todo: ITodo) => void
}
