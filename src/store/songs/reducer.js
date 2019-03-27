import { CHANGE_VOTE_FAIL, CHANGE_SONGS_FILTER, STARTED_LOADING, FINISHED_LOADING } from './constants'

const initialState = {
  isLoading: false,
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

    case STARTED_LOADING:
      return {...state, isLoading: true}

    case FINISHED_LOADING:
      return {...state, isLoading: false}

    default: return state
  }
}
