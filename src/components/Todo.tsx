import * as React from 'react'
import { findDOMNode } from 'react-dom'

interface TodosProps {
  todos?: Array<ITodo>
}

interface TodosState {
  newTodo: string
  todos?: Array<ITodo>
}

export const Todo: React.SFC<ITodoItemProps> = ({
  todo,
  removeTodo,
  toggleTodo
}) => {
  return (
    <li className="todo">
      {todo.title}
      <button className="remove" onClick={() => removeTodo(todo)}>
        delete
      </button>
      <button className="toggle" onClick={() => toggleTodo(todo)}>
        done
      </button>
    </li>
  )
}

export class TodoList extends React.Component<TodosProps, TodosState> {
  constructor(props: TodosProps) {
    super(props)
    this.state = {
      newTodo: '',
      todos: this.props.todos || []
    }
  }
  handleNewTodoKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 13) {
      return
    }
    e.preventDefault()
    var val = findDOMNode<HTMLInputElement>(this.refs['newField']).value.trim()
    if (val) {
      const newTodos = this.state.todos
        ? [...this.state.todos, { title: val, done: false }]
        : [{ title: val, done: false }]

      this.setState({ todos: newTodos })

      findDOMNode<HTMLInputElement>(this.refs['newField']).value = ''
    }
  }

  removeTodo(todoToRemove: ITodo) {
    const newTodos = this.state.todos
      ? this.state.todos.filter(todo => todo != todoToRemove)
      : []
    this.setState({ todos: newTodos })
  }

  toggleTodo(todoToToggle: ITodo) {
    const newTodos =
      this.state.todos &&
      this.state.todos.map(todo => {
        if (todo.title === todoToToggle.title) {
          todo.done != todo.done
        }
        return todo
      })
    this.setState({ todos: newTodos })
  }

  render() {
    return (
      <div>
        <input
          className="new-todo-input"
          ref="newField"
          onKeyDown={e => this.handleNewTodoKeyDown(e)}
          type="text"
        />
        <ul className="todos">
          {this.state.todos &&
            this.state.todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleTodo={() => this.toggleTodo(todo)}
                removeTodo={() => this.removeTodo(todo)}
              />
            ))}
        </ul>
      </div>
    )
  }
}
