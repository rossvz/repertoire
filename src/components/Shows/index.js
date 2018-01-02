import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Shows from './Shows'
import { values, mapObjIndexed, reverse } from 'ramda'
import moment from 'moment'

const setMomentDate = show => {
  show._date = moment(show.date).format('dddd, MMMM Do')
  return show
}

const sortByDate = shows => shows.sort((a, b) => {
  a = new Date(a.date)
  b = new Date(b.date)
  return a > b ? -1 : a < b ? 1 : 0
})

const setGooglePlaces = show => {
  show._location = `https://www.google.com/maps/search/?api=1&query=${show.venue}`
  if (show.latLng) show._location = `https://www.google.com/maps/dir/?api=1&destination=${show.latLng.lat},${show.latLng.lng}`
  return show
}

const formatVenueName = show => {
  const parts = show.venue.split(',')
  show.venue = `${parts[ 0 ]}, ${parts[ 2 ]}`
  return show
}

const formatShows = shows => shows
  .map(setMomentDate)
  .map(setGooglePlaces)
  .map(formatVenueName)

const sortShows = compose(
  reverse,
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
