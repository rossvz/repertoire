import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Shows from './Shows'
import { values, mapObjIndexed, reverse } from 'ramda'
import { sortByDate, formatShows } from '../../util/shows'

const sortShows = compose(
  //reverse,
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
