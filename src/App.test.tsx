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
  const visibleItems = driver.getVisibleItems()

  expect(visibleItems).toEqual(['gaga', 'baga'])
})

xit('should add a new todo', () => {
  const component = mount(<TodoList />)
  const Input = component.find('.new-todo-input')
  let wrapper = toJson(component)

  expect(wrapper).toMatchSnapshot()

  Input.simulate('keydown', {
    preventDefault() {},
    key: 'z',
    keyCode: 90,
    which: 90
  })
  Input.simulate('keydown', {
    preventDefault() {},
    key: 'Enter',
    keyCode: 13,
    which: 13
  })

  wrapper = toJson(component)

  expect(wrapper).toMatchSnapshot()
})

it.only('should remove a todo', () => {
  const mockTodos = [
    { title: 'toRemove', done: false },
    { title: 'gaga', done: false }
  ]
  let wrapper = mount(<TodoList todos={mockTodos} />)
  let driver = new TodoListDriver(wrapper)

  driver.deleteItem('toRemove')
  const visibleItems = driver.getVisibleItems()

  expect(visibleItems).toEqual(['gaga'])
})
it('should toggle a todo', () => {
  const mockTodos = [
    { title: 'toToggle', done: false },
    { title: 'gaga', done: false }
  ]
  let component = mount(<TodoList todos={mockTodos} />)
  let wrapper = toJson(component)

  expect(wrapper).toMatchSnapshot()

  let todoItem = component.find('.todo').first()
  todoItem.find('.toggle').simulate('click')

  wrapper = toJson(component)

  expect(wrapper).toMatchSnapshot()
})
