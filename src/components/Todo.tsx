import * as React from 'react'
import { findDOMNode } from 'react-dom'

interface TodosProps {
  todos?: Array<ITodo>
  onTodoClick?: () => void
  initializeTimer?: () => void
}

interface TodosState {
  newInputValue: string
  todos?: Array<ITodo>
}

interface ITodoItemProps {
  todo: ITodo
  className?: string
  removeTodo?: (todo: ITodo) => void
  toggleTodo?: (todo: ITodo) => void
  onClick?: () => void
}

export const TodoItem: React.SFC<ITodoItemProps> = ({
  todo,
  removeTodo,
  toggleTodo,
  className,
  onClick
}) => {
  let numIndicators = 0
  if (todo.actual && todo.expected) {
    numIndicators = todo.actual > todo.expected ? todo.actual : todo.expected
  } else if (todo.expected && !todo.actual) {
    numIndicators = todo.expected
  } else if (!todo.expected && todo.actual) {
    numIndicators = todo.actual
  }
  const indicators = Array.from(
    new Array(numIndicators),
    (indicator, index) => {
      if (todo.actual && index < todo.actual) {
        return (
          <span key={index} className="indicator completed">
            {index}
          </span>
        )
      } else {
        return (
          <span key={index} className="indicator">
            {index}
          </span>
        )
      }
    }
  )
  return (
    <li onClick={()=>onClick && onClick()} className="todo-item">
      <span>{todo.title}</span>
      <div className="counter">{indicators}</div>
      <button className="remove" onClick={() => removeTodo && removeTodo(todo)}>
        delete
      </button>
      <button className="toggle" onClick={() => toggleTodo && toggleTodo(todo)}>
        done
      </button>
    </li>
  )
}

export class TodoList extends React.Component<TodosProps, TodosState> {
  constructor(props: TodosProps) {
    super(props)
    this.state = {
      newInputValue: '',
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

  handleNewTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newInputValue: e.target.value })
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
          todo.done = !todo.done
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
          onChange={e => this.handleNewTodoChange(e)}
          value={this.state.newInputValue}
          type="text"
        />
        <ul className="todos">
          {this.state.todos &&
            this.state.todos.map((todo, index) => (
              <TodoItem
                className="todo todo-item"
                key={index}
                todo={todo}
                toggleTodo={() => this.toggleTodo(todo)}
                removeTodo={() => this.removeTodo(todo)}
                onClick={() => this.props.initializeTimer && this.props.initializeTimer()
                }
              />
            ))}
        </ul>
      </div>
    )
  }
}
