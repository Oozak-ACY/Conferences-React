import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('authuser'));

    useEffect(() => {
        const fetchIsAdmin = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:4555/isadmin', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setIsAdmin(response.data.isAdmin);
                console.log(response.data.isAdmin);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchIsAdmin();
    }, [user.token]);

    return (
        <div className="w-full h-16 bg-zinc-300">
            <nav className="h-full w-full flex items-center px-4 py-1">
                <Link to='/' className="border-4 border-zinc-300 hover:bg-zinc-600 w-16 h-full flex items-center">
                    Accueil
                </Link>
                {isAdmin && !loading && !error && (
                    <div className="flex">
                        <Link to='/admin/user' className="border-4 border-zinc-300 hover:bg-zinc-600 w-16 h-full flex items-center">
                            Admin user
                        </Link>
                        <Link to='/admin/conf' className="border-4 border-zinc-300 hover:bg-zinc-600 w-16 h-full flex items-center">
                            Admin conf
                        </Link>
                    </div>
                )}
                {loading && <div>Loading...</div>}
                {error && <div>Erreur: {error.message}</div>}
            </nav>
        </div>
    );
}