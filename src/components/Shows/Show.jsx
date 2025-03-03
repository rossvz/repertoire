import React from "react"
import styled from "styled-components"
import { DeleteShow } from "./DeleteShow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faMap,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons"

export const Show = ({ show }) => (
  <ShowCard>
    <ShowHeader>
      <DateDisplay>
        <FontAwesomeIcon icon={faCalendarDay} />
        <span>{show._date}</span>
      </DateDisplay>
      <DeleteShow show={show} />
    </ShowHeader>

    <ShowContent>
      <InfoItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faMap} />
        </IconWrapper>
        <VenueLink
          href={show._location}
          target="_blank"
          rel="noopener noreferrer"
        >
          {show.venue}
        </VenueLink>
      </InfoItem>

      <InfoItem>
        <IconWrapper>
          <FontAwesomeIcon icon={faClock} />
        </IconWrapper>
        <TimeText>{show.time}</TimeText>
      </InfoItem>
    </ShowContent>
  </ShowCard>
)

const ShowCard = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 12px 0;
  background: var(--background-card);
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  border: 1px solid var(--border-color);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

const ShowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
`

const DateDisplay = styled.h3`
  margin: 0;
  color: var(--primary-light);
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ShowContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const IconWrapper = styled.div`
  color: var(--text-secondary);
  width: 16px;
  display: flex;
  justify-content: center;
`

const VenueLink = styled.a`
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-light);
    text-decoration: underline;
  }
`

const TimeText = styled.span`
  color: var(--text-primary);
`
