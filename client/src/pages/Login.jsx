import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const API_BASE_URL = "http://localhost:3000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/login`, formData);
            console.log("Login Response:", data);
            toast.success("Login successful! 🎉");

            setTimeout(() => navigate("/home"), 1500);
        } catch (err) {
            const errorMsg = err.response?.data?.error || "Login failed";
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-2"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded mb-4"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <span 
                        className="text-blue-500 underline cursor-pointer" 
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
