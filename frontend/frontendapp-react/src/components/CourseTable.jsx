import { useNavigate } from "react-router-dom";

function CourseTable({ courses }) {

    const navigate = useNavigate();

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("accessToken");

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/courses/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {

                console.log("Course deleted successfully");

                // Reload the dashboard
                window.location.reload();

            } else {

                console.log("Failed to delete course");

            }

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <table className="table table-bordered table-striped mt-3">

            <thead className="table-dark">

                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Course Fee</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {courses.map((course) => (

                    <tr key={course.id}>

                        <td>{course.id}</td>

                        <td>{course.course_name}</td>

                        <td>₹{course.course_fee}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() =>
                                    navigate(`/edit-course/${course.id}`)
                                }
                            >
                                <i className="bi bi-pencil"></i>
                            </button>


                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    handleDelete(course.id)
                                }
                            >
                                <i className="bi bi-trash"></i>
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );
}

export default CourseTable;