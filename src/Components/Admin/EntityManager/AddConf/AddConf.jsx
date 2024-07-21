import { useState } from 'react';
import axios from 'axios';

export default function AddConf() {
    // État pour chaque champ du formulaire
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        date: '',
        createdAt: '',
        description: '',
        img: '',
        content: '',
        duration: '',
        osMap: {
            addressl1: '',
            addressl2: '',
            postalCode: '',
            city: '',
            coordinates: []
        },
        speakers: [{ firstname: '', lastname: '' }],
        stakeholders: [{ firstname: '', lastname: '', job: '', img: '' }],
        design: {
            mainColor: '',
            secondColor: ''
        }
    });

    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        const field = name.split('.'); // Pour accéder aux champs imbriqués
    
        setFormData(prevState => {
            if (field.length === 1) {
                // Cas pour les champs simples
                return { ...prevState, [name]: value };
            } else if (field.length === 2) {
                // Cas pour les champs imbriqués comme osMap.addressl1
                const [parentField, subField] = field;
                return {
                    ...prevState,
                    [parentField]: {
                        ...prevState[parentField],
                        [subField]: value
                    }
                };
            } else if (field.length === 3) {
                // Cas pour les champs dans un tableau imbriqué comme stakeholders[0].firstname
                const [parentField, index, subField] = field;
                return {
                    ...prevState,
                    [parentField]: prevState[parentField].map((item, i) =>
                        i === parseInt(index) ? { ...item, [subField]: value } : item
                    )
                };
            } else {
                // Gérer les autres cas ou afficher une erreur
                console.error('Unhandled field format:', field);
                return prevState;
            }
        });
    };
    

    // Fonction pour ajouter un intervenant ou un stakeholder
    const addField = (field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: [...prevState[field], { firstname: '', lastname: '' }]
        }));
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4555/conferences', formData);
            alert('Conference added successfully!');
            setFormData({
                id: '',
                title: '',
                date: '',
                createdAt: '',
                description: '',
                img: '',
                content: '',
                duration: '',
                osMap: {
                    addressl1: '',
                    addressl2: '',
                    postalCode: '',
                    city: '',
                    coordinates: []
                },
                speakers: [{ firstname: '', lastname: '' }],
                stakeholders: [{ firstname: '', lastname: '', job: '', img: '' }],
                design: {
                    mainColor: '',
                    secondColor: ''
                }
            });
        } catch (error) {
            console.error('Error adding conference:', error);
            alert('Failed to add conference');
        }
    };

    return (
        <div className='w-1/2'>
        <form onSubmit={handleSubmit} className='w-full  p-4 flex flex-wrap'>
            
            <label className='block mb-2 m-3'>
                ID:
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label className='block mb-2 m-3'>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label className='block mb-2 m-3'>
                Date:
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label className='block mb-2 m-3'>
                Created At:
                <input
                    type="datetime-local"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label className='block mb-2 m-3'>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            

            <label className='block mb-2 m-3'>
                Content:
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label className='block mb-2 m-3'>
                Duration:
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <div className='mb-4 m-3'>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <label className='block mb-2'>
                    Address Line 1:
                    <input
                        type="text"
                        name="osMap.addressl1"
                        value={formData.osMap.addressl1}
                        onChange={handleChange}
                        className='border p-2 w-full'
                    />
                </label>

                <label className='block mb-2'>
                    Address Line 2:
                    <input
                        type="text"
                        name="osMap.addressl2"
                        value={formData.osMap.addressl2}
                        onChange={handleChange}
                        className='border p-2 w-full'
                    />
                </label>

                <label className='block mb-2'>
                    Postal Code:
                    <input
                        type="text"
                        name="osMap.postalCode"
                        value={formData.osMap.postalCode}
                        onChange={handleChange}
                        className='border p-2 w-full'
                    />
                </label>

                <label className='block mb-2'>
                    City:
                    <input
                        type="text"
                        name="osMap.city"
                        value={formData.osMap.city}
                        onChange={handleChange}
                        className='border p-2 w-full'
                    />
                </label>
            </div>

            <div className='mb-4 m-3'>
                <h2 className="text-xl font-semibold mb-2">Stakeholders</h2>
                {formData.stakeholders.map((stakeholder, index) => (
                    <div key={index} className='mb-2'>
                        <label className='block mb-2'>
                            First Name:
                            <input
                                type="text"
                                name={`stakeholders.${index}.firstname`}
                                value={stakeholder.firstname}
                                onChange={handleChange}
                                className='border p-2 w-full'
                            />
                        </label>

                        <label className='block mb-2'>
                            Last Name:
                            <input
                                type="text"
                                name={`stakeholders.${index}.lastname`}
                                value={stakeholder.lastname}
                                onChange={handleChange}
                                className='border p-2 w-full'
                            />
                        </label>

                        <label className='block mb-2'>
                            Job:
                            <input
                                type="text"
                                name={`stakeholders.${index}.job`}
                                value={stakeholder.job}
                                onChange={handleChange}
                                className='border p-2 w-full'
                            />
                        </label>

                        <label className='block mb-2'>
                            Image URL:
                            <input
                                type="text"
                                name={`stakeholders.${index}.img`}
                                value={stakeholder.img}
                                onChange={handleChange}
                                className='border p-2 w-full'
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={() => addField('stakeholders')} className='bg-blue-500 text-white p-2 rounded'>
                    Add Stakeholder
                </button>
            </div>

            

            <div className='mb-4 m-3'>
                <h2 className="text-xl font-semibold mb-2">Speakers</h2>
                {formData.speakers.map((speaker, index) => (
                    <div key={index} className='mb-2'>
                        <label className='block mb-2'>
                            First Name:
                            <input
                                type="text"
                                name={`speakers.${index}.firstname`}
                                value={speaker.firstname}
                                onChange={handleChange}
                                className='border p-2 w-full'
                            />
                        </label>

                        <label className='block mb-2'>
                            Last Name:
                            <input
                                type="text"
                                name={`speakers.${index}.lastname`}
                                value={speaker.lastname}
                                onChange={handleChange}
                                className='border p-2 w-full'
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={() => addField('speakers')} className='bg-blue-500 text-white p-2 rounded'>
                    Add Speaker
                </button>
            </div>

            <label className='block mb-2 m-3'>
                Image URL:
                <input
                    type="text"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <div className='mb-4 m-3'>
                <h2 className="text-xl font-semibold mb-2">Design</h2>
                <label className='block mb-2'>
                    Main Color:
                    <input
                        type="text"
                        name="design.mainColor"
                        value={formData.design.mainColor}
                        onChange={handleChange}
                        className='border p-2 w-full'
                    />
                </label>

                <label className='block mb-2'>
                    Second Color:
                    <input
                        type="text"
                        name="design.secondColor"
                        value={formData.design.secondColor}
                        onChange={handleChange}
                        className='border p-2 w-full'
                    />
                </label>
            </div>

            <button type="submit" className='bg-green-500 text-white p-2 rounded w-[25%] font-bold text-3xl ml-5'>
                Créer la conférence
            </button>
        </form>
        </div>
    );
}
