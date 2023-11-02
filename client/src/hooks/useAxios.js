import axios from "axios";


const useAxios = () => {

    const token = localStorage.getItem('token');

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL + "/api",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });

    return axiosInstance;
}

export default useAxios