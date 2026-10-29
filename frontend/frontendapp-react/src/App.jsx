import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";


function AppContent() {

    const location = useLocation();

    return (
        <>
            {/* Show Navbar only when NOT on Login page */}
            {location.pathname !== "/" && location.pathname !== "/login" && (
                <Navbar />
            )}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/edit-course/:id" element={<EditCourse />} />
            </Routes>
        </>
    );
}


function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;