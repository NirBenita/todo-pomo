import * as React from 'react'
import './App.css'

export interface TimeType {
  days: string
  hours: string
  minutes: string
  seconds: string
}

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  time: TimeType
}

const Timer: React.SFC<TimerProps> = ({ time, ...rest }) =>
  <span {...rest}>
    {time.minutes}:
    {time.seconds}
  </span>

export default Timer;