import { useState } from 'react';

const blogStyle = {
	border: '1px solid black',
	borderRadius: '10px',
	margin: '5px',
	padding: '10px',
};

const Blog = ({ blog }) => {
	const [showMore, setShowMore] = useState(false);

	const handleShow = () => setShowMore(!showMore);

	return (
		<div style={blogStyle}>
			{blog.title} - {blog.author}
			<br />
			{showMore && (
				<>
					{blog.url}
					<div>
						{blog.likes}
						<button onClick={() => console.log('like')}>like</button>
					</div>
				</>
			)}
			<button onClick={handleShow}> {showMore ? 'hide' : 'view'} </button>
		</div>
	);
};

export default Blog;
