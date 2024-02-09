import React, { useState } from "react";

export default function DeleteStudent({ closePopup }) {
    const [progress, setProgress] = useState("delete");
    const [errorMsg, setErrorMsg] = useState("");
    //   Information of the student to be deleted
    const [facultyInfo, setFacultyInfo] = useState({});
    const [formData, setFormData] = useState({
      userID: "",
    });
    const handleConfirm = (event) => {
      // Perform deletion logic here
      console.log("Deleting...");
      handleSubmit(event, true);
    };
  
    // Form functions
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
    const handleSubmit = async (e, confirmDelete) => {
      e.preventDefault();
      if (!formData.userID) {
        setErrorMsg("*Please fill all details");
        return;
      } else {
        setErrorMsg("");
      }
  
      try {
        const response = await fetch("/api/faculties", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: formData.userID,
            confirmation: confirmDelete,
          }),
        });
  
        const data = await response.json();
        // Check for response
        if (response.ok) {
          setFacultyInfo(data.faculty); // Save student info returned from the server
          triggerLoader();
          if (confirmDelete) {
            closePopup();
            // window.location.reaload();
          }
          setTimeout(() => {
            if (!confirmDelete) {
              setProgress("confirm");
            } else {
            }
            //   setStudentAdded(true);
          }, 2000);
        }
        setErrorMsg(data.msg);
      } catch (error) {
        console.error("Error during adding student:", error);
      }
      // Add your registration logic here, e.g., send data to a server
    };
    return progress !== "confirm" ? (
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
        <h1 className="text-lg font pt-4">Enter the User ID of faculty </h1>
        {/* Form */}
        <p className=" text-red-600 h-1">{errorMsg}</p>
        <form className="w-full max-w-[400px] mx-auto py-6 px-4 border border-slate-300 rounded-lg">
          <div className="mb-4">
            <label
              htmlFor="userID"
              className="block text-xs font-semibold text-gray-600"
            >
              User ID:
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              autoComplete="off"
              className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
              placeholder="Enter User ID"
            />
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
        <h1 className="text-md font pt-4">Confim the details of the faculty</h1>
        {/* Form */}
        <p className=" text-red-600 h-1">{errorMsg}</p>
  
        <div className=" w-full max-w-[350px] text-sm flex flex-col space-y-1 justify-center items-center px-4">
          <div className="flex w-full justify-between">
            <span className="font-semibold">Name: </span>
            <span>{facultyInfo.name}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-semibold">Email: </span>
            <span>{facultyInfo.email}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-semibold">User ID: </span>
            <span>{facultyInfo.userID}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-semibold">Department: </span>
            <span>{facultyInfo.department}</span>
          </div>
        </div>
        <div className="pt-4">
          <button
            onClick={handleConfirm}
            className=" border-2 border-red-700 focus:bg-red-700 hover:shadow-xl shadow-slate-300 focus:text-white transition-all duration-300 text-red-700 px-6 py-2 rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
