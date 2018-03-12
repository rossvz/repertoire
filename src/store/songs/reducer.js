import { CHANGE_VOTE_FAIL, CHANGE_SONGS_FILTER } from './constants'

const initialState = {
  error: '',
  filters: {
    search: ''
  }
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CHANGE_VOTE_FAIL:
      return {
        ...state,
        error: action.error
      }

    case CHANGE_SONGS_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.field]: action.value
        }
      }

    default: return state
  }
}
