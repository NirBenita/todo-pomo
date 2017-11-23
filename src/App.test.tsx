import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'

import App from './App'
import { TodoList } from './components/Todo'
import { Timer } from './components/Timer'
import TodoListDriver from './test-driver'

describe('Todo list component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('should display todos passed to it', () => {
    const mockTodos = [
      { title: 'gaga', done: false },
      { title: 'baga', done: false }
    ]
    const wrapper = mount(<TodoList todos={mockTodos} />)
    let driver = new TodoListDriver(wrapper)
    const visibleItems = driver.getVisibleTodos()

    expect(visibleItems).toEqual(mockTodos)
  })

  it('should add a new todo', () => {
    let wrapper = mount(<TodoList />)
    let driver = new TodoListDriver(wrapper)

    driver.addItem('to add')
    const visibleTodos = driver.getVisibleTodos()

    expect(visibleTodos).toContainEqual({ title: 'to add', done: false })
  })

  it('should remove a todo', () => {
    const todoToRemove = { title: 'toRemove', done: false }
    const mockTodos = [todoToRemove, { title: 'gaga', done: false }]
    let wrapper = mount(<TodoList todos={mockTodos} />)
    let driver = new TodoListDriver(wrapper)

    driver.deleteItem(todoToRemove)
    const visibleTodos = driver.getVisibleTodos()

    expect(visibleTodos).not.toContain(todoToRemove)
  })

  it('should toggle a todo', () => {
    const todoToToggle = { title: 'toToggle', done: false }
    const mockTodos = [todoToToggle, { title: 'gaga', done: false }]
    let wrapper = mount(<TodoList todos={mockTodos} />)
    let driver = new TodoListDriver(wrapper)

    driver.toggleItem(todoToToggle)
    const visibleItems = driver.getVisibleTodos()

    expect(visibleItems).toContainEqual({ title: 'toToggle', done: true })
  })

  it(
    'should not create a todo if an uncompleted todo with the same title exists'
  )
  it('should not create a todo with an empty string')
})

describe('Timer component', () => {
  it('should initialize a timer for a given amount of minutes', () => {
    const minutes = 1
    const wrapper = shallow(<Timer time={minutes} />)
    
    wrapper.find('.start').simulate('click')
    const totalTimeInMinutes = Math.floor(
      (wrapper.state('endTime') - wrapper.state('startTime')) * 0.0000166667
    )
    
    expect(totalTimeInMinutes).toBe(minutes)
  })
  
  jest.useFakeTimers()
  it.only('should update the reamining time every second', () => {
    const timeInMinutes = 0.1
    const wrapper = shallow(<Timer time={timeInMinutes} />)

    wrapper.find('.start').simulate('click')   
    jest.runAllTimers()

    expect(setInterval.mock.calls.length).toBe(5)
  })

  it('should stop running when the timer is done', ()=>{
    const timeInMinutes = 0.1
    const wrapper = shallow(<Timer time={timeInMinutes} />)

    wrapper.find('.start').simulate('click')

  })
})
