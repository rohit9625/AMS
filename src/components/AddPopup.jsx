import { React, useState, useEffect } from "react";

export default function AddPopup({ setPopupState, enrollmentOptions }) {
  const [option, setOption] = useState("default");
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    roll_no: "",
    email: "",
    contact_no: "",
    course: "",
    branch: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const closePopup = () => {
    setPopupState("close");
  }
 // Run once on component mount
  const courses = enrollmentOptions.courses;
  const branches = enrollmentOptions.branches;

  const addStudent = () => {
    setOption("addStudent");
  };
  const addFaculty = () => {
    setOption("addFaculty");
  };
  //   Form functions
  function triggerLoader() {
    let loader = document.getElementById("loader-bar");

    loader.classList.add("animated-loader");
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.dob ||
      !formData.roll_no ||
      !formData.email ||
      !formData.contact_no ||
      !formData.course
    ) {
      setErrorMsg("*Please fill all details");
      console.log("*Please fill all details");
      return;
    } else {
      setErrorMsg("");
    }

    console.log(formData);

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // Check for response
      if (response.ok) {
        console.log("Reponse status is ok");
        triggerLoader()
        setTimeout(()=> {
            closePopup()
        }, 2000);
      }
      setErrorMsg(data.msg);
    } catch (error) {
      console.error("Error during adding student:", error);
    }
    // Add your registration logic here, e.g., send data to a server
  };
  return (
    <div className="absolute z-10 bg-opacity-50 bg-gray-900 w-full h-full top-0 left-0 flex justify-center items-center">
      {option === "default" ? (
        <div className="w-full relative bg-white max-w-[456px] h-1/2 flex justify-center items-center flex-col space-y-4 rounded-lg">
          <button
            className="absolute top-4 right-8 font-semibold text-2xl"
            onClick={closePopup}
          >
            <ion-icon name="close"></ion-icon>
          </button>
          {/* Loading Bar */}
          <h1 className="font-semibold">Chose any one option</h1>
          <button
            className="border w-32 py-2 rounded-full shadow-md hover:bg-cyan-700 hover:text-white hover:shadow-lg duration-300"
            onClick={addFaculty}
          >
            Add Faculty
          </button>
          <button
            className="border w-32 py-2 rounded-full shadow-md hover:bg-cyan-700 hover:text-white hover:shadow-lg duration-300"
            onClick={addStudent}
          >
            Add Student
          </button>
        </div>
      ) : option === "addStudent" ? (
        <div className="w-full relative bg-white max-w-[456px] pb-8 flex justify-center items-center flex-col space-y-4 rounded-lg">
          <div id="loader-bar" className="aboslute top-0 left-0 right-0 rounded-t-lg overflow-hidden bg-cyan-700 w-full h-2"></div>
          {/* Cancel button */}
          <button
            className="absolute -top-1 right-4 font-semibold text-2xl"
            onClick={closePopup}
          >
            <ion-icon name="close"></ion-icon>
          </button>
          <h1 className="text-lg font pt-4">Fill all the details of the student</h1>
          {/* Form */}
          <p className=" text-red-600 h-1">{errorMsg}</p>
          <form className="w-full max-w-[400px] mx-auto py-6 px-4 border border-slate-300 rounded-lg">
            <div className="flex justify-between items-center space-x-2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-gray-600"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full mt-1 p-2 border rounded-md focus:outline-2 outline-cyan-200"
                  placeholder="Enter student's name"
                />
              </div>
              <div className="mb-4 w-36">
                <label
                  htmlFor="dob"
                  className="block text-xs font-semibold text-gray-600"
                >
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="roll_no"
                className="block text-xs font-semibold text-gray-600"
              >
                Roll No:
              </label>
              <input
                type="text"
                id="roll_no"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                autoComplete="off"
                className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
                placeholder="Enter student's roll no."
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
                placeholder="Enter student's email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_no"
                className="block text-xs font-semibold text-gray-600"
              >
                Contact No:
              </label>
              <input
                type="text"
                id="contact_no"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                autoComplete="off"
                className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
                placeholder="Enter student's contact no."
              />
            </div>
            <div className="flex justify-between items-center space-x-2">
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="course"
                  className="block text-xs font-semibold text-gray-600"
                >
                  Course:
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 w-1/3">
                <label
                  htmlFor="branch"
                  className="block text-xs font-semibold text-gray-600"
                >
                  Branch:
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={handleSubmit}
                className=" border-2 border-cyan-700 focus:bg-cyan-700 hover:shadow-xl shadow-slate-300 focus:text-white transition-all duration-300 text-cyan-700 px-6 py-2 rounded-full"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full relative bg-white max-w-[456px] h-1/2 flex justify-center items-center flex-col space-y-4 rounded-lg">
          <button
            className="absolute top-4 right-8 font-semibold text-2xl"
            onClick={closePopup}
          >
            <ion-icon name="close"></ion-icon>
          </button>
          <h1>This is add faculty</h1>
        </div>
      )}
    </div>
  );
}
