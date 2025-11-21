import { pick, values } from "ramda"
import type { Song } from "../types"

const cleanSearchTerm = (term: string): string => term.toLowerCase().replace(/ /g, "")

export const songContainsSearchTerm = (searchTerm: string) => (song: Song): boolean => {
  const cleanedSearchTerm = cleanSearchTerm(searchTerm)
  const vales = values(pick(["album", "artist", "title"], song))
  return vales
    .filter((v): v is string => typeof v === 'string')
    .map(cleanSearchTerm)
    .some((v: string) => v.includes(cleanedSearchTerm))
}
