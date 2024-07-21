import Navbar from "../../Components/Navbar/Navbar"

import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import isAdmin from "../../Services/IsAdmin";
import fetchAllUsers from "../../Services/fetchAllUsers";

export default function AdminUser () {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ type: ''});
    const [addFormData, setAddFormData] = useState({ id: '', password: ''});
    const navigate = useNavigate();
    const userD = JSON.parse(localStorage.getItem('authuser'));


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const responseIsAdmin = await isAdmin();

                if (!responseIsAdmin) {
                    navigate('/');
                  } else {

                    const responseUsers = await fetchAllUsers();
                    setUsers(responseUsers);
                  }
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, [navigate, userD.token]);

    const handleEdit = (user) => {
        if(user.id === editingUserId) {
            saveEdit(user)
        }else{
            setEditingUserId(user.id);
            setEditFormData({ type: user.type });
        }
        
    }

    const saveEdit = async (user) => {
        setLoading(true);
        try {
            const modifiedUser = await axios.patch(`http://localhost:4555/usertype/${user.id}`, {newType : editFormData.type}, {
                headers: {
                Authorization: `Bearer ${userD.token}`
                }
            });
            setEditingUserId(null);
            setEditFormData({ type: '' });
            const newUser = {...modifiedUser.data, _id: user._id};
            console.log(newUser);
            const updatedUsers = users.map(u =>
                u.id === user.id ? newUser : u
            );
            setUsers(updatedUsers);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4555/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${userD.token}`
                }
            });
            const responseUsers = await fetchAllUsers();
            setUsers(responseUsers);
            

        } catch (error) {
            console.error('Erreur lors de la suppression de la conférence:', error);
        }
    }

    const handleAdd = async () => {

    }

    const handleInputChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

    };
    const handleAddChange = (e) => {
        setAddFormData({ ...addFormData, [e.target.name]: e.target.value });

    };

    
    return (
        <div className='w-full min-h-screen  bg-cyan-600'>
            <Navbar/>
            <div className='w-full h-[100%] flex justify-center items-start mt-32'>
                <main className='w-4/5 h-[100%] rounded-md bg-zinc-300 min-h-[33%] p-6 flex flex-col items-center'>
                    <div className='w-full h-full flex flex-col justify-start p-4 mt-2'>
                        <div className="font-bold text-4xl text-zinc-700 border-b-2 border-b-zinc-800">Gestion des utilisateurs</div>
                    </div>
                    <div className="w-full flex justify-end items-center">

                        <input type="text" onChange={handleAddChange} className="mx-6 h-10" name="id" placeholder="Identifiant"/>
                        <input type="password" onChange={handleAddChange} className="mx-6 h-10" name="password" placeholder="Mot de passe"/>

                        
                        <div onClick={handleAdd} className="bg-amber-600 mr-4 mb-3 p-3 text-zinc-200 font-bold rounded-lg hover:bg-amber-700 cursor-pointer">Ajouter un utilisateur</div>
                    </div>
                    
                    <table className="w-full p-4">
                        <thead className="bg-zinc-400 border-b-2 border-b-zinc-700">
                            <th className="border-2 border-zinc-500">Id</th>
                            <th className="border-2 border-zinc-500">Identifiant</th>
                            <th className="border-2 border-zinc-500">Type</th>
                            <th className="border-2 border-zinc-500">Actions</th>
                        </thead>
                        {users ? (users.map(user => (
                            <tr className="border-t-2 border-t-gray-400 p-5 hover:cursor-pointer hover:bg-zinc-400">
                                <td>{user._id}</td>
                                <td>{user.id}</td>
                                <td>
                                    {editingUserId === user.id?(
                                        <select value={editFormData.type}  onChange={handleInputChange} name="type">
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ):(user.type)}
                                </td>
                                <td className="flex justify-center">
                                    <button className="bg-amber-500 p-1 font-medium ml-2" onClick={() => handleEdit(user)}>
                                        {editingUserId === user.id ? (
                                            <div>Enregistrer</div>
                                        ): <div>Modifier</div>}
                                    </button>
                                    <button className="bg-red-800 p-1 font-medium ml-2 text-slate-100" onClick={() => handleDelete(user.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))):null}
                    </table>
                </main>
            </div>
            
        </div>
    )
}