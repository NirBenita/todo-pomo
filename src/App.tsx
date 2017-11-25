/// <reference path="./interface.d.ts"/>

import * as React from 'react'
import './App.css'
// import mockTodoList from './lib/mock-data'
import { TodoList } from './components/Todo'
import { Timer } from './components/Timer'

interface AppState {
  timeLeft?: string
  completion?: number
  intervalId?: NodeJS.Timer
  todos: Array<ITodo>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      completion: 0,
      todos: []
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <h3>4</h3>
            <label>Weekly</label>
          </div>
          <div>
            <h3>0</h3>
            <label>Daily</label>
          </div>
        </header>
        <div className="shiny" />
        <Timer time={1 / 20}>
          <TodoList
            todos={[{ title: 'zagzag', done: false, expected: 5, actual: 2 }]}
          />
        </Timer>
      </div>
    )
  }
}

export default App
