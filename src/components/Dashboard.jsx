import { React, useEffect, useState } from "react";
import Teachers from "./Teachers";
import Students from "./Students";
import AddPopup from "./AddPopup";
import DeletePopup from "./DeletePopup";

export default function Dashboard({
  faculties,
  departments,
  students,
  enrollmentOptions,
  subjects,
}) {
  const [activeSection, setActiveSection] = useState("faculties");
  const [popupState, setPopupState] = useState("close");

  const changeSection = (section) => {
    setActiveSection(section);
    localStorage.setItem("dashboardSection", section);
  };
  useEffect(() => {
    // Retrieve the active section from localStorage when the component mounts
    const storedActiveSection = localStorage.getItem("dashboardSection");
    if (storedActiveSection) {
      setActiveSection(storedActiveSection);
    }
  }, [setActiveSection]);

  return (
    <div className="bg-white space-y-2 rounded-lg h-full px-0 relative shadow-2xl">
      {popupState === "addPopup" ? (
        <AddPopup
          setPopupState={setPopupState}
          enrollmentOptions={enrollmentOptions}
          subjects={subjects}
          departments={departments}
        />
      ) : popupState === "deletePopup" ? (
        <DeletePopup setPopupState={setPopupState} />
      ) : (
        <></>
      )}
      <div className="w-full h-12 relative bg-[#2A628F] shadow-md font-semibold px-4 rounded-t-lg flex justify-start items-end text-white border-slate-300 flex-1 top-0 left-0">
        <button
          className={`rounded-t-lg px-4 py-2 ${
            activeSection === "faculties" ? "bg-white text-black" : ""
          }`}
          onClick={() => changeSection("faculties")}
        >
          Faculties
        </button>
        <button
          className={`rounded-t-lg px-4 py-2 ${
            activeSection === "students" ? "bg-white text-black" : ""
          }`}
          onClick={() => changeSection("students")}
        >
          Students
        </button>
        <div className="absolute top-0 right-4 text-3xl h-full flex justify-center items-center space-x-4">
          <button
            className="hover:text-red-500 transition-colors duration-300"
            onClick={() => setPopupState("deletePopup")}
          >
            <ion-icon name="trash"></ion-icon>
          </button>
          <button
            className="hover:text-green-300 transition-colors duration-300"
            onClick={() => setPopupState("addPopup")}
          >
            <ion-icon name="add-circle"></ion-icon>
          </button>
        </div>
      </div>
      {activeSection == "faculties" ? (
        <Teachers departments={departments} faculties={faculties} />
      ) : (
        <Students students={students} />
      )}
    </div>
  );
}
