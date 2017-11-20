/// <reference path="./interface.d.ts"/>

import { ReactWrapper } from 'enzyme'

export default class TodoListDriver {
  constructor(private wrapper: ReactWrapper) {}

  getVisibleItems(): string[] {
    const visibleItemsNodes = this.wrapper.find('.todo span')
    return visibleItemsNodes.map((todo: any) => todo.text())
  }
  deleteItem(name: string) {
    const idx = this.getVisibleItems().indexOf(name)
    const toRemove = this.wrapper.find('.todo').at(idx)
    toRemove.find('.remove').simulate('click')
  }
}
