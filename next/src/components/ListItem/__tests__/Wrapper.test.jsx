import React from 'react'
import { render } from '@testing-library/react'

import Wrapper from '../Wrapper'

describe('<Wrapper />', () => {
  test('should render an <li> tag', () => {
    const { container } = render(<Wrapper />)
    const element = container.querySelector('li')
    expect(element).not.toBeNull()
  })

  test('should have a class attribute', () => {
    const { container } = render(<Wrapper />)
    const element = container.querySelector('li')
    expect(element.hasAttribute('class')).toBe(true)
  })

  test('should adopt a valid attribute', () => {
    const id = 'test'
    const { container } = render(<Wrapper id={id} />)
    const element = container.querySelector('li')
    expect(element.hasAttribute('id')).toBe(true)
    expect(element.id).toEqual(id)
  })

  test('should not adopt an invalid attribute', () => {
    const { container } = render(<Wrapper attribute="test" />)
    const element = container.querySelector('li')
    expect(element.hasAttribute('attribute')).toBe(false)
  })
})
