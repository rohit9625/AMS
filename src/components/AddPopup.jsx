import { React, useState, useEffect } from "react";
import AddStudent from "./AddStudent";
import AddFaculty from "./AddFaculty";

export default function AddPopup({ setPopupState, subjects, enrollmentOptions, departments }) {
  const [option, setOption] = useState("default");

  const closePopup = () => {
    setPopupState("close");
  }

  const addStudent = () => {
    setOption("addStudent");
  };
  const addFaculty = () => {
    setOption("addFaculty");
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
        <AddStudent setPopupState={setPopupState} enrollmentOptions={enrollmentOptions}/>
      ) : (
        <AddFaculty setPopupState={setPopupState} subjects={subjects} departments={departments}/>
      )}
    </div>
  );
}
