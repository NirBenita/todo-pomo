import * as React from 'react'
import { findDOMNode } from 'react-dom'

interface ITodo {
  title: string
}

interface TodosProps {
  todos?: Array<ITodo>
}

interface TodosState {
  newTodo: string
  todos?: Array<ITodo>
}

export class TodoList extends React.Component<TodosProps, TodosState> {
  constructor(props: TodosProps) {
    super(props);
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
    var val = findDOMNode<HTMLInputElement>(this.refs["newField"]).value.trim();
    if (val) {
      const newTodos = this.state.todos ? [...this.state.todos, {title: val}] : [{title: val}]

      this.setState({todos: newTodos})
      
      findDOMNode<HTMLInputElement>(this.refs["newField"]).value = '';
    }
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
          {this.props.todos &&
            this.props.todos.map((todo, index) => (
              <li key={index}>{todo.title}</li>
            ))}
        </ul>
      </div>
    )
  }
}
