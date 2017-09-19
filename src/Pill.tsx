import * as React from 'react'

import './App.css'

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  timer?: boolean
  completion: number
  intervalId?: NodeJS.Timer
}

const Pill: React.SFC<PillProps> = ({ timer, completion, intervalId, ...rest }) => {
  const todoProgressStyle = { flexBasis: completion +'%' }

  return (
    <div className="pill" {...rest}>
      <div className="todo">
        <input type="checkbox" className="todo-toggle" />
        <p className="todo-label">Read Book</p>
        <div className="todo-pom-counter">
          <div className="todo-pom-indicator done" />
          <div className="todo-pom-indicator done" />
          <div className="todo-pom-indicator" />
          <div className="todo-pom-indicator" />
          <div className="todo-pom-indicator" />
        </div>
      </div>
      <div className="todo-progress">
        <div style={todoProgressStyle} className="shiny todo-progress-done" />
        <div />
      </div>
    </div>
  )
}

export default Pill;