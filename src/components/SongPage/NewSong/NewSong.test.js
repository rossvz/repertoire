import React from 'react'
import { shallow } from 'enzyme'
import NewSong from './NewSong'
import NewSongForm from './NewSongForm/index'

it('renders a <button> when isEditing is false', () => {
  const wrapper = shallow(<NewSong isEditing={ false } toggleIsEditing={ () => {} } />)

  expect(wrapper.find('button').length).toBe(1)
  expect(wrapper.find(NewSongForm).length).toBe(0)
})

it('renders a <NewSongForm> when isEditing is true', () => {
  const wrapper = shallow(<NewSong isEditing={ true } toggleIsEditing={ () => {} } />)

  expect(wrapper.find(NewSongForm).length).toBe(1)
  expect(wrapper.find('button').length).toBe(0)
})

it('calls toggleIsEditing when <button> is clicked', () => {
  const toggleIsEditingMock = jest.fn()

  const wrapper = shallow(<NewSong isEditing={ false } toggleIsEditing={ toggleIsEditingMock } />)

  expect(toggleIsEditingMock).not.toHaveBeenCalled()

  wrapper.find('button').first().simulate('click')

  expect(toggleIsEditingMock).toHaveBeenCalled()
})
