import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4555/login', {
          id:username,
          password:password,
        });
  
        if (response.status === 200) {
          const token = response.data
          localStorage.setItem('authuser', JSON.stringify({ username, token }));
          navigate('/');
        } else {
          setError('Nom d\'utilisateur ou mot de passe incorrect');
        }
    } catch (err) {
        setError('Erreur lors de la connexion');
        console.log(err);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-cyan-700 flex justify-center items-center">
      <main className="w-1/4 bg-zinc-300 rounded-md p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Connexion</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-400 rounded-md"
              required
            />
          </div>
          <button type="submit" className="p-2 bg-amber-500 rounded-md text-cyan-950 font-bold hover:bg-amber-700 w-full">
            Se connecter
          </button>
        </form>
      </main>
    </div>
  );
}
