import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import App from './App'
import { TodoList } from './components/Todo'
import TodoListDriver from './test-driver'
// import mockTodoList from './lib/mock-data'

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
