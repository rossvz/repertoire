import React from "react"
import Button from 'components/common/Button'
import showIfAuthenticated from "../../../util/showIfAuthenticated";


const styles = {
  container:{
    display:'flex',
    justifyContent:'center'
  }
}
const ResetAllVotes = ({resetAllVotes}) => {
  return (
  <div style={styles.container}>
    <Button onClick={ resetAllVotes }>
      Reset All Votes
    </Button>
  </div>
)}

export default showIfAuthenticated(ResetAllVotes)