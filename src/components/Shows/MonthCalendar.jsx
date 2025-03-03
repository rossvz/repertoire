import React from "react"
import styled from "styled-components"
import moment from "moment/moment"

export const MonthCalendar = ({ shows }) => {
  const currentMonth = moment().startOf("month")

  if (!shows || !shows.length) return null

  const daysInMonth = currentMonth.daysInMonth()
  const firstDayOfMonth = moment(currentMonth).startOf("month").day()

  // Create array of day objects for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = moment(currentMonth).date(i + 1)
    const dateStr = date.format("YYYY-MM-DD")

    // Check if there's a show on this date
    const hasShow = shows.some((show) => {
      const showDate = moment(show.date).format("YYYY-MM-DD")
      return showDate === dateStr
    })

    return {
      date: i + 1,
      hasShow,
      isToday: date.isSame(moment(), "day"),
    }
  })

  // Add empty slots for days before the first day of the month
  const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    isEmpty: true,
  }))

  const calendarDays = [...emptyDaysBefore, ...days]

  return (
    <CalendarContainer>
      <MonthHeader>{currentMonth.format("MMMM YYYY")}</MonthHeader>
      <WeekdayLabels>
        <WeekdayLabel>Su</WeekdayLabel>
        <WeekdayLabel>Mo</WeekdayLabel>
        <WeekdayLabel>Tu</WeekdayLabel>
        <WeekdayLabel>We</WeekdayLabel>
        <WeekdayLabel>Th</WeekdayLabel>
        <WeekdayLabel>Fr</WeekdayLabel>
        <WeekdayLabel>Sa</WeekdayLabel>
      </WeekdayLabels>
      <CalendarGrid>
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            isEmpty={day.isEmpty}
            hasShow={day.hasShow}
            isToday={day.isToday}
          >
            {!day.isEmpty && day.date}
            {!day.isEmpty && day.hasShow && <ShowIndicator />}
          </CalendarDay>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  )
}

const CalendarContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto 24px;
  background: var(--background-card);
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  border: 1px solid var(--border-color);
`

const MonthHeader = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: var(--primary-light);
`

const WeekdayLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
`

const WeekdayLabel = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`

const CalendarDay = styled.div`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isEmpty ? "transparent" : "rgba(255, 255, 255, 0.03)"};
  color: ${(props) => {
    if (props.isEmpty) return "transparent"
    if (props.isToday) return "var(--primary-light)"
    return "var(--text-primary)"
  }};
  font-weight: ${(props) => (props.isToday ? "600" : "400")};
  border: ${(props) =>
    props.isToday ? "1px solid var(--primary-light)" : "none"};
`

const ShowIndicator = styled.div`
  position: absolute;
  bottom: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary);
`
