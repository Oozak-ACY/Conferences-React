
import { useState, useEffect } from "react"
import AddConf from "./AddConf/AddConf";
import axios from "axios";

export default function EntityManager (props) {
    const [title, setTitle] = useState('Gestion des Conférences');
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Set the title based on props
        if (props.btnUsers) {
            setTitle('Gestion des Utilisateurs');
        } else {
            setTitle('Gestion des Conférences');
            // fetchConferences(); // Fetch conferences if not managing users
        }
    }, [props.btnUsers]);

    const fetchConferences = async () => {
        setLoading(true);
        try {

            const user = JSON.parse(localStorage.getItem('authuser'));
            const response = await axios.get('http://localhost:4555/conferences', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setConferences(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-start p-4 mt-12'>
            <div className="font-bold text-4xl text-zinc-700 border-b-2 border-b-zinc-800">{title}</div>
        </div>
    )
}