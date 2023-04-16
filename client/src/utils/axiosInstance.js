import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:4000';

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
});

axiosInstance.interceptors.request.use(
	config => {
		const accessToken = Cookies.get('access_token');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	error => {
        alert(error)
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
                alert("refresh")
				await axios.post('/auth/refresh');
				return axiosInstance(originalRequest);
			} catch (err) {
                alert("error: " + err)
				console.error('Error refreshing token', err);
				// Logout user if refresh token is invalid
				const response = await axios.post('/auth/logout');
                localStorage.clear()
                navigate("/");
                window.location.reload(true); 
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;