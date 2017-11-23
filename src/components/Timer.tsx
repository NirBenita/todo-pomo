import * as React from 'react'

interface TimerState {
  startTime: number
  endTime: number
  timeLeft: number
  timeInterval: NodeJS.Timer
}
interface TimerProps {
  time: number
  onComplete?: () => {}
}

export class Timer extends React.Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props)
  }

  updateTimeLeft() {
    const now: number = +new Date()
    const timeLeft = this.state.endTime - now

    if (timeLeft < 1) {
      clearInterval(this.state.timeInterval)
      this.props.onComplete && this.props.onComplete()
    }

    this.setState({ timeLeft })
  }

  intializeTimer(minutes: number) {
    const startTime: number = new Date().getTime()
    const endTime: number = new Date(startTime + minutes * 60 * 1000).getTime()

    this.setState({
      startTime,
      endTime
    })

    const timeInterval: NodeJS.Timer = global.setInterval(
      () => this.updateTimeLeft(),
      1000
    )
    this.setState({ timeInterval })
  }

  render() {
    return (
      <div>
        <button
          className="start"
          onClick={() => this.intializeTimer(this.props.time)}
        >
          Start Timer
        </button>
      </div>
    )
  }
}
