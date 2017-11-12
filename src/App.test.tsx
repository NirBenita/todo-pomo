import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import App from './App';
import {TodoList} from './components/Todo';
import mockTodoList from './lib/mock-data';
import * as Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should display todos passed to it', () => {
  shallow(<TodoList todos={mockTodoList} />);
})