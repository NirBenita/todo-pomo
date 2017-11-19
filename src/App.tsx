/// <reference path="./interface.d.ts"/>

import * as React from 'react'
import './App.css'
import mockTodoList from './lib/mock-data'
import {TodoList} from './components/Todo'
/* TODO: 
  [x] Timer progress animation
    [x] How to set flex basis at runtime?
  - Todo
    [ ] Add Todo
    [ ] Complete Todo
    [ ] Remove Todo
    [ ] Multiple timers
  - Pomadoro sessions indicator
    [x] skin
    [ ] logic
    [ ] Make timer global
*/

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
      todos: mockTodoList
    }
  }

  // @@@ TIMER @@@

  onClick(todo: ITodo) {
    this.initializeTimer(1)
  }
  getTimeRemaining(startTime: number, endTime: number) {
    var now: number = +new Date(),
      start: number = startTime,
      end: number = endTime

    let total = end - start
    let progress = now - start

    const t = Math.round(progress / total * 100)
    console.log(t)
    return t
  }

  updateTimer(startTime: number, endTime: number) {
    const timeRemaining = this.getTimeRemaining(startTime, endTime)
    this.setState({ ...this.state, completion: timeRemaining })
    // if (parseInt(timeRemaining.total) <= 0) {
    //   Stop
    // }
  }

  initializeTimer(timeInMinutes: number) {
    var startTime: number = new Date().getTime()
    var endTime: number = new Date(
      startTime + timeInMinutes * 60 * 1000
    ).getTime()

    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
    this.updateTimer(startTime, endTime)

    let timeinterval = global.setInterval(
      () => this.updateTimer(startTime, endTime),
      1000
    )
    this.setState({ ...this.state, intervalId: timeinterval })
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
        <TodoList todos={[{title:'zagzag', done: false}]} />
      </div>
    )
  }
}

export default App
