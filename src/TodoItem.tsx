import * as React from 'react'

import './App.css'

interface TodoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  timer?: boolean
  completion?: number
  intervalId?: NodeJS.Timer
  timerOn?: boolean
  text: string
}

const TodoItem: React.SFC<TodoItemProps> = ({
  timer,
  completion,
  intervalId,
  timerOn,
  text,
  ...rest
}) => {
  const todoProgressStyle = { flexBasis: completion + '%' }

  return (
    <div className="todo-item" {...rest}>
      <div className="todo-item-content">
        <input type="checkbox" className="todo-toggle" />
        <p className="todo-label">{text}</p>
        <div className="todo-pom-counter">
          <div className="todo-pom-indicator done" />
          <div className="todo-pom-indicator done" />
          <div className="todo-pom-indicator" />
          <div className="todo-pom-indicator" />
          <div className="todo-pom-indicator" />
        </div>
      </div>
      {timerOn &&
        <div className="todo-progress">
          <div style={todoProgressStyle} className="shiny todo-progress-done" />
        </div>}
    </div>
  )
}

export default TodoItem
