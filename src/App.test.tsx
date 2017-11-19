import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import App from './App'
import { TodoList } from './components/Todo'
// import mockTodoList from './lib/mock-data'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('should render todo list', () => {
  const wrapper = shallow(<TodoList />)
  
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('should display todos passed to it', () => {
  const mockTodos = [{ title: 'zagzag' }]

  const wrapper = mount(<TodoList todos={mockTodos} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('should add a new todo', () => {
  const component = mount(<TodoList />)
  const Input = component.find('.new-todo-input')
  let wrapper = toJson(component);
  
  expect(wrapper).toMatchSnapshot()
  
  Input.simulate('keydown', { key: 'z', keyCode: 90, which: 90 })
  Input.simulate('keydown', { key: 'Enter', keyCode: 13, which: 13 })
  
  wrapper = toJson(component);
  
  expect(wrapper).toMatchSnapshot()
})

it('should remove a todo', () => {})
it('should check a todo', () => {})