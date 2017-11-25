import { connect } from 'react-redux'
import Header from './Header'

export default connect(
  ({setlist}) => ({
    title:setlist.title
  }),
  {}
)(Header)
