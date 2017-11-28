import { pick, values } from 'ramda'

const cleanSearchTerm = term => term.toLowerCase().replace(/ /g,'')

export const songContainsSearchTerm = searchTerm => song => {
  const cleanedSearchTerm = cleanSearchTerm(searchTerm)

  return values(pick(['album', 'artist', 'title'], song))
    .map(cleanSearchTerm)
    .some(v => v.includes(cleanedSearchTerm))
}
