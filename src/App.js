import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const Message = ({ message, status=false }) => {
	const meStyle = {
		border: status? '2px solid green': '2px solid red',
		borderRadius: '10px',
		padding: '5px',
		backgroundColor: '#aaa',
	};

	return <p style={meStyle}>{message}</p>;
};

const LoginForm = ({ handleUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [messageError, setMessageError] = useState(null);

	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		blogService
			.login({ username, password })
			.then((user) => handleUser(user))
			.catch(() => {
				setMessageError('ivalid credentials');
				setTimeout(() => {
					setMessageError(null);
				}, 5000);
			});

		setUsername('');
		setPassword('');
	};

	return (
		<div>
			<form>
				{messageError ? <Message message={messageError} /> : <></>}
				<div>
					username:
					<input type="text" value={username} onChange={handleUsername} />
				</div>
				<div>
					password:
					<input type="password" value={password} onChange={handlePassword} />
				</div>
				<button onClick={handleSubmit}>login</button>
			</form>
		</div>
	);
};

const NewBlogForm = ({ blogs, setBlogs, token }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(true)

	const handleSubmit = (e) => {
		e.preventDefault();

    const newBlog = {title, author, url}
    console.log(newBlog)

		blogService
			.addNewBlog(newBlog, token)
			.then((response) => {
        setBlogs([...blogs, response])
        setMessage(`a new blog ${response.title} by ${response.author} added`)
        setStatus(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
      .catch(()=>{
        setMessage(`the blog ${title} by ${author} can't be added`)
        setStatus(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })

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
      { message? <Message message={message} status={status} /> :<></>}
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

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const token = window.localStorage.getItem('token');
		const username = window.localStorage.getItem('username');
		const password = window.localStorage.getItem('password');
		if (token) {
			const User = { token, username, password };
			setUser(User);
		}
	}, []);

	const handleUser = (User) => {
		setUser(User);
		window.localStorage.setItem('token', User.token);
		window.localStorage.setItem('username', User.username);
		window.localStorage.setItem('password', User.password);
	};

	const handleLogout = () => {
		window.localStorage.clear();
		window.location.reload(false);
	};

	return (
		<div>
			<h2>blogs</h2>
			{!user ? (
				<LoginForm handleUser={handleUser} />
			) : (
				<>
					<p>{user.username}</p>
          <NewBlogForm blogs={blogs} setBlogs={setBlogs} token={user.token} />
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
					<button onClick={handleLogout}>logout</button>
				</>
			)}
		</div>
	);
};

export default App;
