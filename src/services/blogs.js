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
  const request = await axios.post('/api/blogs', blog, config(token))
  return request.data
}

export default { getAll, login, addNewBlog };
