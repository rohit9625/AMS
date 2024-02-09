import { React, useState } from "react";

export default function AddStudent({ setPopupState, subjects, departments }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userID: "",
    password: "",
    contact_no: "",
    department: "",
    subject: ""
  });
  const closePopup = () => {
    setPopupState("close");
  };

  //   Form functions
  function triggerLoader() {
    let loader = document.getElementById("loader-bar");

    loader.classList.add("animated-loader");
  }

  // Function to generate userID
  function generateUserId(e) {
    e.preventDefault();

    const facultyName = formData.firstName;
    // Convert faculty name to lowercase and remove spaces
    const sanitizedFacultyName = facultyName.toLowerCase().replace(/\s/g, "");

    // Generate a random number between 1000 and 9999
    const randomNum = Math.floor(Math.random() * 9000) + 1000;

    // Combine the sanitized faculty name and random number to create the user ID
    const userId = `${sanitizedFacultyName}${randomNum}`;
    setFormData((prevData) => ({
      ...prevData,
      userID: userId,
    }));
    return userId;
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
      !formData.firstName ||
      !formData.email ||
      !formData.userID ||
      !formData.password ||
      !formData.contact_no ||
      !formData.department
    ) {
      setErrorMsg("*Please fill all details");
      console.log("*Please fill all details");
      return;
    } else {
      setErrorMsg("");
    }

    console.log(formData);

    try {
      const response = await fetch("/api/faculties", {
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
        triggerLoader();
        setTimeout(() => {
          closePopup();
          // window.location.reaload();
        }, 2000);
      }
      setErrorMsg(data.msg);
    } catch (error) {
      console.error("Error during adding student:", error);
    }
    // Add your registration logic here, e.g., send data to a server
  };
  return (
    <div className="w-full relative bg-white max-w-[456px] pb-8 flex justify-center items-center flex-col space-y-4 rounded-lg">
      <div
        id="loader-bar"
        className="aboslute top-0 left-0 right-0 rounded-t-lg overflow-hidden bg-cyan-700 w-full h-2"
      ></div>
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
              htmlFor="firstName"
              className="block text-xs font-semibold text-gray-600"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="off"
              className="w-full mt-1 p-2 border rounded-md focus:outline-2 outline-cyan-200"
              placeholder="Enter First Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-xs font-semibold text-gray-600"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="off"
              className="w-full mt-1 p-2 border rounded-md focus:outline-2 outline-cyan-200"
              placeholder="Enter Last Name"
            />
          </div>
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
            placeholder="Enter Email Address"
          />
        </div>
        <div className="flex justify-between items-center space-x-2">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="userID"
              className="block text-xs font-semibold text-gray-600"
            >
              User ID:
            </label>
            <div className="relative">
              <input
                type="text"
                id="userID"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                autoComplete="off"
                className="w-full mt-1 p-2 border rounded-md focus:outline-2 outline-cyan-200"
                placeholder="Enter User ID"
              />
              <button
                type="buttone"
                className=" py-2 px-2 absolute right-0 top-1 rounded-e-lg border text-red-300 border-red-300 font-semibold focus:bg-red-300 focus:text-white"
                onClick={generateUserId}
              >
                Get
              </button>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-600"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                className="w-full mt-1 p-2 border rounded-md focus:outline-2 outline-cyan-200"
                placeholder="Create Password"
              />
            </div>
          </div>
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
              htmlFor="department"
              className="block text-xs font-semibold text-gray-600"
            >
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-2/5">
            <label
              htmlFor="subject"
              className="block text-xs font-semibold text-gray-600"
            >
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
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
  );
}
