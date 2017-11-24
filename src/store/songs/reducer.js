import { CHANGE_VOTE_FAIL } from './constants'

const initialState = {
  error: '',
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CHANGE_VOTE_FAIL:
      return {
        ...state,
        error: action.error,
      }

    default: return state
  }
}
