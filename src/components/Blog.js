import React, { useState } from 'react'
import propTypes from 'prop-types'


const blogStyle = {
  border: '1px solid black',
  borderRadius: '10px',
  margin: '5px',
  paddingLeft: '10px',
  paddingBottom: '10px'
}

const buttonStyle = {
  backgroundColor: '#4d4dff',
}

const Blog = ({ userId, blog, updateBlog, deleteBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const handleShow = () => setShowMore(!showMore)

  const handleLike = () => updateBlog(blog)

  const handleDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className="Blog">
      <p>{blog.title} - {blog.author}</p>
      <button onClick={handleShow}> {showMore ? 'hide' : 'view'} </button>
      {showMore && (
        <>
          <p>{blog.url}</p>
          <div>
            likes: <span className='likesNum'>{blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <p>{blog.user.name}</p>
          { userId === blog.user.id &&
            <button style={buttonStyle} onClick={handleDelete}>delete</button>
          }
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  userId: propTypes.string.isRequired,
  blog: propTypes.object.isRequired,
  updateBlog: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired
}

export default Blog
