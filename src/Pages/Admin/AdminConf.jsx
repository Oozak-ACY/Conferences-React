import Navbar from "../../Components/Navbar/Navbar"

import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import isAdmin from "../../Services/IsAdmin";
import fetchAllConferences from "../../Services/fetchAllConferences";

export default function AdminConf () {
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('authuser'));


    useEffect(() => {
        const fetchConferences = async () => {
            setLoading(true);
            try {
                const responseIsAdmin = await isAdmin();

                if (!responseIsAdmin) {
                    navigate('/');
                  } else {

                    const responsesConferences = await fetchAllConferences();
                    setConferences(responsesConferences);
                  }
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchConferences();
    }, [navigate, user.token]);

    const handleClick = (id) => (event) => {
        navigate(`/conference/${id}`);
    }

    const handleClickAdd = () => {
        navigate(`/conference/add`);
    }
    
    return (
        <div className='w-full min-h-screen  bg-cyan-600'>
            <Navbar/>
            <div className='w-full h-[100%] flex justify-center items-start mt-32'>
                <main className='w-4/5 h-[100%] rounded-md bg-zinc-300 min-h-[33%] p-6 flex flex-col items-center'>
                    <div className='w-full h-full flex flex-col justify-start p-4 mt-2'>
                        <div className="font-bold text-4xl text-zinc-700 border-b-2 border-b-zinc-800">Gestion des conférences</div>
                    </div>
                    <div className="w-full flex justify-end items-center">
                        <div onClick={handleClickAdd} className="bg-amber-600 mr-4 mb-3 p-3 text-zinc-200 font-bold rounded-lg hover:bg-amber-700 cursor-pointer">Ajouter une conférence</div>
                    </div>
                    <table className="w-full p-4">
                        <thead className="bg-zinc-400 border-b-2 border-b-zinc-700">
                            <th className="border-2 border-zinc-500">Id</th>
                            <th className="border-2 border-zinc-500">Titre</th>
                            <th className="border-2 border-zinc-500">Date</th>
                            <th className="border-2 border-zinc-500">Content</th>
                        </thead>
                        {conferences.map(conference => (
                            <tr className="border-t-2 border-t-gray-400 p-5 hover:cursor-pointer hover:bg-zinc-400" onClick={handleClick(conference.id)}>
                                <td>{conference._id}</td>
                                <td>{conference.title}</td>
                                <td>{conference.date}</td>
                                <td>{conference.content}</td>
                            </tr>
                        ))}
                    </table>
                </main>
            </div>
            
        </div>
    )
}