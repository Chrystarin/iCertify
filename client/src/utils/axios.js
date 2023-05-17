import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL

export default axios.create({
	baseURL,
	withCredentials: true,
    crossDomain: true,
	headers: {
		"Content-Type": "application/json"
	}
});