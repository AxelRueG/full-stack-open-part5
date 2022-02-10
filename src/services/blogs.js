import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const login = async (credentials) => {
	const request = await axios.post('/api/login', credentials);
	return request.data;
};

const config = (token) => {
  return {
    headers: {
      Authorization: 'bearer '+token
    }
  }
}

const addNewBlog = async (blog, token) => {
  const request = await axios.post(baseUrl, blog, config(token))
  return request.data
}

const addLike = async (blog) => {
  const {id, likes} = blog
  const request = await axios.put(`${baseUrl}/${id}`, {...blog, likes: likes+1})
  return request.data
}

const deleteBlog = async (blog, token) => {
  const {id} = blog
  await axios.delete(`${baseUrl}/${id}`, config(token))
}

export default { getAll, login, addNewBlog, addLike, deleteBlog };
