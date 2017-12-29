import React from 'react'
import Visibility from './Visibility'
import ResetVotes from './ResetVotes'

const AdminFunctions = ({song, changeVote, changeVisible}) => {
  return (
    <div style={styles.adminFunctionsContainer}>
      <Visibility visible={song.visible} changeVisible={changeVisible} />
      <ResetVotes resetVotes={() => changeVote(-song.votes)} />
    </div>
  )
}

const styles = {
  adminFunctionsContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '7%',
    color: '#FC1F49',
    opacity: '1',
    fontSize: '0.8em',
    fontWeight: 'bold'
  },
}

export default AdminFunctions
