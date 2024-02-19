import React from "react"

import { Header } from "../Header"
import { Show } from "./Show"
import { useShows } from "./useShows"
import { NewShowWrapper } from "../Admin/NewShowForm/NewShowForm"

export const Shows = () => {
  const { status, shows } = useShows()

  if (status === "loading") return <div>Loading...</div>
  return (
    <div>
      <Header title={"Upcoming Shows"} left={<NewShowWrapper />} />
      <div style={styles.container}>
        {shows.map((show) => (
          <Show key={show.id} show={show} />
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8vh",
  },
}
