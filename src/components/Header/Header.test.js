import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

it('renders the title prop as text', () => {
  const testTitle = "Hello world"
  const wrapper = shallow(<Header title={ testTitle } />)

  expect(wrapper.text()).toBe(testTitle)
})
