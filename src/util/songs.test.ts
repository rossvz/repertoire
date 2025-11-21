import { songContainsSearchTerm } from './songs'
import type { Song } from '../types'

const matchesTomSawyer = songContainsSearchTerm('Tom Sawyer')

const assert = (val: boolean) => expect(val).toBe(true)
const assertNot = (val: boolean) => expect(val).toBe(false)

it('is case insensitive', () => {
  assert(matchesTomSawyer({ title: 'tom sawyer' } as Song))
})

it('is space insensitive', () => {
  assert(matchesTomSawyer({ title: 'tomsawyer' } as Song))
})

it('matches only album, artist, or title', () => {
  assert(matchesTomSawyer({ title: 'Tom Sawyer' } as Song))
  assert(matchesTomSawyer({ album: 'Tom Sawyer' } as Song))
  assert(matchesTomSawyer({ artist: 'Tom Sawyer' } as Song))
  assertNot(
    matchesTomSawyer({
      author: 'Tom Sawyer',
      huckleberry: 'Tom Sawyer',
      name: 'Tom Sawyer',
    } as any)
  )
})
