import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        toast.success("Logout successful! 🎉");

        setTimeout(() => {
            navigate("/login");
        }, 1500); 
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;
