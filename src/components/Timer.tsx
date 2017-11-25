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
    console.log(timeLeft)
    this.setState({ timeLeft })
  }

  initializeTimer(minutes: number) {
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

    console.log('initializeTimer')
  }
  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          initializeTimer: () => this.initializeTimer(this.props.time)
        })
      }
      return child
    })
  }
  render() {
    return <div>{this.renderChildren()}</div>
  }
}
