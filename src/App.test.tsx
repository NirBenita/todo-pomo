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
  jest.useFakeTimers()

  it('should initialize a timer for a given amount of minutes', () => {
    const timeInMinutes = 0.001
    const wrapper = shallow(<Timer time={timeInMinutes} />)

    wrapper.find('.start').simulate('click')

    expect(setInterval.mock.calls.length).toBe(1)
  })

  xit('should update the reamining time every second', () => {
    const wrapper = mount(<Timer time={0.1} />)

    wrapper.find('.start').simulate('click')
    jest.runAllTimers()

    expect(setInterval.mock.calls.length).toBe(5)
  })

  it('should fire an event when the timer is done', () => {
    const mockCallback = jest.fn()
    const wrapper = mount(<Timer time={0.001} onComplete={mockCallback} />)

    expect(mockCallback.mock.calls.length).toBe(0)

    wrapper.find('.start').simulate('click')
    jest.runAllTimers()

    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
