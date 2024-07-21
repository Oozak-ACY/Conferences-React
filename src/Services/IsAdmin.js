import axios from 'axios';

export default async function isAdmin () {
    try {
        const user = JSON.parse(localStorage.getItem('authuser'));
        const response = await axios.get('http://localhost:4555/isadmin', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        if(response) {
            return response.data.isAdmin;
        }
        return false;
    } catch (err) {
        console.error('Error ', err);
        throw new Error('Error');
    }
};