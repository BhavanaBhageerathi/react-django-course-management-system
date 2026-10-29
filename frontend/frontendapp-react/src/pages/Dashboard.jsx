import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {

        const token = localStorage.getItem("accessToken");

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/courses/",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setCourses(data);
            } else {
                console.log("Failed to fetch courses");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mt-4">

                <h4>Courses</h4>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add-course")}>
                    <i className="bi bi-plus-lg"></i> Add Course
                </button>

            </div>

        <CourseTable courses={courses} />

    </div>
);
}

export default Dashboard;