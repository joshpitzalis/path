import React from 'react'
import ReactDOM from 'react-dom'
import App from './Routes'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('check that tests work', () => {
  expect(true).toBe(true)
})
