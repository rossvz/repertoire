import { connect } from 'react-redux'
import { changeSongsFilter } from 'store/songs/actions'
import Search from './Search'

export default connect(
  ({ songs }) => ({
    value: songs.filters.search || '',
  }),
  {
    onChange: changeSongsFilter('search'),
  }
)(Search)
