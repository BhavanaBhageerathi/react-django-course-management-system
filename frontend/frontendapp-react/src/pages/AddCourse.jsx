import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {

    const [courseName, setCourseName] = useState("");
    const [courseFee, setCourseFee] = useState("");

    const navigate = useNavigate();


    const handleSave = async (event) => {

        // Prevent the form from submitting automatically
        event.preventDefault();

        // Check whether the form is valid
        if (!event.target.checkValidity()) {
            event.target.classList.add("was-validated");
            return;
        }

        // Check for negative fee
        if (Number(courseFee) < 0) {
            return;
        }


        const token = localStorage.getItem("accessToken");

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/courses/",
                {
                    method: "POST",
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

                console.log("Course added successfully");

                navigate("/dashboard");

            } else {

                console.log("Failed to add course");

            }

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <div className="container mt-5">

            <h3>Add Course</h3>

            <div className="card mt-4">

                <div className="card-body">

                    <form
                        onSubmit={handleSave}
                        noValidate
                    >

                        <div className="mb-3">

                            <label className="form-label">
                                Course Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter course name"
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
                                placeholder="Enter course fee"
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
                            className="btn btn-primary"
                        >
                            Save Course
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

export default AddCourse;