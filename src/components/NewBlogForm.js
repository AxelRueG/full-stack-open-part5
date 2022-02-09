import { useState } from 'react';
import Message from './Message';
import blogService from '../services/blogs';

const NewBlogForm = ({ setBlogs, token }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [message, setMessage] = useState(null);
	const [status, setStatus] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newBlog = { title, author, url };
		console.log(newBlog);

		blogService
			.addNewBlog(newBlog, token)
			.then((response) => {
				setBlogs(response);
				setMessage(`a new blog ${response.title} by ${response.author} added`);
				setStatus(true);
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			})
			.catch(() => {
				setMessage(`the blog ${title} by ${author} can't be added`);
				setStatus(false);
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});

		setTitle('');
		setAuthor('');
		setUrl('');
	};

	const handleTitle = (e) => setTitle(e.target.value);
	const handleAuthor = (e) => setAuthor(e.target.value);
	const handleUrl = (e) => setUrl(e.target.value);

	return (
		<div>
			<h3>create new</h3>
			{message && <Message message={message} status={status} />}
			<form>
				<div>
					title: <input type="text" value={title} onChange={handleTitle} />
				</div>
				<div>
					author: <input type="text" value={author} onChange={handleAuthor} />
				</div>
				<div>
					url: <input type="text" value={url} onChange={handleUrl} />
				</div>
				<button onClick={handleSubmit}>create</button>
			</form>
		</div>
	);
};

export default NewBlogForm;
