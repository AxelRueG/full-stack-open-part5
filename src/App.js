import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(true)

  const togglableRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((Blogs) => setBlogs(Blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      const User = JSON.parse(userData)
      setUser(User)
      blogService.setToken(User.token)
    }
  }, [])

  const handleUser = (User) => {
    setUser(User)
    window.localStorage.setItem('userData', JSON.stringify(User))
    blogService.setToken(User.token)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload(false)
  }

  const addBlog = (blog) => {
    blogService
      .addNewBlog(blog)
      .then((response) => {
        setBlogs([...blogs, response])
        togglableRef.current.toggleVisibility()
        setMessage(`a new blog ${response.title} by ${response.author} added`)
        setStatus(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(() => {
        setMessage(`the blog ${blog.title} by ${blog.author} can't be added`)
        setStatus(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (blog) => {
    blogService
      .addLike(blog)
      .then((response) => {
        let b = blogs.filter((elem) => elem.id === response.id)[0]
        b = { ...b, likes: response.likes }
        const B = blogs.filter((elem) => elem.id !== response.id)
        const Bs = [...B, b].sort((a, b) => b.likes - a.likes)
        setBlogs(Bs)
      })
      .catch((e) => console.log(e))
  }

  const deleteBlog = (blog) => {
    blogService
      .deleteBlog(blog)
      .then(() => setBlogs(blogs.filter((elem) => elem.id !== blog.id)))
      .catch((e) => console.log(e))
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user ? (
        <LoginForm handleUser={handleUser} />
      ) : (
        <div>
          <p>{user.username}</p>
          {message && <Message message={message} status={status} />}
          <Togglable ref={togglableRef} buttonLabel="add new blog">
            <NewBlogForm setBlogs={addBlog}/>
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              userId={user.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

    </div>
  )
}

export default App
