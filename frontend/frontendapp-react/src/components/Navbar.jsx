import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        // Remove JWT tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Go back to login page
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">

                <span className="navbar-brand mb-0 h1">
                    Course Management System
                </span>

                <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right"></i> Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;