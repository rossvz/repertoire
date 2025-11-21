import { sort, comparator } from "ramda"
import moment from "moment/moment"
import type { Show } from "../types"

const compareDate = comparator((a: Show, b: Show) => new Date(a.date) < new Date(b.date))
export const sortByDate = sort(compareDate)

const setMomentDate = (show: Show): Show => {
  show._date = moment(show.date).format("dddd, MMMM Do")
  return show
}

const setGooglePlaces = (show: Show): Show => {
  show._location = `https://www.google.com/maps/search/?api=1&query=${show.venue}`
  if (show.latLng)
    {show._location = `https://www.google.com/maps/dir/?api=1&destination=${show.latLng.lat},${show.latLng.lng}`}
  return show
}

const futureShows = (show: Show): boolean => {
  const showDate = moment(show.date)
  const startOfToday = moment().startOf("day").subtract(1, "m")
  return showDate.isAfter(startOfToday)
}

export const formatShows = (shows: Show[]): Show[] =>
  shows.map(setMomentDate).map(setGooglePlaces).filter(futureShows)
