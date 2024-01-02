import {React,useEffect} from "react";

export default function NavBar({ setActiveSection }) {
  const changeSection = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  useEffect(() => {
    // Retrieve the active section from localStorage when the component mounts
    const storedActiveSection = localStorage.getItem("activeSection");
    if (storedActiveSection) {
      setActiveSection(storedActiveSection);
    }
  }, [setActiveSection]);

  return (
    <div className="w-1/3 max-w-2xl h-screen bg-[#2A628F] flex flex-col justify-center items-center">
      <ul className="w-4/5 flex flex-col space-y-4 font-bold text-white text-center">
        <li className="py-5 rounded-full relative">
          <button
            onClick={() => changeSection("dashboard")}
            className="pt-1 focus:text-[#2A628F] hover:shadow-xl shadow-slate-400 transition-all duration-300
           focus:bg-white w-full h-full block rounded-full absolute top-0 left-0"
          >
            Dashboard
          </button>
        </li>
        <li className="py-5 rounded-full relative">
          <button
            onClick={() => changeSection("attendance")}
            className="pt-1 focus:text-[#2A628F] hover:shadow-xl shadow-slate-400 transition-all duration-300
           focus:bg-white w-full h-full block rounded-full absolute top-0 left-0"
          >
            Attendance
          </button>
        </li>
        <li className="py-5 rounded-full relative">
          <button
            className="pt-1 focus:text-[#2A628F] hover:shadow-xl shadow-slate-400 transition-all duration-300
           focus:bg-white w-full h-full block rounded-full absolute top-0 left-0"
          >
            Profile
          </button>
        </li>
        <li className="py-5 rounded-full relative">
          <button
            className="pt-1 focus:text-[#2A628F] hover:shadow-xl shadow-slate-400 transition-all duration-300
           focus:bg-white w-full h-full block rounded-full absolute top-0 left-0"
          >
            About
          </button>
        </li>
      </ul>
    </div>
  );
}
