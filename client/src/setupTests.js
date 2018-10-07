import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const storage = {};

const localStorageMock = {
  getItem: name => storage[name],
  setItem: (name, value) => { storage[name] = value; },
  removeItem: (name) => { storage[name] = null; },
};

global.localStorage = localStorageMock;
