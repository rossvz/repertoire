import { TOGGLE_EDITING_NEW_SHOW } from './constants'

const INITIAL_STATE = {editingNewShow: false}
export default (state = INITIAL_STATE,
                action) => {
  switch (action.type) {
    case TOGGLE_EDITING_NEW_SHOW:
      return {...state, editingNewShow: !state.editingNewShow}

    default:
      return state
  }
}
