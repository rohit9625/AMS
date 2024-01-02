import { React, useState, useEffect } from "react";

export default function DeletePopup({
  setPopupState,
  setStudentAdded,
}) {
  const [option, setOption] = useState("default");
  const [formData, setFormData] = useState({
    roll_no: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  //   Information of the student to be deleted
  const [studentInfo, setStudentInfo] = useState({});
//   const [confirmDelete, setConfirmDelete] = useState(false);
  const closePopup = () => {
      setPopupState("close");
    // setStudentAdded(true)
  };
  const handleConfirm = (event) => {
    // Perform deletion logic here
    console.log("Deleting...");
    handleSubmit(event, true);
  };

  const deleteStudent = () => {
    setOption("deleteStudent");
  };
  const deleteFaculty = () => {
    setOption("deleteFaculty");
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
  const handleSubmit = async (e, confirmDelete) => {
    e.preventDefault();
    if (!formData.roll_no) {
      setErrorMsg("*Please fill all details");
      return;
    } else {
      setErrorMsg("");
    }

    try {
      const response = await fetch("/api/students", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roll_no: formData.roll_no,
          confirmation: confirmDelete,
        }),
      });

      const data = await response.json();
      // Check for response
      if (response.ok) {
        setStudentInfo(data.student); // Save student info returned from the server
        triggerLoader();
        if(confirmDelete) {
            closePopup();
        }
        setTimeout(() => {
          if (!confirmDelete) {
            setOption("confirm");
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
            onClick={deleteFaculty}
          >
            Delete Faculty
          </button>
          <button
            className="border w-32 py-2 rounded-full shadow-md hover:bg-cyan-700 hover:text-white hover:shadow-lg duration-300"
            onClick={deleteStudent}
          >
            Delete Student
          </button>
        </div>
      ) : option === "deleteStudent" ? (
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
          <h1 className="text-lg font pt-4">Enter the roll no. of student</h1>
          {/* Form */}
          <p className=" text-red-600 h-1">{errorMsg}</p>
          <form className="w-full max-w-[400px] mx-auto py-6 px-4 border border-slate-300 rounded-lg">
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
      ) : option === "confirm" ? (
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
          <h1 className="text-md font pt-4">
            Confim the details of the student
          </h1>
          {/* Form */}
          <p className=" text-red-600 h-1">{errorMsg}</p>

          <div className=" w-full max-w-[70%] flex flex-col space-y-1 justify-center items-center px-4">
            <div className="flex w-full justify-between">
              <span className="font-semibold">Name: </span>
              <span>{studentInfo.name}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-semibold">Roll No: </span>
              <span>{studentInfo.roll_no}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-semibold">Email: </span>
              <span>{studentInfo.email}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-semibold">Contact No: </span>
              <span>{studentInfo.contact_no}</span>
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
      ) : (
        <div className="w-full relative bg-white max-w-[456px] h-1/2 flex justify-center items-center flex-col space-y-4 rounded-lg">
          <button
            className="absolute top-4 right-8 font-semibold text-2xl"
            onClick={closePopup}
          >
            <ion-icon name="close"></ion-icon>
          </button>
          <h1>This is delete faculty</h1>
        </div>
      )}
    </div>
  );
}
