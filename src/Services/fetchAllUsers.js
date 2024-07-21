import axios from 'axios';

export default async function fetchAllUsers () {
    try {
        const user = JSON.parse(localStorage.getItem('authuser'));
        const response = await axios.get('http://localhost:4555/users', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return false;

    } catch (err) {
        console.error('Error ', err);
        throw new Error('Error');
    }
};