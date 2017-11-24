import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'

import App from './App'
import { TodoList, TodoItem } from './components/Todo'
import { Timer } from './components/Timer'
import TodoListDriver from './test-driver'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

describe('Todo list component', () => {
  const createTodoListDriver = (todos: Array<ITodo>) => {
    const wrapper = mount(<TodoList todos={todos} />)
    return new TodoListDriver(wrapper)
  }

  it('should display todos passed to it', () => {
    const mockTodos = [
      { title: 'gaga', done: false },
      { title: 'baga', done: false }
    ]
    let driver = createTodoListDriver(mockTodos)
    const visibleItems = driver.getVisibleTodos()

    expect(visibleItems).toEqual(mockTodos)
  })

  it('should add a new todo', () => {
    let driver = createTodoListDriver([])

    driver.addItem('to add')
    const visibleTodos = driver.getVisibleTodos()

    expect(visibleTodos).toContainEqual({ title: 'to add', done: false })
  })

  it('should remove a todo', () => {
    const todoToRemove = { title: 'toRemove', done: false }
    const mockTodos = [todoToRemove, { title: 'gaga', done: false }]
    let driver = createTodoListDriver(mockTodos)

    driver.deleteItem(todoToRemove)
    const visibleTodos = driver.getVisibleTodos()

    expect(visibleTodos).not.toContain(todoToRemove)
  })

  it('should toggle a todo', () => {
    const todoToToggle = { title: 'toToggle', done: false }
    const mockTodos = [todoToToggle, { title: 'gaga', done: false }]
    let driver = createTodoListDriver(mockTodos)

    driver.toggleItem(todoToToggle)
    const visibleItems = driver.getVisibleTodos()

    expect(visibleItems).toContainEqual({ title: 'toToggle', done: true })
  })

  it('should not create a todo if a todo with the same title exists')
  it('should not create a todo with an empty string')
})

describe('Todolist item', () => {
  it('should display the expected amount of pomadoros to complete', () => {
    const mockTodo = { title: 'toToggle', done: false, expected: 5 }
    let wrapper = mount(<TodoItem todo={mockTodo} />)

    const indicator = wrapper.find('.counter .indicator')

    expect(indicator.length).toBe(5)
  })
  it('should display the amount of pomadoro completed', ()=>{
    const mockTodo = { title: 'toToggle', done: false, expected: 5, actual: 1 }
    let wrapper = mount(<TodoItem todo={mockTodo} />)

    const indicator = wrapper.find('.counter .indicator')
    const indicatorCompleted = wrapper.find('.counter .indicator.completed')

    expect(indicator.length).toBe(5)
    expect(indicatorCompleted.length).toBe(1)
  })
  it('should display tha actual amount of pomadoros, even if more that expected', ()=>{
    const mockTodo = { title: 'toToggle', done: false, expected: 1, actual: 3 }
    let wrapper = mount(<TodoItem todo={mockTodo} />)
  
    const indicator = wrapper.find('.counter .indicator')
    const indicatorCompleted = wrapper.find('.counter .indicator.completed')
  
    expect(indicator.length).toBe(3)
    expect(indicatorCompleted.length).toBe(3)
  })
})

describe('Timer component', () => {
  jest.useFakeTimers()

  it('should initialize a timer for a given amount of minutes', () => {
    const timeInMinutes = 0.001
    const wrapper = shallow(<Timer time={timeInMinutes} />)

    wrapper.find('.start').simulate('click')

    // expect(setInterval.mock.calls.length).toBe(1)
  })

  xit('should update the reamining time every second', () => {
    const wrapper = mount(<Timer time={0.1} />)

    wrapper.find('.start').simulate('click')
    jest.runAllTimers()

    // expect(setInterval.mock.calls.length).toBe(5)
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

describe('integration between timer and todo', () => {
  it('')
})
