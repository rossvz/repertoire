import { sort, comparator } from 'ramda'
import moment from 'moment/moment'

const compareDate = comparator((a, b) => new Date(a.date) < new Date(b.date))
export const sortByDate = sort(compareDate)

const setMomentDate = show => {
  show._date = moment(show.date).format('dddd, MMMM Do')
  return show
}

const setGooglePlaces = show => {
  show._location = `https://www.google.com/maps/search/?api=1&query=${show.venue}`
  if (show.latLng) show._location = `https://www.google.com/maps/dir/?api=1&destination=${show.latLng.lat},${show.latLng.lng}`
  return show
}

const formatVenueName = show => {
  const parts = show.venue.split(',')
  show.venue = `${parts[0]}, ${parts[2]}`
  return show
}

export const formatShows = shows => shows
  .map(setMomentDate)
  .map(setGooglePlaces)
  .map(formatVenueName)
