import { useSigninCheck } from "reactfire"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUndo } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import Button from "../common/Button"
import { useSongs } from "../SongPage/SongList/useSongs"
import { useResetAllVotes } from "./useResetAllVotes"

export const ResetAllVotes = () => {
  const { songs } = useSongs()
  const { data: user } = useSigninCheck()
  const resetAllVotes = useResetAllVotes()

  if (!user || !user.signedIn) {
    return null
  }

  return (
    <Container>
      <Button onClick={() => resetAllVotes(songs)} variant="secondary">
        <FontAwesomeIcon icon={faUndo} />
        Votes
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ResetAllVotes
