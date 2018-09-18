import { TOGGLE_EDITING_NEW_SHOW } from './constants'

export const toggleEditingNewShow = () => {
  return {
    type: TOGGLE_EDITING_NEW_SHOW,
    payload: {}
  }
}

export const deleteShow = show => (
  dispatch,
  getState,
  getFirebase
) => async () => {
  await getFirebase().remove(`/shows/${show.id}`)
}
