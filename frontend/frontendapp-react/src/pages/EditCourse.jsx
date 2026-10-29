import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {

    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [courseName, setCourseName] = useState("");
    const [courseFee, setCourseFee] = useState("");

    const navigate = useNavigate();


    useEffect(() => {

        const fetchCourse = async () => {

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

                    const selectedCourse = data.find(
                        (course) => course.id === Number(id)
                    );

                    setCourse(selectedCourse);
                    setCourseName(selectedCourse.course_name);
                    setCourseFee(selectedCourse.course_fee);

                } else {

                    console.log("Failed to fetch courses");

                }

            } catch (error) {

                console.log(error);

            }
        };

        fetchCourse();

    }, [id]);


    // PUT - update course name AND course fee
    const handleFullUpdate = async (event) => {

        event.preventDefault();

        if (!event.target.checkValidity()) {
            event.target.classList.add("was-validated");
            return;
        }

        if (Number(courseFee) < 0) {
            return;
        }


        const confirmUpdate = window.confirm(
            "Are you sure you want to update the course name and fee?"
        );

        if (!confirmUpdate) {
            return;
        }


        const token = localStorage.getItem("accessToken");

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/courses/${id}/`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        course_name: courseName,
                        course_fee: courseFee,
                    }),
                }
            );


            if (response.ok) {

                console.log("Course updated successfully");

                navigate("/dashboard");

            } else {

                console.log("Failed to update course");

            }

        } catch (error) {

            console.log(error);

        }
    };


    // PATCH - update only course fee
    const handleFeeUpdate = async () => {

        if (courseFee === "" || Number(courseFee) < 0) {
            return;
        }


        const confirmUpdate = window.confirm(
            "Are you sure you want to update the course fee?"
        );

        if (!confirmUpdate) {
            return;
        }


        const token = localStorage.getItem("accessToken");

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/courses/${id}/fee`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        course_fee: courseFee,
                    }),
                }
            );


            if (response.ok) {

                console.log("Course fee updated successfully");

                navigate("/dashboard");

            } else {

                console.log("Failed to update course fee");

            }

        } catch (error) {

            console.log(error);

        }
    };


    if (!course) {

        return (
            <div className="container mt-5">
                <p>Loading course...</p>
            </div>
        );

    }


    return (

        <div className="container mt-5">

            <h3>Edit Course</h3>

            <div className="card mt-4">

                <div className="card-body">

                    <form
                        onSubmit={handleFullUpdate}
                        noValidate
                    >

                        <div className="mb-3">

                            <label className="form-label">
                                Course ID
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={course.id}
                                disabled
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                Course Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={courseName}
                                onChange={(e) =>
                                    setCourseName(e.target.value)
                                }
                                required
                            />

                            <div className="invalid-feedback">
                                Course name is required.
                            </div>

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                Course Fee
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                value={courseFee}
                                onChange={(e) =>
                                    setCourseFee(e.target.value)
                                }
                                min="0"
                                required
                            />

                            <div className="invalid-feedback">
                                Course fee is required and cannot be negative.
                            </div>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Update Name & Fee
                        </button>


                        <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={handleFeeUpdate}
                        >
                            Update Fee Only
                        </button>


                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default EditCourse;