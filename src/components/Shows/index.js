import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Shows from './Shows'
import { values, mapObjIndexed } from 'ramda'
import { sortByDate, formatShows } from '../../util/shows'

const sortShows = compose(
  sortByDate,
  formatShows,
  values,
  mapObjIndexed((show, id) => ({...show, id}))
)

export default compose(
  firebaseConnect([
    'shows'
  ]),
  connect(
    ({firebase}) => ({
      shows: sortShows(firebase.data.shows)
    }),
    {}
  )
)(Shows)
