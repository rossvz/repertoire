import { songContainsSearchTerm } from './songs'

const matchesTomSawyer = songContainsSearchTerm('Tom Sawyer')

const assert = val => expect(val).toBe(true)
const assertNot = val => expect(val).toBe(false)

it('is case insensitive', () => {
  assert(matchesTomSawyer({ title: 'tom sawyer' }))
})

it('is space insensitive', () => {
  assert(matchesTomSawyer({ title: 'tomsawyer' }))
})

it('matches only album, artist, or title', () => {
  assert(matchesTomSawyer({ title: 'Tom Sawyer' }))
  assert(matchesTomSawyer({ album: 'Tom Sawyer' }))
  assert(matchesTomSawyer({ artist: 'Tom Sawyer' }))
  assertNot(
    matchesTomSawyer({
      author: 'Tom Sawyer',
      huckleberry: 'Tom Sawyer',
      name: 'Tom Sawyer',
    })
  )
})
