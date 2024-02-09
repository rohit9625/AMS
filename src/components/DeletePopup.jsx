import { React, useState, useEffect } from "react";
import DeleteStudent from "./DeleteStudent";
import DeleteFaculty from "./DeleteFaculty";

export default function DeletePopup({ setPopupState, setStudentAdded }) {
  const [option, setOption] = useState("default");

  const closePopup = () => {
    setPopupState("close");
    // setStudentAdded(true)
  };
  const deleteStudent = () => {
    setOption("deleteStudent");
  };
  const deleteFaculty = () => {
    setOption("deleteFaculty");
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
        <DeleteStudent closePopup={closePopup}/>
      ) : (
        <DeleteFaculty closePopup={closePopup}/>
      )}
    </div>
  );
}
