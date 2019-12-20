import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const createNewBlog = async (newBlog) => {
    const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

export default { getAll, setToken, createNewBlog }
