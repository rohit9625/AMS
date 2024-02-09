import Head from "next/head";
import Script from "next/script";
import NavBar from "../components/NavBar";
import Dashboard from "@/components/Dashboard";
import WelcomeScreen from "@/components/WelcomeScreen";
import { isTokenValid, tokenProps } from "@/utils/auth";
import { useState, useEffect } from "react";
import Attendance from "@/components/Attendance";
import MarkAttendance from "@/components/MarkAttendance";
import StudentView from "@/components/StudentView";

// This function will run on the server
export async function getServerSideProps(context) {
  const token = context.req.cookies.token || ""; // Retrieve the token from cookies

  const isLoggedIn = isTokenValid(token);
  const decodedToken = tokenProps(token);
  const user = tokenProps(token);
  const userType = decodedToken == null ? "" : decodedToken.userType;
  const userID = decodedToken == null ? "" : decodedToken.id;

  return {
    props: {
      isLoggedIn,
      userType,
      userID,
      user,
    },
  };
}

export default function Home({ isLoggedIn, userType, userID, user }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [enrollmentOptions, setEnrollmentOptions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();

      setStudents(data);
    };
    const fetchEnrollmentOptions = async () => {
      const response = await fetch("/api/enrollment");
      const data = await response.json();

      setEnrollmentOptions(data);
    };
    const fetchSubjects = async () => {
      const response = await fetch("/api/subjects");
      const data = await response.json();

      setSubjects(data.subjects);
    };
    const fetchFaculties = async () => {
      const response = await fetch("/api/faculties");
      const data = await response.json();

      setFaculties(data);
    };
    const fetchDepartments = async () => {
      const response = await fetch("/api/departments");
      const data = await response.json();

      setDepartments(data);
    };

    // Calling fetch functions
    const fetchData = async () => {
      try {
        fetchStudents();
        fetchEnrollmentOptions();
        fetchSubjects();
        fetchFaculties();
        fetchDepartments();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // const date = new Date();

    fetchData();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/login"); // Sending GET request to logout
    const data = await response.json();

    // console.log(data);
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>AMS : Attendance Management System</title>
        <meta name="description" content="" />
      </Head>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      />
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      />
      {!isLoggedIn ? (
        <WelcomeScreen />
      ) : userType == "coordinator" ? (
        <div className="flex">
          {/* Left Side Bar */}
          <NavBar setActiveSection={setActiveSection} />
          {/* Right Side Bar */}
          <div className="w-full h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white w-full h-20 relative flex justify-center items-end p-4">
              <button
                onClick={() => handleLogout()}
                className="text-4xl absolute right-8 top-4 cursor-pointer rounded-lg transition-all duration-300 hover:shadow-2xl shadow-slate-700"
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
              <span className="bg-white w-1/2 h-10 rounded-full text-center border-2">
                Search Bar
              </span>
            </div>
            {/* Main Div */}
            <div className="bg-gray-200 w-full py-4 px-8 flex-1">
              {activeSection === "dashboard" ? (
                <Dashboard
                  faculties={faculties}
                  departments={departments}
                  students={students}
                  enrollmentOptions={enrollmentOptions}
                  subjects={subjects}
                />
              ) : activeSection === "attendance" ? (
                <Attendance students={students} subjects={subjects} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : userType == "faculty" ? (
        <div className="flex">
          {/* Left Side Bar */}
          {/* <NavBar setActiveSection={setActiveSection} /> */}
          {/* Right Side Bar */}
          <div className="w-full h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white w-full h-20 relative flex justify-center items-end p-4">
              <button
                onClick={() => handleLogout()}
                className="text-4xl absolute right-8 top-4 cursor-pointer rounded-lg transition-all duration-300 hover:shadow-2xl shadow-slate-700"
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
              <span className="bg-white w-1/2 h-10 rounded-full text-center border-2">
                Search Bar
              </span>
            </div>
            <div className="bg-gray-200 w-full py-4 px-8 flex-1">
              <MarkAttendance students={students} facultyID={userID} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          {/* Left Side Bar */}
          {/* <NavBar setActiveSection={setActiveSection} /> */}
          {/* Right Side Bar */}
          <div className="w-full h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white w-full h-20 relative flex justify-center items-end p-4">
              <button
                onClick={() => handleLogout()}
                className="text-4xl absolute right-8 top-4 cursor-pointer rounded-lg transition-all duration-300 hover:shadow-2xl shadow-slate-700"
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
              <span className="bg-white w-1/2 h-10 rounded-full text-center border-2">
                Search Bar
              </span>
            </div>
            <div className="bg-gray-200 w-full py-4 px-8 flex-1">
              <StudentView student={user}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
