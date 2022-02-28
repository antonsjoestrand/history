import { useState } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

const LinkButton = styled.a`
  display: inline-block;
  text-decoration: none;
  background: #008BCD;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  :hover {
    background: #0070A6;
  }
`

const useMemory = (filtered) => {
  const [viewedList, setViewedList] = useState([0])
  const [details, setDetails] = useState(filtered[0])
  const setViewed = (index) => {
    setDetails(filtered[index])
    setViewedList(viewedList.concat(index))
  }

  return {
    setViewed,
    memoryHtml: (
      <>
        <h3>{details && details.city}</h3>
        <h4>{details && details.location}</h4>
        <NextLink href={`/demo/sample/${details.id}`}>
          <LinkButton>Nearby Photos</LinkButton>
        </NextLink>
      </>
    ),
    viewedList,
  }
}

export default useMemory
