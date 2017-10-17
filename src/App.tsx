import * as React from 'react'
import './App.css'
import TodoItem from './TodoItem'
import { findDOMNode } from 'react-dom'

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

const mockTodoList = [
  {
    id: '5',
    title: 'Finish coffee',
    completed: false,
    pomadoros: 2
  },
  {
    id: '3',
    title: 'Book hotel',
    completed: false,
    pomadoros: 1
  }
]

interface AppState {
  timeLeft?: string
  completion?: number
  intervalId?: NodeJS.Timer
  todos: Array<ITodo>
}

function addTodo(newTodo: ITodo) {
  return function update(state: AppState) {
    let todos = state.todos.slice()
    todos.push(newTodo)
    return { todos: todos }
  }
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

  // @@@ TODO @@@@

  handleNewTodoKeyDown(e: React.FormEvent<HTMLInputElement>): void {
    if (e.keyCode !== 13) {
      return
    }

    e.preventDefault()

    const newTodoInput = findDOMNode<HTMLInputElement>(
      this.refs['newTodoInput']
    )

    let val = newTodoInput.value.trim()

    if (val) {
      this.addNewTodo(val)
      newTodoInput.value = ''
    }
  }

  addNewTodo(val: string) {
    const newTodo = {
      id: Math.random().toString(), // Replace with UUID
      title: val,
      completed: false,
      pomadoros: 0
    }

    this.setState(addTodo(newTodo))
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
        <section className="todo">
          <h4>Main goal for today</h4>
          {this.state.todos.map(todo => (
            <TodoItem
              key={todo.id}
              text={todo.title}
              timerOn={true}
              onClick={() => this.onClick(todo)}
              completion={this.state.completion}
              intervalId={this.state.intervalId}
            />
          ))}
          <div className="todo-add">
            <input
              ref="newTodoInput"
              onChange={this.handleNewTodoKeyDown}
              type="text"
            />
            <span className="action">+ </span>
            <a href="#">Add a secondary task</a>
          </div>
          <div />
        </section>
      </div>
    )
  }
}

export default App
