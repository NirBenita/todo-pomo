// https://github.com/wmonk/create-react-app-typescript/issues/185
import * as enzyme from 'enzyme';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

(enzyme as any).configure({ adapter: new Adapter() });

