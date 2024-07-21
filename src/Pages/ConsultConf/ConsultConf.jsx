import Navbar from "../../Components/Navbar/Navbar"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import serviceIsAdmin from "../../Services/IsAdmin";


export default function ConsultConf (props) {
    const [conference, setConference] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [editFormAddSpeakers, setEditFormAddSpeakers] = useState({firstname: '', lastname: ''});
    const [editFormAddStakeholder, setEditFormAddStakeholder] = useState({firstname: '', lastname: '', job: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('authuser'));
    useEffect(() => {
        
        const fetchConference = async (id) => {
            setLoading(true);
            try {
    
                
                const response = await axios.get(`http://localhost:4555/conference/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setConference(response.data);
                setEditFormData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        const fetchIsAdmin = async () => {
            setLoading(true);
            try {
                const responseIsAdmin = await serviceIsAdmin();

                setIsAdmin(responseIsAdmin);
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchIsAdmin();
            fetchConference(id);
        }
    }, []);

    const handleClick = async () => {
        try {
            await axios.delete(`http://localhost:4555/conference/${id}`, {
                headers: {
                        Authorization: `Bearer ${user.token}`
                }
            });
            navigate('/admin/conf');
        } catch (error) {
            console.error('Erreur lors de la suppression de la conférence:', error);
        }
    }

    const handleInputChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleClickDelSpeaker = (index) => {
        const updatedSpeakers = editFormData.speakers.filter((_, i) => i !== index);
        setEditFormData({ ...editFormData, speakers: updatedSpeakers });
    };

    const handleClickAddSpeaker = (e) => {
        if (editFormAddSpeakers.firstname && editFormAddSpeakers.lastname){
            const updatedSpeakers = [...editFormData.speakers, editFormAddSpeakers];
            setEditFormData({ ...editFormData, speakers: updatedSpeakers });
            setEditFormAddSpeakers({firstname: '', lastname: ''});
        }
    };

    const handleInputChangeAddSpeaker = (e) => {
        setEditFormAddSpeakers({ ...editFormAddSpeakers, [e.target.name]: e.target.value });
    };

    const handleInputChangeSpeaker = (index, e) => {
        const updatedSpeakers = [...editFormData.speakers];
        updatedSpeakers[index] = { ...updatedSpeakers[index], [e.target.name]: e.target.value };
        setEditFormData({ ...editFormData, speakers: updatedSpeakers });
    };

    const handleClickDelStakeholder = (index) => {
        const updatedStakeholders = editFormData.stakeholders.filter((_, i) => i !== index);
        console.log(updatedStakeholders);
        setEditFormData({ ...editFormData, stakeholders: updatedStakeholders });
        console.log(editFormData.stakeholders);
    };

    const handleClickAddStakeholder = (e) => {
        if (editFormAddStakeholder.firstname && editFormAddStakeholder.lastname){
            const updatedStakeholder = [...editFormData.stakeholders, editFormAddStakeholder];
            setEditFormData({ ...editFormData, stakeholders: updatedStakeholder });
            setEditFormAddStakeholder({firstname: '', lastname: '', job: ''});
        }
    };

    const handleInputChangeAddStakeholder = (e) => {
        setEditFormAddStakeholder({ ...editFormAddStakeholder, [e.target.name]: e.target.value });
    };

    const handleInputChangeStakeholder = (index, e) => {
        const updatedStakeholders = [...editFormData.stakeholders];
        updatedStakeholders[index] = { ...updatedStakeholders[index], [e.target.name]: e.target.value };
        setEditFormData({ ...editFormData, stakeholders: updatedStakeholders });
        console.log(editFormData.stakeholders[index]);
    };

    const handleInputChangeLocation = (e) => {
        const updatedOsMap = { ...editFormData.osMap, [e.target.name]: e.target.value };
        setEditFormData({ ...editFormData, osMap: updatedOsMap });
    };
    const handleInputChangeColor= (e) => {
        const updatedColor = { ...editFormData.design, [e.target.name]: e.target.value };
        setEditFormData({ ...editFormData, design: updatedColor });
    };

    

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            await axios.patch(`http://localhost:4555/conference/${id}`, editFormData, {
                headers: {
                Authorization: `Bearer ${user.token}`
                }
            });
            navigate('/admin/conf');
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        
    }


    return (
        <div className='w-full min-h-screen  bg-cyan-600'>

            <Navbar/>
            <div className='w-full h-[100%] flex justify-center items-start mt-32'>
                <main className='w-4/5 h-[100%] rounded-md  bg-zinc-300 min-h-[33%] p-6 flex flex-col items-center'>
                    {!conference ? (
                        <div className="font-extrabold text-7xl text-zinc-800">Aucune conférence trouvée</div>
                    ): (
                    <div className="grid grid-cols-3 gap-4 p-8 w-full">
                    <div className="col-span-1">
                        <img src={conference.img} alt="Image de la conférence" className="w-full h-auto object-cover"/>
                        {isAdmin ? (
                            <div className=" mt-2">
                                Modifier l'url de l'image
                                <input name="img" type="text" value={editFormData.img} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        ) :null}
                    </div>
                    <div className="col-span-2">
                        {!isAdmin ? (
                            <div className="h-14" style={{ background: `linear-gradient(to right, ${conference.design.mainColor}, ${conference.design.secondColor})` }}></div>
                        ):
                        <div>
                            <div className="h-14" style={{ background: `linear-gradient(to right, ${editFormData.design.mainColor}, ${editFormData.design.secondColor})` }}></div>
                            <div className="mt-4 flex w-1/5">
                                <input className="h-10 mr-5 cursor-pointer" name="mainColor" type="color" onChange={handleInputChangeColor} value={editFormData.design.mainColor}/>
                                <input className="h-10 cursor-pointer" name="secondColor" type="color" onChange={handleInputChangeColor} value={editFormData.design.secondColor}/>
                            </div>
                            
                        </div>
                        }
                        

                    </div>
                    <div className="col-span-2">
                        {isAdmin ? (
                            <div className=" mt-2">
                                Modifier le titre
                                <input name="title" type="text" value={editFormData.title} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        ): (
                            <div className="font-extrabold text-5xl text-zinc-800 uppercase">{conference.title}</div>
                        )}
                        
                    </div>
                    <div className="col-span-2 mt-5">
                        {!isAdmin ? (
                            <div className="font-semibold text-xl text-zinc-800 uppercase">{conference.date}</div>
                        ):(
                            <div className=" mt-2">
                                Modifier la date
                                <input name="date" type="text" value={editFormData.date} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        )}
                    </div>
                    <div className="col-span-1 mt-5">
                        {!isAdmin ? (
                            <div className="font-bold text-xl text-zinc-800 ">Durée de la conférence : {conference.duration}</div>
                        ):(
                            <div className=" mt-2">
                                Modifier la durée
                                <input name="duration" type="text" value={editFormData.duration} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        )}
                    </div>
                    <div className="col-span-2 mt-5">
                        {!isAdmin ? (
                            <div className=" text-lg text-zinc-800">{conference.description}</div>
                        ):(
                            <div className=" mt-2">
                                Modifier la description
                                <input name="description" type="text" value={editFormData.description} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        )}
                    </div>
                    <div className="col-span-2 mt-5">
                        {!isAdmin ? (
                            <div className=" text-lg text-zinc-800">Contenu : {conference.content}</div>
                        ):(
                            <div className=" mt-2">
                                Modifier le contenu
                                <input name="content" type="text" value={editFormData.content} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        )}
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1 mt-5 rounded-lg bg-gray-400 h-fit p-5">
                        <div className="text-xl font-bold">Partie prenantes</div>
                        <div className=" text-lg text-zinc-800">
                            {isAdmin ? (
                                <div>
                                    {editFormData.stakeholders.map((stakeholder, index) => (
                                        <div className="border-b-2 border-b-black mt-2">
                                            <div className="mb-1 flex"> 
                                                Prénom : 
                                                <input name="firstname" type="text" value={stakeholder.firstname} onChange={(e) => handleInputChangeStakeholder(index, e)} className="ml-1 rounded-md p-1" />
                                                <div className="w-[10%] ml-5 p-1 rounded-md text-zinc-200 bg-red-700 flex justify-center items-center cursor-pointer"  onClick={() => handleClickDelStakeholder(index)}>🗑️</div>
                                            </div>
                                            <div className="mb-1">
                                                Nom : 
                                                <input name="lastname" type="text" value={stakeholder.lastname} className="ml-1 rounded-md p-1" onChange={(e) => handleInputChangeStakeholder(index, e)} />
                                            </div>
                                            <div className="mb-1">
                                                Job : 
                                                <input name="job" type="text" value={stakeholder.job} className="ml-1 rounded-md p-1" onChange={(e) => handleInputChangeStakeholder(index, e)} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="font-semibold p-1">Ajouter une partie prenante</div>
                                    <div className="border-b-2 border-b-black">
                                        <div className="mb-1 flex">
                                            Prénom : 
                                            <input name="firstname" type="text" onChange={handleInputChangeAddStakeholder} value={editFormAddStakeholder.firstname}  className=" ml-1 rounded-md p-1" placeholder="Prénom"/>
                                            <div className="w-[10%] ml-5 flex justify-center items-start rounded-md text-zinc-200 bg-green-700 font-extrabold text-3xl cursor-pointer" onClick={handleClickAddStakeholder}>+</div>
                                        </div>
                                        
                                        <div className="mb-1 flex">
                                            Nom : 
                                            <input name="lastname" type="text" onChange={handleInputChangeAddStakeholder} value={editFormAddStakeholder.lastname}  className="ml-1 rounded-md p-1" placeholder="Nom"/>
                                        </div>
                                        <div className="mb-1 flex">
                                            Job : 
                                            <input name="job" type="text" onChange={handleInputChangeAddStakeholder} value={editFormAddStakeholder.job}  className="ml-1 rounded-md p-1" placeholder="Job"/>
                                        </div>
                                    </div>
                                </div>
                                
                            ): (conference.speakers.map(speakers => (
                                <div className="border-b-2 border-b-black">
                                    <div>
                                        <div>Prénom : {speakers.firstname}</div>
                                        <div>Nom : {speakers.lastname}</div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                    <div className="col-span-1 mt-5 rounded-lg bg-gray-400 h-fit p-5">
                        <div className="text-xl font-bold">Présentateurs</div>
                        <div className=" text-lg text-zinc-800">
                            
                            {isAdmin ? (
                                <div>
                                    {editFormData.speakers.map((speakers, index) => (
                                        <div className="border-b-2 border-b-black mt-2">
                                            <div className="mb-1 flex"> 
                                                Prénom : 
                                                <input name="firstname" type="text" value={speakers.firstname} onChange={(e) => handleInputChangeSpeaker(index, e)} className="ml-1 rounded-md p-1" />
                                                <div className="w-[10%] ml-5 p-1 rounded-md text-zinc-200 bg-red-700 flex justify-center items-center cursor-pointer"  onClick={() => handleClickDelSpeaker(index)}>🗑️</div>
                                            </div>
                                            <div className="mb-1">
                                                Nom : 
                                                <input name="lastname" type="text" value={speakers.lastname} className="ml-1 rounded-md p-1" onChange={(e) => handleInputChangeSpeaker(index, e)} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="font-semibold p-1">Ajouter un présentateur</div>
                                    <div className="border-b-2 border-b-black">
                                        <div className="mb-1 flex">
                                            Prénom : 
                                            <input name="firstname" type="text" onChange={handleInputChangeAddSpeaker} value={editFormAddSpeakers.firstname}  className=" ml-1 rounded-md p-1" placeholder="Prénom"/>
                                            <div className="w-[10%] ml-5 flex justify-center items-start rounded-md text-zinc-200 bg-green-700 font-extrabold text-3xl cursor-pointer" onClick={handleClickAddSpeaker}>+</div>
                                        </div>
                                        
                                        <div className="mb-1 flex">
                                            Nom : 
                                            <input name="lastname" type="text" onChange={handleInputChangeAddSpeaker} value={editFormAddSpeakers.lastname}  className="ml-1 rounded-md p-1" placeholder="Nom"/>
                                        </div>
                                    </div>
                                </div>
                                
                            ): (conference.speakers.map(speakers => (
                                <div className="border-b-2 border-b-black">
                                    <div>
                                        <div>Prénom : {speakers.firstname}</div>
                                        <div>Nom : {speakers.lastname}</div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-xl font-bold">Localisation</div>
                        {!isAdmin ? (
                            <div className="flex flex-col">
                                <div>Adresse 1 : {conference.osMap.addressl1}</div>
                                <div>Adresse 2 : {conference.osMap.addressl2}</div>
                                <div>Code postal : {conference.osMap.postalCode}</div>
                                <div>Ville : {conference.osMap.city}</div>
                            </div>
                            
                        ):(
                            <div className="flex flex-col w-1/2">
                                <input name="addressl1" type="text" onChange={handleInputChangeLocation}  className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Adresse 1" value={editFormData.osMap.addressl1}/>
                                <input name="addressl2" type="text" onChange={handleInputChangeLocation}  className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"  placeholder="Adresse 2"  value={editFormData.osMap.addressl2}/>
                                <input name="postalCode" type="text" onChange={handleInputChangeLocation} className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Code postal"  value={editFormData.osMap.postalCode}/>
                                <input name="city" type="text" onChange={handleInputChangeLocation}  className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ville"  value={editFormData.osMap.city}/>
                            </div>
                        )}
                        
                    </div>
                    <div className="col-span-2 mt-6">
                        <button className="bg-red-700 text-slate-100 p-2 rounded-md" onClick={handleClick}> Supprimer</button>
                        
                        {isAdmin ? (
                            <button className="bg-green-800 text-slate-100 p-2 rounded-md ml-4" onClick={handleSaveClick}> Enregistrer</button>
                        ):null}
                        
                    </div>
                    
                </div>
                    )}
                </main>
            </div>
            
        </div>
    )
}