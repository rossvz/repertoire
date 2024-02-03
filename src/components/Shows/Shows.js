import React from "react"
import { Header } from "components/Header"
import { Show } from "./Show"
import { useShows } from "./useShows"
export const Shows = () => {
  const { status, shows } = useShows()

  if (status === "loading") return <div>Loading...</div>
  return (
    <div>
      <Header title={"Upcoming Shows"} />
      <div style={styles.container}>
        {shows.map(show => (
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
    marginBottom: "8vh"
  }
}
