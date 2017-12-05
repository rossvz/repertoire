import { connect } from 'react-redux'
import Login from './Login'
import { emailChanged, passwordChanged, loginUser } from '../../store/auth/actions'

export default connect(
  (state) => {
    const {email, password, error, loading} = state.auth
    return {email, password, error, loading}
  },
  {emailChanged, passwordChanged, loginUser}
)(Login)
