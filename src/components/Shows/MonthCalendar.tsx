import styled from "styled-components"
import type { ReactNode } from "react"
import type { Show } from "../../types"
import moment from "moment/moment"

interface DayData {
  date?: number
  hasShow?: boolean
  isToday?: boolean
  isEmpty?: boolean
}

interface DayProps {
  isEmpty?: boolean
  hasShow?: boolean
  isToday?: boolean
  children: ReactNode
}

const Day = ({ isEmpty, hasShow, isToday, children }: DayProps) => {
  return (
    <StyledDay
      className={`
        ${isEmpty ? "empty" : ""}
        ${hasShow ? "has-show" : ""}
        ${isToday ? "today" : ""}
      `}
    >
      {children}
    </StyledDay>
  )
}

interface MonthCalendarProps {
  shows: Show[]
}

export const MonthCalendar = ({ shows }: MonthCalendarProps) => {
  const currentMonth = moment().startOf("month")

  if (!shows || !shows.length) return null

  const daysInMonth = currentMonth.daysInMonth()
  const firstDayOfMonth = moment(currentMonth).startOf("month").day()

  const days: DayData[] = Array.from({ length: daysInMonth }, (_, i) => {
    const date = moment(currentMonth).date(i + 1)
    const dateStr = date.format("YYYY-MM-DD")

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

  const emptyDaysBefore: DayData[] = Array.from({ length: firstDayOfMonth }, () => ({
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
          <Day
            key={index}
            isEmpty={day.isEmpty}
            hasShow={day.hasShow}
            isToday={day.isToday}
          >
            {!day.isEmpty && day.date}
            {!day.isEmpty && day.hasShow && <ShowIndicator />}
          </Day>
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

const StyledDay = styled.div`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.className?.includes("empty")
      ? "transparent"
      : "rgba(255, 255, 255, 0.03)"};
  color: ${(props) => {
    if (props.className?.includes("empty")) return "transparent"
    if (props.className?.includes("today")) return "var(--primary-light)"
    return "var(--text-primary)"
  }};
  font-weight: ${(props) =>
    props.className?.includes("today") ? "600" : "400"};
  border: ${(props) =>
    props.className?.includes("today")
      ? "1px solid var(--primary-light)"
      : "none"};
`

const ShowIndicator = styled.div`
  position: absolute;
  bottom: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary);
`
