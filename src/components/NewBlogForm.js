import React, { useState } from 'react'

const NewBlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setBlogs({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitle = (e) => setTitle(e.target.value)
  const handleAuthor = (e) => setAuthor(e.target.value)
  const handleUrl = (e) => setUrl(e.target.value)

  return (
    <div>
      <h3>create new</h3>
      <form>
        <div>
					title: <input id='title' type="text" value={title} onChange={handleTitle} />
        </div>
        <div>
					author: <input id='author' type="text" value={author} onChange={handleAuthor} />
        </div>
        <div>
					url: <input id='url' type="text" value={url} onChange={handleUrl} />
        </div>
        <button id='submit' onClick={handleSubmit}>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
