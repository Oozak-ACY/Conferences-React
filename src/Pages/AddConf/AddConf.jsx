import Navbar from "../../Components/Navbar/Navbar"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import serviceIsAdmin from "../../Services/IsAdmin";


export default function AddConf (props) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [addFormData, setAddFormData] = useState({title:'', img:'', date:'', duration:'', description: '', content:'', design: {mainColor:'#FFFFFF', secondColor:'#FFFFFF'}, osMap:{addressl1:'', addressl2:'', postalCode:'', city:''}, speakers:[], stakeholders:[]});
    const [addFormAddSpeakers, setAddFormAddSpeakers] = useState({firstname:'', lastname:''});
    const [addFormAddStakeholder, setAddFormAddStakeholder] = useState({firstname: '', lastname: '', job: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('authuser'));

    useEffect(() => {
        const responseIsAdmin = serviceIsAdmin();
        if (!responseIsAdmin) {
            navigate('/');
        };
    }, []);

    const handleInputChange = (e) => {
        setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
    };

    const handleClickDelSpeaker = (index) => {
        const updatedSpeakers = addFormData.speakers.filter((_, i) => i !== index);
        setAddFormData({ ...addFormData, speakers: updatedSpeakers });
    };

    const handleClickAddSpeaker = (e) => {
        if (addFormAddSpeakers.firstname && addFormAddSpeakers.lastname){
            const updatedSpeakers = [...addFormData.speakers, addFormAddSpeakers];
            setAddFormData({ ...addFormData, speakers: updatedSpeakers });
            setAddFormAddSpeakers({firstname: '', lastname: ''});
        }
    };

    const handleInputChangeAddSpeaker = (e) => {
        setAddFormAddSpeakers({ ...addFormAddSpeakers, [e.target.name]: e.target.value });
    };

    const handleInputChangeSpeaker = (index, e) => {
        const updatedSpeakers = [...addFormData.speakers];
        updatedSpeakers[index] = { ...updatedSpeakers[index], [e.target.name]: e.target.value };
        setAddFormData({ ...addFormData, speakers: updatedSpeakers });
    };

    const handleClickDelStakeholder = (index) => {
        const updatedStakeholders = addFormData.stakeholders.filter((_, i) => i !== index);
        console.log(updatedStakeholders);
        setAddFormData({ ...addFormData, stakeholders: updatedStakeholders });
        console.log(addFormData.stakeholders);
    };

    const handleClickAddStakeholder = (e) => {
        if (addFormAddStakeholder.firstname && addFormAddStakeholder.lastname){
            const updatedStakeholder = [...addFormData.stakeholders, addFormAddStakeholder];
            setAddFormData({ ...addFormData, stakeholders: updatedStakeholder });
            setAddFormAddStakeholder({firstname: '', lastname: '', job: ''});
        }
    };

    const handleInputChangeAddStakeholder = (e) => {
        setAddFormAddStakeholder({ ...addFormAddStakeholder, [e.target.name]: e.target.value });
    };

    const handleInputChangeStakeholder = (index, e) => {
        const updatedStakeholders = [...addFormData.stakeholders];
        updatedStakeholders[index] = { ...updatedStakeholders[index], [e.target.name]: e.target.value };
        setAddFormData({ ...addFormData, stakeholders: updatedStakeholders });
        console.log(addFormData.stakeholders[index]);
    };

    const handleInputChangeLocation = (e) => {
        const updatedOsMap = { ...addFormData.osMap, [e.target.name]: e.target.value };
        setAddFormData({ ...addFormData, osMap: updatedOsMap });
    };
    const handleInputChangeColor= (e) => {
        const updatedColor = { ...addFormData.design, [e.target.name]: e.target.value };
        setAddFormData({ ...addFormData, design: updatedColor });
    };

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:4555/conference`, addFormData, {
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
                    <div className="grid grid-cols-3 gap-4 p-8 w-full">
                    <div className="col-span-1">
                        <img src={addFormData.img} alt="Image de la conférence" className="w-full h-auto object-cover"/>
                            <div className=" mt-2">
                                Modifier l'url de l'image
                                <input name="img" type="text" value={addFormData.img} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                    </div>
                    <div className="col-span-2">
                        <div>
                            <div className="h-14" style={{ background: `linear-gradient(to right, ${addFormData.design.mainColor}, ${addFormData.design.secondColor})` }}></div>
                            <div className="mt-4 flex w-1/5">
                                <input className="h-10 mr-5 cursor-pointer" name="mainColor" type="color" onChange={handleInputChangeColor} value={addFormData.design.mainColor}/>
                                <input className="h-10 cursor-pointer" name="secondColor" type="color" onChange={handleInputChangeColor} value={addFormData.design.secondColor}/>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="col-span-2">
                        <div className=" mt-2">
                            Modifier le titre
                            <input name="title" type="text" value={addFormData.title} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className="col-span-2 mt-5">

                        <div className=" mt-2">
                            Modifier la date
                            <input name="date" type="text" value={addFormData.date} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        </div>

                    </div>
                    <div className="col-span-1 mt-5">
                        <div className=" mt-2">
                            Modifier la durée
                            <input name="duration" type="text" value={addFormData.duration} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className="col-span-2 mt-5">
                        <div className=" mt-2">
                            Modifier la description
                            <input name="description" type="text" value={addFormData.description} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className="col-span-2 mt-5">
                        <div className=" mt-2">
                            Modifier le contenu
                            <input name="content" type="text" value={addFormData.content} onChange={handleInputChange} className=" w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1 mt-5 rounded-lg bg-gray-400 h-fit p-5">
                        <div className="text-xl font-bold">Partie prenantes</div>
                        <div className=" text-lg text-zinc-800">
                            <div>
                                {addFormData.stakeholders.map((stakeholder, index) => (
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
                                        <input name="firstname" type="text" onChange={handleInputChangeAddStakeholder} value={addFormAddStakeholder.firstname}  className=" ml-1 rounded-md p-1" placeholder="Prénom"/>
                                        <div className="w-[10%] ml-5 flex justify-center items-start rounded-md text-zinc-200 bg-green-700 font-extrabold text-3xl cursor-pointer" onClick={handleClickAddStakeholder}>+</div>
                                    </div>
                                    
                                    <div className="mb-1 flex">
                                        Nom : 
                                        <input name="lastname" type="text" onChange={handleInputChangeAddStakeholder} value={addFormAddStakeholder.lastname}  className="ml-1 rounded-md p-1" placeholder="Nom"/>
                                    </div>
                                    <div className="mb-1 flex">
                                        Job : 
                                        <input name="job" type="text" onChange={handleInputChangeAddStakeholder} value={addFormAddStakeholder.job}  className="ml-1 rounded-md p-1" placeholder="Job"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-span-1 mt-5 rounded-lg bg-gray-400 h-fit p-5">
                        <div className="text-xl font-bold">Présentateurs</div>
                        <div className=" text-lg text-zinc-800">
                            <div>
                                {addFormData.speakers.map((speakers, index) => (
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
                                        <input name="firstname" type="text" onChange={handleInputChangeAddSpeaker} value={addFormAddSpeakers.firstname}  className=" ml-1 rounded-md p-1" placeholder="Prénom"/>
                                        <div className="w-[10%] ml-5 flex justify-center items-start rounded-md text-zinc-200 bg-green-700 font-extrabold text-3xl cursor-pointer" onClick={handleClickAddSpeaker}>+</div>
                                    </div>
                                    
                                    <div className="mb-1 flex">
                                        Nom : 
                                        <input name="lastname" type="text" onChange={handleInputChangeAddSpeaker} value={addFormAddSpeakers.lastname}  className="ml-1 rounded-md p-1" placeholder="Nom"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-xl font-bold">Localisation</div>
                        <div className="flex flex-col w-1/2">
                            <input name="addressl1" type="text" onChange={handleInputChangeLocation}  className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Adresse 1" value={addFormData.osMap.addressl1}/>
                            <input name="addressl2" type="text" onChange={handleInputChangeLocation}  className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"  placeholder="Adresse 2"  value={addFormData.osMap.addressl2}/>
                            <input name="postalCode" type="text" onChange={handleInputChangeLocation} className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Code postal"  value={addFormData.osMap.postalCode}/>
                            <input name="city" type="text" onChange={handleInputChangeLocation}  className="mt-4 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ville"  value={addFormData.osMap.city}/>
                        </div>
                    </div>
                    <div className="col-span-2 mt-6">
                        <button className="bg-green-800 text-slate-100 p-2 rounded-md ml-4" onClick={handleSaveClick}> Enregistrer</button>  
                    </div>
                    
                </div>
                </main>
            </div>
            
        </div>
    )
}