import * as React from 'react'
import './App.css'
import Timer, {TimeType} from './Timer';
import Pill from './Pill'

/* TODO: 
  [ ] Timer progress animation
        How to set flex basis at runtime?
  [ ] Add Todo
  [ ] Complete Todo
  [ ] Remove Todo
  - Pomadoro sessions indicator
    [x] skin
    [ ] logic

*/


interface AppState {
  timeLeft: TimeType
  intervalId?: NodeJS.Timer
}
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      timeLeft: { days: '0', hours: '0', minutes: '0', seconds: '0' }
    }
  }
  onClick() {
    var timeInMinutes = 25
    var currentTime: Date = new Date()
    var deadline = new Date(currentTime.getTime() + timeInMinutes * 60 * 1000)
    this.initializeClock(deadline)
  }
  getTimeRemaining(endtime: Date) {
    var t = endtime.getTime() - new Date().getTime()
    var seconds = Math.floor(t / 1000 % 60)
    var minutes = Math.floor(t / 1000 / 60 % 60)
    var hours = Math.floor(t / (1000 * 60 * 60) % 24)
    var days = Math.floor(t / (1000 * 60 * 60 * 24))
    return {
      total: t.toString(),
      days: days.toString(),
      hours: hours.toString(),
      minutes: minutes.toString(),
      seconds: seconds.toString()
    }
  }

  updateClock(endTime: Date) {
    const timeRemaining = this.getTimeRemaining(endTime)
    console.log(parseInt(timeRemaining.total)*1000/100)
    this.setState({ timeLeft: timeRemaining })
    if (parseInt(timeRemaining.total) <= 0) {
    }
  }
  initializeClock(endTime: Date) {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }

    this.updateClock(endTime)

    let timeinterval = global.setInterval(() => this.updateClock(endTime), 1000)
    this.setState({ intervalId: timeinterval })
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
        <section className="content">
          <h4>Main goal for today</h4>
          <Pill timer={true} onClick={() => this.onClick()} completion={50} intervalId={this.state.intervalId} />
        {this.state.intervalId &&
          <Timer time={this.state.timeLeft} className="timer" />}
          <span className="action">+ </span>
          <a href="#">Add a secondary task</a>
          <div />
        </section>
      </div>
    )
  }
}
export default App
