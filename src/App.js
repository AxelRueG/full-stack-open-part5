import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const togglableRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((Blogs) => setBlogs(Blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    const password = window.localStorage.getItem('password')
    if (token) {
      const User = { token, username, password }
      setUser(User)
    }
  }, [])

  const handleUser = (User) => {
    setUser(User)
    window.localStorage.setItem('token', User.token)
    window.localStorage.setItem('username', User.username)
    window.localStorage.setItem('password', User.password)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload(false)
  }

  const addBlog = (blog) => {
    setBlogs([...blogs, blog])
    togglableRef.current.toggleVisibility()
  }

  const updateBlog = (blog) => {
    const b = blogs.filter((elem) => elem.id !== blog.id)
    const bs = [...b, blog].sort((a, b) => b.likes - a.likes)
    console.log(bs)
    setBlogs(bs)
  }

  const deleteBlog = (blog) => {
    blogService
      .deleteBlog(blog, user.token)
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
          <Togglable ref={togglableRef} buttonLabel="add new blog">
            <NewBlogForm setBlogs={addBlog} token={user.token} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              username={user.username}
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
