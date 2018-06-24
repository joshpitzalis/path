import { unwrappedLogin } from '../index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {st}
import { render } from 'react-testing-library';
// test('login page snapshot', () => {
//   const { container } = render(<unwrappedLogin />);
//   expect(container.firstChild).toMatchSnapshot();
// });




test('LOGGED_IN', () => {
  const { container } = render(<unwrappedLogin />);
  expect(container.firstChild).toMatchSnapshot();
});
