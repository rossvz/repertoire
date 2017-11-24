import {
  TOGGLE_IS_EDITING,
} from './constants'

const initialState = {
  data: {},
  isEditing: false,
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOGGLE_IS_EDITING:
      return {
        ...state,
        isEditing: !state.isEditing,
      }

    default: return state
  }
}
