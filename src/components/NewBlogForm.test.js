import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm component test', () => {
  test('the form executes the received handler', () => {
    const newBlog = {
      title: 'how to learn to programing',
      author: 'learnX',
      url: 'youtube.com'
    }

    const addBlog = jest.fn()
    const component = render(<NewBlogForm setBlogs={addBlog} />)

    const button = component.container.querySelector('#submit')
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    fireEvent.change(inputTitle, {
      target: { value: newBlog.title }
    })
    fireEvent.change(inputAuthor, {
      target: { value: newBlog.author }
    })
    fireEvent.change(inputUrl, {
      target: { value: newBlog.url }
    })

    fireEvent.click(button)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(newBlog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(newBlog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(newBlog.url)
  })
})