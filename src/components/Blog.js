import { useState } from 'react';
import blogsServices from '../services/blogs';
import propTypes from 'prop-types';


const blogStyle = {
	border: '1px solid black',
	borderRadius: '10px',
	margin: '5px',
	padding: '10px',
};

const buttonStyle = {
	backgroundColor: '#4d4dff',
}

const Blog = ({username, blog, updateBlog, deleteBlog}) => {
	const [showMore, setShowMore] = useState(false);

	const handleShow = () => setShowMore(!showMore);

	const handleLike = () => {
		blogsServices
			.addLike(blog)
			.then((response) => {
				updateBlog(response);
			})
			.catch((e) => console.log(e));
	};

	const handleDelete = () => {
		if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
			deleteBlog(blog)
	}

	return (
		<div style={blogStyle}>
			{blog.title} - {blog.author}
			<br />
			<button onClick={handleShow}> {showMore ? 'hide' : 'view'} </button>
			<br />
			{showMore && (
				<>
					{blog.url}
					<div>
						{blog.likes}
						<button onClick={handleLike}>like</button>
					</div>
					{blog.user.name}
					<br/>	
					{ username === blog.user.username && <>
						<button style={buttonStyle} onClick={handleDelete}>delete</button>
						<br />
					</>}
					
				</>
			)}
		</div>
	);
};

Blog.propTypes = {
	username: propTypes.string.isRequired,
	blog: propTypes.object.isRequired,
	updateBlog: propTypes.func.isRequired,
	deleteBlog: propTypes.func.isRequired
}

export default Blog;
