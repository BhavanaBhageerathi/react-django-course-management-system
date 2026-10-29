import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);

            console.log("Login successful");
            navigate("/dashboard");
        } else {
            console.log("Login failed");
        }
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Course Management System
                            </h2>

                            <h4 className="text-center mb-4">
                                Login
                            </h4>

                            <div className="mb-3">
                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleLogin}>
                                Login
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;