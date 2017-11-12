import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {TodoList} from './components/Todo'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should display todos passed to it', () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper).toMatchSnapshot()
})