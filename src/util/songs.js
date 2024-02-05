import { pick, values } from "ramda"

const cleanSearchTerm = term => term.toLowerCase().replace(/ /g, "")

export const songContainsSearchTerm = searchTerm => song => {
  const cleanedSearchTerm = cleanSearchTerm(searchTerm)
  const vales = values(pick(["album", "artist", "title"], song))
  return vales.map(cleanSearchTerm).some(v => v.includes(cleanedSearchTerm))
}
