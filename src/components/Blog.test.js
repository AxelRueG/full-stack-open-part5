import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component test', () => {
  const blog = {
    title: 'this is a blog',
    author: 'anonymous',
    url: 'google.com',
    likes: 10,
    user: {
      username: 'hackerman',
      name: 'joseph'
    }
  }
  test('renders content', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('show url and likes when has been a click', () => {
    const component = render(<Blog blog={blog} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('when the like button was clicked, the function is executed once', () => {
    const mockHandeler = jest.fn()
    const component = render(<Blog blog={blog} updateBlog={mockHandeler} />)

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandeler.mock.calls).toHaveLength(2)
  })
})
