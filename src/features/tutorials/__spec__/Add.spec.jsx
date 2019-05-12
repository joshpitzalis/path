import 'jest-dom/extend-expect';
import { cleanup, getByLabelText, render } from 'react-testing-library';
import Add from '../../../pages/Add';

afterEach(cleanup);

test('when I add a price teh proce gets saved with the tutorial', () => {
  const mockFunction = jest.fn();
  const mockResult = {};
  const { getByTestId } = render(
    <Add />,
  );


  userEvent.type(getByLabelText(/price/i), 5);
  userEvent.click(getByTestId('submit'), {});
  expect(mockFunction).toHaveBeenCalledTimes(1);
  expect(mockFunction).toHaveBeenCalledWith(mockResult);
});

// fields mandatory
// if no value is free
