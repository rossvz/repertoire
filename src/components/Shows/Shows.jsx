import React from "react"
import styled from "styled-components"

import { Header } from "../Header"
import { Show } from "./Show"
import { useShows } from "./useShows"
import { NewShowWrapper } from "../Admin/NewShowForm/NewShowForm"
import { MonthCalendar } from "./MonthCalendar"

export const Shows = () => {
  const { status, shows } = useShows()

  if (status === "loading") {
    return <LoadingContainer>Loading shows...</LoadingContainer>
  }

  return (
    <div>
      <Header title={"Upcoming Shows"} left={<NewShowWrapper />} />
      <MonthCalendar shows={shows} />
      <ShowsContainer>
        {shows.map((show) => (
          <Show key={show.id} show={show} />
        ))}
      </ShowsContainer>
    </div>
  )
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--text-secondary);
  font-size: 1.1em;
`

const ShowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15vh;
  padding: 0 16px;
`
