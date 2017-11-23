/// <reference path="./interface.d.ts"/>

import { ReactWrapper } from 'enzyme'

export default class TodoListDriver {
  constructor(private wrapper: ReactWrapper) {}
  
  getVisibleTodos(): ITodo[] {
    const visibleTodos = this.wrapper.find('.todo')

    return visibleTodos.map((todo: ReactWrapper) => todo.prop('todo'))
  }
  getTodosTitle(): string[] {
    const visibleItemsNodes = this.wrapper.find('.todo span')

    return visibleItemsNodes.map((todo: any) => todo.text())
  }
  deleteItem(todo: ITodo) {
    const idx = this.getVisibleTodos().indexOf(todo)
    const toRemove = this.wrapper.find('.todo').at(idx)

    toRemove.find('.remove').simulate('click')
  }
  toggleItem(todo: ITodo) {
    const idx = this.getVisibleTodos().indexOf(todo)
    const toToggle = this.wrapper.find('.todo').at(idx)

    toToggle.find('.toggle').simulate('click')
  }
  addItem(title: string) {
    const addItemInput = this.wrapper.find('.new-todo-input')
    addItemInput.simulate('change', { target: { value: title } })
    addItemInput.simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13
    })
  }
}
