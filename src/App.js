import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios';


function App() {
  const actualAuth = localStorage.getItem('authuser');
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!actualAuth) {
      navigate('/login');
    }
  }, [actualAuth, navigate]);

  useEffect(() => {
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
    fetchConferences();
}, []);

  const handleConsulConf = (id) => (event) => {
    navigate(`/conference/${id}`);
  }

  return (
    <div className='w-full min-h-screen  bg-cyan-600'>
      <Navbar/>
      <div className='w-full min-h-screen flex justify-center items-start mt-32'>
          <main className='w-2/5 rounded-md bg-zinc-300 min-h-[33%] p-6'>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <h1 className='font-extrabold text-4xl text-amber-700 text-center'>
              Conférences
            </h1>
            <div className='mt-5 w-full p-3 flex flex-col justify-center items-center'>
              <table>
                <thead>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Durée</th>
                  <th>Ville</th>
                </thead>
                {conferences ? (
                  conferences.map(conference => (
                    <tr className='hover:cursor-pointer' onClick={handleConsulConf(conference.id)}>
                      <td className='border-2 border-black'>{conference.title}</td>
                      <td className='border-2 border-black'>{conference.date}</td>
                      <td className='border-2 border-black'>{conference.duration}</td>
                      <td className='border-2 border-black'>{conference.osMap.city}</td>
                    </tr>
                    
                  ))
                ):null}
              </table>
            </div>
          </div>
              
          </main>
      </div>
      
    </div>
  );
}

export default App;
